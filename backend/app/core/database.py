"""
Database configuration and initialization
"""

import asyncio
import logging
from typing import Optional, Dict, Any, AsyncGenerator
from contextlib import asynccontextmanager

from sqlalchemy import create_engine, MetaData, text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker, AsyncEngine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
from sqlalchemy.engine import Engine

from app.core.config import settings

# Configure logging
logger = logging.getLogger(__name__)

# Create declarative base
Base = declarative_base()

# Global variables for database engines and sessions
async_engine: Optional[AsyncEngine] = None
sync_engine: Optional[Engine] = None
AsyncSessionLocal: Optional[async_sessionmaker] = None
SessionLocal: Optional[sessionmaker] = None

# Database connection status
db_connected: bool = False
db_error_message: Optional[str] = None


def get_database_url() -> str:
    """Get the database URL with proper SSL configuration"""
    return settings.get_database_url_with_ssl()


def get_async_database_url() -> str:
    url = settings.DATABASE_URL
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return url

def get_sync_database_url() -> str:
    url = settings.DATABASE_URL
    if url.startswith("postgresql+asyncpg://"):
        url = url.replace("postgresql+asyncpg://", "postgresql://", 1)
    return url


def create_sync_engine():
    """Create synchronous database engine with fallback options"""
    global sync_engine
    
    try:
        database_url = get_sync_database_url()
        
        # Check if we have a valid database URL
        if not settings.validate_database_url():
            logger.warning("Invalid DATABASE_URL configuration. Using SQLite fallback.")
            # Use SQLite as fallback for development
            database_url = "sqlite:///./dsa_analysis.db"
        
        # Create engine with appropriate configuration
        if database_url.startswith("sqlite"):
            # SQLite configuration
            sync_engine = create_engine(
                database_url,
                connect_args={"check_same_thread": False},
                poolclass=StaticPool,
                echo=settings.DEBUG
            )
        else:
            # PostgreSQL configuration (all options must be in the URL)
            sync_engine = create_engine(
                database_url,
                echo=settings.DEBUG
            )
        
        logger.info(f"Created sync database engine: {database_url.split('@')[1] if '@' in database_url else database_url}")
        return sync_engine
        
    except Exception as e:
        logger.error(f"Failed to create sync database engine: {e}")
        # Create SQLite fallback
        fallback_url = "sqlite:///./dsa_analysis_fallback.db"
        sync_engine = create_engine(
            fallback_url,
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
            echo=settings.DEBUG
        )
        logger.info(f"Using SQLite fallback: {fallback_url}")
        return sync_engine


async def init_async_engine():
    """Create asynchronous database engine with fallback options"""
    global async_engine
    
    try:
        database_url = get_async_database_url()
        
        # Check if we have a valid database URL
        if not settings.validate_database_url():
            logger.warning("Invalid DATABASE_URL configuration. Using SQLite fallback.")
            # Use SQLite as fallback for development
            database_url = "sqlite+aiosqlite:///./dsa_analysis.db"
        
        # Create async engine with appropriate configuration
        if database_url.startswith("sqlite"):
            # SQLite async configuration
            async_engine = create_async_engine(
                database_url,
                connect_args={"check_same_thread": False},
                poolclass=StaticPool,
                echo=settings.DEBUG
            )
        else:
            # PostgreSQL async configuration (all options must be in the URL)
            async_engine = create_async_engine(
                database_url,
                echo=settings.DEBUG
            )
        
        logger.info(f"Created async database engine: {database_url.split('@')[1] if '@' in database_url else database_url}")
        return async_engine
        
    except Exception as e:
        logger.error(f"Failed to create async database engine: {e}")
        # Create SQLite fallback
        fallback_url = "sqlite+aiosqlite:///./dsa_analysis_fallback.db"
        async_engine = create_async_engine(
            fallback_url,
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
            echo=settings.DEBUG
        )
        logger.info(f"Using SQLite fallback: {fallback_url}")
        return async_engine


def create_session_makers():
    """Create session makers for both sync and async operations"""
    global AsyncSessionLocal, SessionLocal
    
    try:
        # Create sync session maker
        if sync_engine:
            SessionLocal = sessionmaker(
                autocommit=False,
                autoflush=False,
                bind=sync_engine
            )
        
        # Create async session maker
        if async_engine:
            AsyncSessionLocal = async_sessionmaker(
                bind=async_engine,
                class_=AsyncSession,
                expire_on_commit=False
            )
        
        logger.info("Created database session makers")
        
    except Exception as e:
        logger.error(f"Failed to create session makers: {e}")
        raise


async def test_database_connection() -> bool:
    """Test database connection and return status"""
    global db_connected, db_error_message
    
    try:
        if not async_engine:
            logger.error("Async engine not initialized")
            db_error_message = "Database engine not initialized"
            return False
        
        # Test connection with timeout
        async with async_engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        
        db_connected = True
        db_error_message = None
        logger.info("Database connection test successful")
        return True
        
    except Exception as e:
        db_connected = False
        db_error_message = str(e)
        logger.error(f"Database connection test failed: {e}")
        return False


async def init_db():
    """Initialize database with tables and basic setup"""
    global db_connected, db_error_message
    
    try:
        logger.info("Initializing database...")
        
        # Create engines
        await init_async_engine()
        create_sync_engine()
        
        # Create session makers
        create_session_makers()
        
        # Test connection
        connection_successful = await test_database_connection()
        
        if not connection_successful:
            logger.warning("Database connection failed, but continuing with fallback")
            # Continue with fallback - the application can still work with limited functionality
        
        # Import models to ensure they are registered with Base
        try:
            from app.models import user, analysis, execution, optimization, batch
            logger.info("Database models imported successfully")
        except ImportError as e:
            logger.warning(f"Could not import all models: {e}")
        
        # Create tables
        try:
            if async_engine:
                async with async_engine.begin() as conn:
                    await conn.run_sync(Base.metadata.create_all)
                logger.info("Database tables created successfully")
        except Exception as e:
            logger.error(f"Failed to create tables: {e}")
            # Continue without tables - they can be created later
        
        # Initialize with sample data if needed
        await init_sample_data()
        
        logger.info("Database initialization completed")
        
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        db_error_message = str(e)
        # Don't raise the exception - let the application continue with limited functionality


async def init_sample_data():
    """Initialize database with sample data"""
    try:
        # This can be expanded to add sample data
        logger.info("Sample data initialization completed")
    except Exception as e:
        logger.error(f"Failed to initialize sample data: {e}")


async def close_db():
    """Close database connections"""
    global async_engine, sync_engine
    
    try:
        if async_engine:
            await async_engine.dispose()
            logger.info("Async database engine disposed")
        
        if sync_engine:
            sync_engine.dispose()
            logger.info("Sync database engine disposed")
            
    except Exception as e:
        logger.error(f"Error closing database connections: {e}")


# Dependency to get database session
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Get database session for dependency injection"""
    if not AsyncSessionLocal:
        raise RuntimeError("Database not initialized")
    
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            logger.error(f"Database session error: {e}")
            raise
        finally:
            await session.close()


# Context manager for database operations
@asynccontextmanager
async def get_db_context():
    """Context manager for database operations"""
    if not AsyncSessionLocal:
        raise RuntimeError("Database not initialized")
    
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            logger.error(f"Database context error: {e}")
            raise
        finally:
            await session.close()


def get_db_status() -> Dict[str, Any]:
    """Get database connection status"""
    return {
        "connected": db_connected,
        "error_message": db_error_message,
        "database_url": get_database_url().split('@')[1] if '@' in get_database_url() else get_database_url(),
        "engine_initialized": async_engine is not None
    } 
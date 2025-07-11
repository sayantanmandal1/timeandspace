"""
Main FastAPI application for DSA Code Analysis Platform
"""

import asyncio
import logging
import sys
from contextlib import asynccontextmanager
from typing import Dict, Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.config import settings
from app.core.database import init_db, close_db, get_db_status
from app.core.logging import setup_logging
from app.api.v1.api import api_router
from app.core.exceptions import CustomHTTPException

# Setup logging
setup_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Startup
    logger.info("Starting DSA Code Analysis Platform")
    
    try:
        # Initialize database with graceful error handling
        await init_db()
        
        # Get database status for logging
        db_status = get_db_status()
        if db_status["connected"]:
            logger.info("Database connection established successfully")
        else:
            logger.warning(f"Database connection failed: {db_status['error_message']}")
            logger.info("Application will continue with limited functionality")
        
        logger.info("Application startup completed")
        
    except Exception as e:
        logger.error(f"Application startup failed: {e}")
        logger.info("Application will continue with limited functionality")
    
    yield
    
    # Shutdown
    logger.info("Shutting down DSA Code Analysis Platform")
    try:
        await close_db()
        logger.info("Application shutdown completed")
    except Exception as e:
        logger.error(f"Error during shutdown: {e}")


# Create FastAPI application
app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.VERSION,
    debug=settings.DEBUG,
    lifespan=lifespan,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add trusted host middleware for production
if settings.ENVIRONMENT == "production":
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=settings.ALLOWED_HOSTS
    )


# Exception handlers
@app.exception_handler(CustomHTTPException)
async def custom_http_exception_handler(request: Request, exc: CustomHTTPException):
    """Handle custom HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "error_code": exc.error_code,
            "timestamp": exc.timestamp.isoformat() if exc.timestamp else None,
        }
    )


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Handle HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
        }
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors"""
    return JSONResponse(
        status_code=422,
        content={
            "error": "Validation error",
            "details": exc.errors(),
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle general exceptions"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "An unexpected error occurred" if not settings.DEBUG else str(exc),
        }
    )


# Health check endpoint
@app.get("/health")
async def health_check() -> Dict[str, Any]:
    """Health check endpoint"""
    db_status = get_db_status()
    
    return {
        "status": "healthy",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "database": {
            "connected": db_status["connected"],
            "error": db_status["error_message"],
            "engine_initialized": db_status["engine_initialized"]
        },
        "features": {
            "ai_analysis": settings.ENABLE_AI_ANALYSIS,
            "code_execution": settings.ENABLE_CODE_EXECUTION,
            "visualization": settings.ENABLE_VISUALIZATION,
            "complexity_analysis": settings.ENABLE_COMPLEXITY_ANALYSIS,
        }
    }


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "DSA Code Analysis Platform API",
        "version": settings.VERSION,
        "docs": "/docs" if settings.DEBUG else None,
        "health": "/health"
    }


# Include API router
app.include_router(api_router, prefix=settings.API_PREFIX)


# Middleware for request logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all requests"""
    logger.info(f"{request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"{request.method} {request.url.path} - {response.status_code}")
    return response


if __name__ == "__main__":
    import uvicorn
    
    # Check if .env file exists and provide helpful message
    import os
    if not os.path.exists(".env"):
        print("\n" + "="*80)
        print("⚠️  WARNING: No .env file found!")
        print("="*80)
        print("\nTo fix this, create a .env file in the backend directory with:")
        print("\n# Required settings:")
        print("DATABASE_URL=your_remote_postgresql_connection_string")
        print("SECRET_KEY=your-secret-key")
        print("JWT_SECRET_KEY=your-jwt-secret-key")
        print("\n# Optional settings:")
        print("DEBUG=False")
        print("ENVIRONMENT=production")
        print("\nExample DATABASE_URL format:")
        print("DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require")
        print("\n" + "="*80)
        print("The application will continue with default settings...")
        print("="*80 + "\n")
    
    # Run the application
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.AUTO_RELOAD and settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
        access_log=True,
    ) 
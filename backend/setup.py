#!/usr/bin/env python3
"""
Setup script for DSA Code Analysis Platform
This script helps configure the environment and start the application.

MIT License

Copyright (c) 2024 DSA Code Analysis Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

import os
import sys
import subprocess
from pathlib import Path


def print_banner():
    """Print application banner"""
    print("=" * 80)
    print("🚀 DSA Code Analysis Platform - Setup")
    print("=" * 80)


def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Error: Python 3.8 or higher is required")
        print(f"Current version: {sys.version}")
        sys.exit(1)
    print(f"✅ Python version: {sys.version.split()[0]}")


def check_virtual_environment():
    """Check if virtual environment is activated"""
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠️  Warning: Virtual environment not detected")
        print("It's recommended to use a virtual environment")
        response = input("Continue anyway? (y/N): ")
        if response.lower() != 'y':
            sys.exit(1)
    else:
        print("✅ Virtual environment detected")


def create_env_file():
    """Create .env file if it doesn't exist"""
    env_file = Path(".env")
    
    if env_file.exists():
        print("✅ .env file already exists")
        return
    
    print("\n📝 Creating .env file...")
    
    # Get database URL from user
    print("\nDatabase Configuration:")
    print("Enter your PostgreSQL database connection string.")
    print("Format: postgresql://username:password@host:port/database")
    print("For remote databases, add ?sslmode=require at the end")
    
    database_url = input("DATABASE_URL: ").strip()
    
    if not database_url:
        print("⚠️  No database URL provided. Using SQLite fallback.")
        database_url = "sqlite:///./dsa_analysis.db"
    
    # Generate secret keys
    import secrets
    secret_key = secrets.token_urlsafe(32)
    jwt_secret_key = secrets.token_urlsafe(32)
    
    # Create .env content
    env_content = f"""# =============================================================================
# DSA CODE ANALYSIS PLATFORM - ENVIRONMENT VARIABLES
# =============================================================================

# Application Settings
DEBUG=False
ENVIRONMENT=production

# Security Settings (Generated automatically)
SECRET_KEY={secret_key}
JWT_SECRET_KEY={jwt_secret_key}

# Server Settings
HOST=0.0.0.0
PORT=8000

# CORS Settings
ALLOWED_HOSTS=http://localhost:3000,http://localhost:8080,https://your-frontend-domain.vercel.app

# Database Settings
DATABASE_URL={database_url}
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=30

# Redis Settings (Optional - will use in-memory cache if not available)
# REDIS_URL=redis://localhost:6379/0
# REDIS_POOL_SIZE=10

# Celery Settings (Optional - will use sync processing if not available)
# CELERY_BROKER_URL=redis://localhost:6379/1
# CELERY_RESULT_BACKEND=redis://localhost:6379/2

# File Storage Settings
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760

# Code Execution Settings
CODE_EXECUTION_TIMEOUT=30
MAX_MEMORY_USAGE=536870912
MAX_CPU_TIME=60

# Analysis Settings
MAX_AST_DEPTH=100
MAX_COMPLEXITY_ANALYSIS_TIME=60
MAX_VISUALIZATION_POINTS=10000

# Visualization Settings
VISUALIZATION_ENGINE=plotly
GRAPH_LAYOUT_ENGINE=forceatlas2
ANIMATION_DURATION=1000

# Logging Settings
LOG_LEVEL=INFO
LOG_FORMAT=json

# Rate Limiting
RATE_LIMIT_PER_MINUTE=100
RATE_LIMIT_PER_HOUR=1000

# Cache Settings
CACHE_TTL=3600
CACHE_MAX_SIZE=1000

# Performance Settings
WORKER_PROCESSES=1
WORKER_THREADS=4
MAX_CONCURRENT_REQUESTS=100

# Feature Flags
ENABLE_AI_ANALYSIS=False
ENABLE_CODE_EXECUTION=True
ENABLE_VISUALIZATION=True
ENABLE_COMPLEXITY_ANALYSIS=True

# Database Connection Settings
DATABASE_SSL_MODE=prefer
DATABASE_CONNECT_TIMEOUT=30
DATABASE_COMMAND_TIMEOUT=60
"""
    
    # Write .env file
    with open(env_file, 'w') as f:
        f.write(env_content)
    
    print("✅ .env file created successfully")


def install_dependencies():
    """Install Python dependencies"""
    print("\n📦 Installing dependencies...")
    
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                      check=True, capture_output=True, text=True)
        print("✅ Dependencies installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        print("Try running: pip install -r requirements.txt")
        return False
    
    return True


def create_directories():
    """Create necessary directories"""
    print("\n📁 Creating directories...")
    
    directories = [
        "uploads",
        "logs",
        "temp",
        "cache"
    ]
    
    for directory in directories:
        Path(directory).mkdir(exist_ok=True)
        print(f"✅ Created directory: {directory}")


def test_database_connection():
    """Test database connection"""
    print("\n🔍 Testing database connection...")
    
    try:
        # Import and test database connection
        from app.core.database import init_db, get_db_status
        import asyncio
        
        # Run database initialization
        asyncio.run(init_db())
        
        # Get status
        status = get_db_status()
        
        if status["connected"]:
            print("✅ Database connection successful")
        else:
            print(f"⚠️  Database connection failed: {status['error_message']}")
            print("The application will continue with limited functionality")
        
    except Exception as e:
        print(f"⚠️  Database test failed: {e}")
        print("The application will continue with limited functionality")


def start_application():
    """Start the application"""
    print("\n🚀 Starting application...")
    print("The application will be available at: http://localhost:8000")
    print("API documentation: http://localhost:8000/docs")
    print("Health check: http://localhost:8000/health")
    print("\nPress Ctrl+C to stop the application")
    
    try:
        subprocess.run([sys.executable, "main.py"])
    except KeyboardInterrupt:
        print("\n👋 Application stopped")


def main():
    """Main setup function"""
    print_banner()
    
    # Check prerequisites
    check_python_version()
    check_virtual_environment()
    
    # Setup
    create_env_file()
    
    if not install_dependencies():
        print("❌ Setup failed. Please fix the dependency installation issue.")
        sys.exit(1)
    
    create_directories()
    test_database_connection()
    
    print("\n" + "=" * 80)
    print("✅ Setup completed successfully!")
    print("=" * 80)
    
    # Ask if user wants to start the application
    response = input("\nDo you want to start the application now? (Y/n): ")
    if response.lower() != 'n':
        start_application()
    else:
        print("\nTo start the application later, run:")
        print("python main.py")


if __name__ == "__main__":
    main() 
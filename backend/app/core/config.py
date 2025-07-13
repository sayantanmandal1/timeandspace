"""
Configuration settings for the DSA Code Analysis Platform
"""

import os
from dotenv import load_dotenv
load_dotenv()
from typing import List, Optional, Dict, Any


class Settings:
    """Application settings"""
    
    # Application settings
    APP_NAME: str = "DSA Code Analysis Platform"
    VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Server settings
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # CORS settings
    ALLOWED_HOSTS: List[str] = os.getenv("ALLOWED_HOSTS", "http://localhost:3000,http://127.0.0.1:3000,http://localhost:8080,http://127.0.0.1:8080").split(",")
    
    # Database settings - Enhanced with better defaults and error handling
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./dsa_analysis.db")
    DATABASE_POOL_SIZE: int = int(os.getenv("DATABASE_POOL_SIZE", "5"))
    DATABASE_MAX_OVERFLOW: int = int(os.getenv("DATABASE_MAX_OVERFLOW", "10"))
    
    # Redis settings - Made optional with fallback
    REDIS_URL: Optional[str] = os.getenv("REDIS_URL")
    REDIS_POOL_SIZE: int = int(os.getenv("REDIS_POOL_SIZE", "10"))
    
    # Celery settings - Made optional with fallback
    CELERY_BROKER_URL: Optional[str] = os.getenv("CELERY_BROKER_URL")
    CELERY_RESULT_BACKEND: Optional[str] = os.getenv("CELERY_RESULT_BACKEND")
    
    # Security settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dsa-analysis-platform-super-secret-key-2024-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))
    
    # JWT settings
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "dsa-analysis-jwt-secret-key-2024-production")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    
    # File storage settings
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./uploads")
    MAX_FILE_SIZE: int = int(os.getenv("MAX_FILE_SIZE", str(10 * 1024 * 1024)))  # 10MB
    ALLOWED_FILE_EXTENSIONS: List[str] = os.getenv(
        "ALLOWED_FILE_EXTENSIONS", 
        ".py,.java,.cpp,.c,.js,.ts,.go,.rs,.php,.rb,.swift,.kt,.scala"
    ).split(",")
    
    # Code execution settings
    CODE_EXECUTION_TIMEOUT: int = int(os.getenv("CODE_EXECUTION_TIMEOUT", "30"))  # seconds
    MAX_MEMORY_USAGE: int = int(os.getenv("MAX_MEMORY_USAGE", str(512 * 1024 * 1024)))  # 512MB
    MAX_CPU_TIME: int = int(os.getenv("MAX_CPU_TIME", "60"))  # seconds
    
    # Analysis settings
    MAX_AST_DEPTH: int = int(os.getenv("MAX_AST_DEPTH", "100"))
    MAX_COMPLEXITY_ANALYSIS_TIME: int = int(os.getenv("MAX_COMPLEXITY_ANALYSIS_TIME", "60"))
    MAX_VISUALIZATION_POINTS: int = int(os.getenv("MAX_VISUALIZATION_POINTS", "10000"))
    
    # Language support settings
    SUPPORTED_LANGUAGES: Dict[str, Dict[str, Any]] = {
        "python": {
            "extensions": [".py"],
            "executor": "python3",
            "timeout": 30,
            "memory_limit": "512m",
        },
        "java": {
            "extensions": [".java"],
            "executor": "java",
            "compiler": "javac",
            "timeout": 45,
            "memory_limit": "1g",
        },
        "cpp": {
            "extensions": [".cpp", ".cc", ".cxx"],
            "executor": "./a.out",
            "compiler": "g++",
            "timeout": 45,
            "memory_limit": "1g",
        },
        "c": {
            "extensions": [".c"],
            "executor": "./a.out",
            "compiler": "gcc",
            "timeout": 45,
            "memory_limit": "1g",
        },
        "javascript": {
            "extensions": [".js"],
            "executor": "node",
            "timeout": 30,
            "memory_limit": "512m",
        },
        "typescript": {
            "extensions": [".ts"],
            "executor": "ts-node",
            "compiler": "tsc",
            "timeout": 30,
            "memory_limit": "512m",
        },
        "go": {
            "extensions": [".go"],
            "executor": "go run",
            "timeout": 30,
            "memory_limit": "512m",
        },
        "rust": {
            "extensions": [".rs"],
            "executor": "cargo run",
            "compiler": "rustc",
            "timeout": 60,
            "memory_limit": "1g",
        },
        "php": {
            "extensions": [".php"],
            "executor": "php",
            "timeout": 30,
            "memory_limit": "512m",
        },
        "ruby": {
            "extensions": [".rb"],
            "executor": "ruby",
            "timeout": 30,
            "memory_limit": "512m",
        },
        "swift": {
            "extensions": [".swift"],
            "executor": "swift",
            "compiler": "swiftc",
            "timeout": 45,
            "memory_limit": "1g",
        },
        "kotlin": {
            "extensions": [".kt"],
            "executor": "kotlin",
            "compiler": "kotlinc",
            "timeout": 45,
            "memory_limit": "1g",
        },
        "scala": {
            "extensions": [".scala"],
            "executor": "scala",
            "compiler": "scalac",
            "timeout": 45,
            "memory_limit": "1g",
        },
    }
    
    # Visualization settings
    VISUALIZATION_ENGINE: str = os.getenv("VISUALIZATION_ENGINE", "plotly")
    GRAPH_LAYOUT_ENGINE: str = os.getenv("GRAPH_LAYOUT_ENGINE", "forceatlas2")
    ANIMATION_DURATION: int = int(os.getenv("ANIMATION_DURATION", "1000"))  # milliseconds
    MAX_GRAPH_NODES: int = int(os.getenv("MAX_GRAPH_NODES", "1000"))
    MAX_GRAPH_EDGES: int = int(os.getenv("MAX_GRAPH_EDGES", "5000"))
    
    # AI/ML settings
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
    ANTHROPIC_API_KEY: Optional[str] = os.getenv("ANTHROPIC_API_KEY")
    COHERE_API_KEY: Optional[str] = os.getenv("COHERE_API_KEY")
    HUGGINGFACE_API_KEY: Optional[str] = os.getenv("HUGGINGFACE_API_KEY")
    
    # Monitoring settings
    SENTRY_DSN: Optional[str] = os.getenv("SENTRY_DSN")
    SENTRY_TRACES_SAMPLE_RATE: float = float(os.getenv("SENTRY_TRACES_SAMPLE_RATE", "0.1"))
    PROMETHEUS_ENABLED: bool = os.getenv("PROMETHEUS_ENABLED", "True").lower() == "true"
    
    # Logging settings
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_FORMAT: str = os.getenv("LOG_FORMAT", "json")
    LOG_FILE: Optional[str] = os.getenv("LOG_FILE")
    
    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "100"))
    RATE_LIMIT_PER_HOUR: int = int(os.getenv("RATE_LIMIT_PER_HOUR", "1000"))
    
    # Cache settings
    CACHE_TTL: int = int(os.getenv("CACHE_TTL", "3600"))  # 1 hour
    CACHE_MAX_SIZE: int = int(os.getenv("CACHE_MAX_SIZE", "1000"))
    
    # External services
    GITHUB_API_TOKEN: Optional[str] = os.getenv("GITHUB_API_TOKEN")
    GITLAB_API_TOKEN: Optional[str] = os.getenv("GITLAB_API_TOKEN")
    BITBUCKET_API_TOKEN: Optional[str] = os.getenv("BITBUCKET_API_TOKEN")
    
    # Storage settings
    STORAGE_TYPE: str = os.getenv("STORAGE_TYPE", "local")  # local, s3, gcs, azure
    AWS_ACCESS_KEY_ID: Optional[str] = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: Optional[str] = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    AWS_S3_BUCKET: Optional[str] = os.getenv("AWS_S3_BUCKET")
    
    # Email settings
    SMTP_HOST: Optional[str] = os.getenv("SMTP_HOST")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME: Optional[str] = os.getenv("SMTP_USERNAME")
    SMTP_PASSWORD: Optional[str] = os.getenv("SMTP_PASSWORD")
    SMTP_TLS: bool = os.getenv("SMTP_TLS", "True").lower() == "true"
    
    # WebSocket settings
    WEBSOCKET_ENABLED: bool = os.getenv("WEBSOCKET_ENABLED", "True").lower() == "true"
    WEBSOCKET_PING_INTERVAL: int = int(os.getenv("WEBSOCKET_PING_INTERVAL", "20"))
    WEBSOCKET_PING_TIMEOUT: int = int(os.getenv("WEBSOCKET_PING_TIMEOUT", "20"))
    
    # Task queue settings
    TASK_QUEUE_ENABLED: bool = os.getenv("TASK_QUEUE_ENABLED", "True").lower() == "true"
    TASK_QUEUE_WORKERS: int = int(os.getenv("TASK_QUEUE_WORKERS", "4"))
    TASK_QUEUE_MAX_TASKS: int = int(os.getenv("TASK_QUEUE_MAX_TASKS", "1000"))
    
    # Search settings
    ELASTICSEARCH_URL: Optional[str] = os.getenv("ELASTICSEARCH_URL")
    ELASTICSEARCH_INDEX: str = os.getenv("ELASTICSEARCH_INDEX", "dsa_analysis")
    
    # API settings
    API_PREFIX: str = os.getenv("API_PREFIX", "/api/v1")
    API_TITLE: str = os.getenv("API_TITLE", "DSA Code Analysis API")
    API_DESCRIPTION: str = os.getenv(
        "API_DESCRIPTION", 
        "Comprehensive API for analyzing and visualizing DSA code"
    )
    
    # Performance settings
    WORKER_PROCESSES: int = int(os.getenv("WORKER_PROCESSES", "1"))
    WORKER_THREADS: int = int(os.getenv("WORKER_THREADS", "4"))
    MAX_CONCURRENT_REQUESTS: int = int(os.getenv("MAX_CONCURRENT_REQUESTS", "100"))
    
    # Development settings
    AUTO_RELOAD: bool = os.getenv("AUTO_RELOAD", "True").lower() == "true"
    HOT_RELOAD: bool = os.getenv("HOT_RELOAD", "True").lower() == "true"
    
    # Feature flags
    ENABLE_AI_ANALYSIS: bool = os.getenv("ENABLE_AI_ANALYSIS", "False").lower() == "true"
    ENABLE_CODE_EXECUTION: bool = os.getenv("ENABLE_CODE_EXECUTION", "True").lower() == "true"
    ENABLE_VISUALIZATION: bool = os.getenv("ENABLE_VISUALIZATION", "True").lower() == "true"
    ENABLE_COMPLEXITY_ANALYSIS: bool = os.getenv("ENABLE_COMPLEXITY_ANALYSIS", "True").lower() == "true"
    
    # Database connection settings
    DATABASE_SSL_MODE: str = os.getenv("DATABASE_SSL_MODE", "prefer")
    DATABASE_CONNECT_TIMEOUT: int = int(os.getenv("DATABASE_CONNECT_TIMEOUT", "30"))
    DATABASE_COMMAND_TIMEOUT: int = int(os.getenv("DATABASE_COMMAND_TIMEOUT", "60"))
    
    @classmethod
    def validate_database_url(cls) -> bool:
        """Validate that DATABASE_URL is properly configured"""
        if not cls.DATABASE_URL or cls.DATABASE_URL == "sqlite+aiosqlite:///./dsa_analysis.db":
            return False
        return True
    
    @classmethod
    def get_database_url_with_ssl(cls) -> str:
        """Get database URL with SSL configuration for remote databases"""
        if not cls.validate_database_url():
            return cls.DATABASE_URL
        
        # Add SSL parameters for remote databases
        if "localhost" not in cls.DATABASE_URL and "127.0.0.1" not in cls.DATABASE_URL:
            # This is a remote database, add SSL parameters
            separator = "&" if "?" in cls.DATABASE_URL else "?"
            ssl_params = f"sslmode={cls.DATABASE_SSL_MODE}&connect_timeout={cls.DATABASE_CONNECT_TIMEOUT}"
            return f"{cls.DATABASE_URL}{separator}{ssl_params}"
        
        return cls.DATABASE_URL


# Create settings instance
settings = Settings() 
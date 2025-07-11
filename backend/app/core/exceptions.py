"""
Custom exceptions for the DSA Code Analysis Platform
"""

from datetime import datetime
from typing import Optional, Any, Dict


class CustomHTTPException(Exception):
    """Custom HTTP exception with additional metadata"""
    
    def __init__(
        self,
        status_code: int,
        detail: str,
        error_code: Optional[str] = None,
        timestamp: Optional[datetime] = None,
        metadata: Optional[Dict[str, Any]] = None
    ):
        self.status_code = status_code
        self.detail = detail
        self.error_code = error_code
        self.timestamp = timestamp or datetime.utcnow()
        self.metadata = metadata or {}
        super().__init__(detail)


class DatabaseConnectionError(CustomHTTPException):
    """Database connection error"""
    
    def __init__(self, detail: str = "Database connection failed"):
        super().__init__(
            status_code=503,
            detail=detail,
            error_code="DATABASE_CONNECTION_ERROR"
        )


class CodeAnalysisError(CustomHTTPException):
    """Code analysis error"""
    
    def __init__(self, detail: str = "Code analysis failed"):
        super().__init__(
            status_code=422,
            detail=detail,
            error_code="CODE_ANALYSIS_ERROR"
        )


class CodeExecutionError(CustomHTTPException):
    """Code execution error"""
    
    def __init__(self, detail: str = "Code execution failed"):
        super().__init__(
            status_code=422,
            detail=detail,
            error_code="CODE_EXECUTION_ERROR"
        )


class ValidationError(CustomHTTPException):
    """Validation error"""
    
    def __init__(self, detail: str = "Validation failed"):
        super().__init__(
            status_code=400,
            detail=detail,
            error_code="VALIDATION_ERROR"
        )


class AuthenticationError(CustomHTTPException):
    """Authentication error"""
    
    def __init__(self, detail: str = "Authentication failed"):
        super().__init__(
            status_code=401,
            detail=detail,
            error_code="AUTHENTICATION_ERROR"
        )


class AuthorizationError(CustomHTTPException):
    """Authorization error"""
    
    def __init__(self, detail: str = "Authorization failed"):
        super().__init__(
            status_code=403,
            detail=detail,
            error_code="AUTHORIZATION_ERROR"
        )


class ResourceNotFoundError(CustomHTTPException):
    """Resource not found error"""
    
    def __init__(self, detail: str = "Resource not found"):
        super().__init__(
            status_code=404,
            detail=detail,
            error_code="RESOURCE_NOT_FOUND"
        )


class RateLimitError(CustomHTTPException):
    """Rate limit error"""
    
    def __init__(self, detail: str = "Rate limit exceeded"):
        super().__init__(
            status_code=429,
            detail=detail,
            error_code="RATE_LIMIT_EXCEEDED"
        )


class ServiceUnavailableError(CustomHTTPException):
    """Service unavailable error"""
    
    def __init__(self, detail: str = "Service temporarily unavailable"):
        super().__init__(
            status_code=503,
            detail=detail,
            error_code="SERVICE_UNAVAILABLE"
        ) 
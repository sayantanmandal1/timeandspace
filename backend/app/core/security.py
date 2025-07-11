"""
Security and authentication utilities
"""

import hashlib
import hmac
import secrets
import time
import base64
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

from .config import settings
from .logging import get_logger

logger = get_logger(__name__)


def init_security() -> None:
    """Initialize security components"""
    logger.info("Security components initialized")


def get_security():
    """Get security utilities"""
    return SecurityUtils()


class SecurityUtils:
    """Security utilities for the application"""
    
    def __init__(self):
        self.secret_key = settings.SECRET_KEY
        self.jwt_secret = settings.JWT_SECRET_KEY
        self.algorithm = settings.JWT_ALGORITHM
    
    def hash_password(self, password: str) -> str:
        """Hash a password using bcrypt"""
        # Simple hash for now - in production use bcrypt
        salt = secrets.token_hex(16)
        hash_obj = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
        return f"{salt}${hash_obj.hex()}"
    
    def verify_password(self, password: str, hashed: str) -> bool:
        """Verify a password against its hash"""
        try:
            salt, hash_hex = hashed.split('$')
            hash_obj = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
            return hmac.compare_digest(hash_obj.hex(), hash_hex)
        except Exception:
            return False
    
    def create_access_token(self, data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        """Create simple access token (placeholder for JWT)"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire.timestamp()})
        token_data = f"{base64.b64encode(str(to_encode).encode()).decode()}.{self.jwt_secret}"
        return token_data
    
    def create_refresh_token(self, data: Dict[str, Any]) -> str:
        """Create simple refresh token (placeholder for JWT)"""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        to_encode.update({"exp": expire.timestamp(), "type": "refresh"})
        token_data = f"{base64.b64encode(str(to_encode).encode()).decode()}.{self.jwt_secret}"
        return token_data
    
    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Verify simple token (placeholder for JWT)"""
        try:
            parts = token.split('.')
            if len(parts) != 2:
                return None
            
            data_str = base64.b64decode(parts[0]).decode()
            # Simple validation - in production use proper JWT
            if parts[1] != self.jwt_secret:
                return None
            
            # Parse the data (this is simplified)
            import ast
            data = ast.literal_eval(data_str)
            
            # Check expiration
            if data.get("exp", 0) < datetime.utcnow().timestamp():
                logger.warning("Token expired")
                return None
            
            return data
        except Exception as e:
            logger.warning("Invalid token", error=str(e))
            return None
    
    def generate_api_key(self) -> str:
        """Generate API key"""
        return secrets.token_urlsafe(32)
    
    def hash_api_key(self, api_key: str) -> str:
        """Hash API key for storage"""
        return hashlib.sha256(api_key.encode()).hexdigest()
    
    def verify_api_key(self, api_key: str, hashed_key: str) -> bool:
        """Verify API key"""
        return hmac.compare_digest(self.hash_api_key(api_key), hashed_key)
    
    def generate_csrf_token(self) -> str:
        """Generate CSRF token"""
        return secrets.token_urlsafe(32)
    
    def verify_csrf_token(self, token: str, stored_token: str) -> bool:
        """Verify CSRF token"""
        return hmac.compare_digest(token, stored_token)
    
    def sanitize_input(self, text: str) -> str:
        """Sanitize user input"""
        # Basic sanitization - in production use a proper library
        dangerous_chars = ['<', '>', '"', "'", '&']
        for char in dangerous_chars:
            text = text.replace(char, f'\\{char}')
        return text
    
    def validate_email(self, email: str) -> bool:
        """Validate email format"""
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    def rate_limit_key(self, identifier: str, action: str) -> str:
        """Generate rate limit key"""
        return f"rate_limit:{action}:{identifier}"
    
    def check_rate_limit(self, identifier: str, action: str, limit: int, window: int) -> bool:
        """Check rate limit (placeholder)"""
        # In production, implement with Redis
        return True 
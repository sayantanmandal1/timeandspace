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
        """Create JWT access token"""
        import json
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({
            "exp": expire.timestamp(),
            "iat": datetime.utcnow().timestamp(),
            "type": "access"
        })
        
        # Create JWT-like token (simplified)
        header = {"alg": "HS256", "typ": "JWT"}
        payload = to_encode
        
        header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).rstrip(b'=').decode()
        payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).rstrip(b'=').decode()
        
        # Create signature
        message = f"{header_b64}.{payload_b64}"
        signature = hmac.new(
            self.jwt_secret.encode(),
            message.encode(),
            hashlib.sha256
        ).digest()
        signature_b64 = base64.urlsafe_b64encode(signature).rstrip(b'=').decode()
        
        return f"{header_b64}.{payload_b64}.{signature_b64}"
    
    def create_refresh_token(self, data: Dict[str, Any]) -> str:
        """Create JWT refresh token"""
        import json
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        to_encode.update({
            "exp": expire.timestamp(),
            "iat": datetime.utcnow().timestamp(),
            "type": "refresh"
        })
        
        # Create JWT-like token (simplified)
        header = {"alg": "HS256", "typ": "JWT"}
        payload = to_encode
        
        header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).rstrip(b'=').decode()
        payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).rstrip(b'=').decode()
        
        # Create signature
        message = f"{header_b64}.{payload_b64}"
        signature = hmac.new(
            self.jwt_secret.encode(),
            message.encode(),
            hashlib.sha256
        ).digest()
        signature_b64 = base64.urlsafe_b64encode(signature).rstrip(b'=').decode()
        
        return f"{header_b64}.{payload_b64}.{signature_b64}"
    
    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Verify JWT token"""
        import json
        try:
            parts = token.split('.')
            if len(parts) != 3:
                return None
            
            header_b64, payload_b64, signature_b64 = parts
            
            # Verify signature
            message = f"{header_b64}.{payload_b64}"
            expected_signature = hmac.new(
                self.jwt_secret.encode(),
                message.encode(),
                hashlib.sha256
            ).digest()
            expected_signature_b64 = base64.urlsafe_b64encode(expected_signature).rstrip(b'=').decode()
            
            if not hmac.compare_digest(signature_b64, expected_signature_b64):
                return None
            
            # Decode payload
            payload_padded = payload_b64 + '=' * (4 - len(payload_b64) % 4)
            payload_json = base64.urlsafe_b64decode(payload_padded).decode()
            payload = json.loads(payload_json)
            
            # Check expiration
            if payload.get("exp", 0) < datetime.utcnow().timestamp():
                logger.warning("Token expired")
                return None
            
            return payload
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
        """Check rate limit with in-memory storage"""
        import time
        from collections import defaultdict
        
        # In-memory rate limiting (in production, use Redis)
        if not hasattr(self, '_rate_limit_store'):
            self._rate_limit_store = defaultdict(list)
        
        key = f"{action}:{identifier}"
        now = time.time()
        
        # Clean old entries
        self._rate_limit_store[key] = [
            timestamp for timestamp in self._rate_limit_store[key]
            if now - timestamp < window
        ]
        
        # Check if limit exceeded
        if len(self._rate_limit_store[key]) >= limit:
            return False
        
        # Add current request
        self._rate_limit_store[key].append(now)
        return True 
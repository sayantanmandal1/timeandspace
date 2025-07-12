"""
Authentication endpoints for user management
"""

from datetime import datetime, timedelta
from typing import Dict, Any, Optional
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session

from app.core.logging import get_logger
from app.core.security import SecurityUtils
from app.core.database import get_db
from app.models.user import User
from app.core.monitoring import get_metrics_collector

logger = get_logger(__name__)
router = APIRouter()
security = HTTPBearer()
security_utils = SecurityUtils()


class UserRegisterRequest(BaseModel):
    """User registration request model"""
    username: str = Field(..., min_length=3, max_length=50, description="Username")
    email: EmailStr = Field(..., description="Email address")
    password: str = Field(..., min_length=8, description="Password")
    full_name: Optional[str] = Field(None, max_length=100, description="Full name")
    
    class Config:
        schema_extra = {
            "example": {
                "username": "johndoe",
                "email": "john@example.com",
                "password": "securepassword123",
                "full_name": "John Doe"
            }
        }


class UserLoginRequest(BaseModel):
    """User login request model"""
    username: str = Field(..., description="Username or email")
    password: str = Field(..., description="Password")
    
    class Config:
        schema_extra = {
            "example": {
                "username": "johndoe",
                "password": "securepassword123"
            }
        }


class UserResponse(BaseModel):
    """User response model"""
    id: int
    username: str
    email: str
    full_name: Optional[str]
    is_active: bool
    is_verified: bool
    is_premium: bool
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """Token response model"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse


class RefreshTokenRequest(BaseModel):
    """Refresh token request model"""
    refresh_token: str = Field(..., description="Refresh token")


@router.post("/register", response_model=UserResponse)
async def register_user(
    request: UserRegisterRequest,
    db: Session = Depends(get_db)
) -> UserResponse:
    """
    Register a new user
    """
    metrics = get_metrics_collector()
    metrics.increment_counter("user_registration_requests")
    
    try:
        logger.info("User registration attempt", username=request.username, email=request.email)
        
        # Check if user already exists
        existing_user = db.query(User).filter(
            (User.username == request.username) | (User.email == request.email)
        ).first()
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already registered"
            )
        
        # Hash password
        hashed_password = security_utils.hash_password(request.password)
        
        # Generate API key
        api_key = security_utils.generate_api_key()
        
        # Create user
        user = User(
            username=request.username,
            email=request.email,
            hashed_password=hashed_password,
            full_name=request.full_name,
            api_key=api_key,
            preferences={}
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        logger.info("User registered successfully", user_id=user.id)
        metrics.increment_counter("user_registration_success")
        
        return UserResponse.from_orm(user)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("User registration failed", error=str(e))
        metrics.increment_counter("user_registration_errors")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed"
        )


@router.post("/login", response_model=TokenResponse)
async def login_user(
    request: UserLoginRequest,
    db: Session = Depends(get_db)
) -> TokenResponse:
    """
    Login user and return access token
    """
    metrics = get_metrics_collector()
    metrics.increment_counter("user_login_requests")
    
    try:
        logger.info("User login attempt", username=request.username)
        
        # Find user by username or email
        user = db.query(User).filter(
            (User.username == request.username) | (User.email == request.username)
        ).first()
        
        if not user or not security_utils.verify_password(request.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Account is deactivated"
            )
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.commit()
        
        # Generate tokens
        access_token = security_utils.create_access_token(
            data={"sub": str(user.id), "username": user.username}
        )
        refresh_token = security_utils.create_refresh_token(
            data={"sub": str(user.id)}
        )
        
        logger.info("User logged in successfully", user_id=user.id)
        metrics.increment_counter("user_login_success")
        
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=30 * 60,  # 30 minutes
            user=UserResponse.from_orm(user)
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("User login failed", error=str(e))
        metrics.increment_counter("user_login_errors")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    request: RefreshTokenRequest,
    db: Session = Depends(get_db)
) -> TokenResponse:
    """
    Refresh access token using refresh token
    """
    try:
        # Verify refresh token
        payload = security_utils.verify_token(request.refresh_token)
        if not payload or payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        user_id = payload.get("sub")
        user = db.query(User).filter(User.id == int(user_id)).first()
        
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid user"
            )
        
        # Generate new tokens
        access_token = security_utils.create_access_token(
            data={"sub": str(user.id), "username": user.username}
        )
        refresh_token = security_utils.create_refresh_token(
            data={"sub": str(user.id)}
        )
        
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=30 * 60,  # 30 minutes
            user=UserResponse.from_orm(user)
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Token refresh failed", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token refresh failed"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> UserResponse:
    """
    Get current user information
    """
    try:
        # Verify access token
        payload = security_utils.verify_token(credentials.credentials)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid access token"
            )
        
        user_id = payload.get("sub")
        user = db.query(User).filter(User.id == int(user_id)).first()
        
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid user"
            )
        
        return UserResponse.from_orm(user)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Get current user failed", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get user information"
        )


@router.post("/logout")
async def logout_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict[str, str]:
    """
    Logout user (invalidate tokens)
    """
    try:
        # In a real implementation, you would add the token to a blacklist
        # For now, we'll just return a success message
        logger.info("User logout", token=credentials.credentials[:20] + "...")
        
        return {"message": "Successfully logged out"}
        
    except Exception as e:
        logger.error("Logout failed", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Logout failed"
        ) 
"""
Health check endpoints
"""

from typing import Dict, Any
from fastapi import APIRouter

from app.core.logging import get_logger
from app.core.monitoring import get_health_checker

logger = get_logger(__name__)
router = APIRouter()


@router.get("/")
async def health_check() -> Dict[str, Any]:
    """
    Basic health check endpoint
    """
    return {
        "status": "healthy",
        "service": "DSA Code Analysis Platform",
        "version": "1.0.0"
    }


@router.get("/detailed")
async def detailed_health_check() -> Dict[str, Any]:
    """
    Detailed health check with all components
    """
    health_checker = get_health_checker()
    
    # Run health checks
    results = await health_checker.run_checks()
    overall_status = health_checker.get_overall_status(results)
    
    return {
        "status": overall_status,
        "service": "DSA Code Analysis Platform",
        "version": "1.0.0",
        "components": results,
        "timestamp": "2024-01-01T00:00:00Z"
    }


@router.get("/ready")
async def readiness_check() -> Dict[str, Any]:
    """
    Readiness check for Kubernetes
    """
    return {
        "status": "ready",
        "service": "DSA Code Analysis Platform"
    }


@router.get("/live")
async def liveness_check() -> Dict[str, Any]:
    """
    Liveness check for Kubernetes
    """
    return {
        "status": "alive",
        "service": "DSA Code Analysis Platform"
    } 
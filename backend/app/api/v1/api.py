"""
Main API router for v1 endpoints
"""

from fastapi import APIRouter

from .endpoints import analysis, languages, execution, optimization, health, batch, auth

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
api_router.include_router(languages.router, prefix="/languages", tags=["languages"])
api_router.include_router(execution.router, prefix="/execution", tags=["execution"])
api_router.include_router(optimization.router, prefix="/optimization", tags=["optimization"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(batch.router, prefix="/batch", tags=["batch"]) 
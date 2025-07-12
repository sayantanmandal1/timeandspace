"""
Code optimization endpoints
"""

from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.core.logging import get_logger
from app.services.optimization_service import OptimizationService

logger = get_logger(__name__)
router = APIRouter()


class OptimizationRequest(BaseModel):
    """Request model for code optimization"""
    code: str = Field(..., description="Source code to optimize")
    language: str = Field(..., description="Programming language")
    optimization_type: str = Field(default="all", description="Type of optimization: performance, memory, readability, all")
    
    class Config:
        schema_extra = {
            "example": {
                "code": "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
                "language": "python",
                "optimization_type": "performance"
            }
        }


class OptimizationResponse(BaseModel):
    """Response model for code optimization"""
    success: bool
    original_code: str
    optimized_code: Optional[str] = None
    suggestions: List[str] = []
    improvements: Dict[str, Any] = {}
    error: Optional[str] = None


@router.post("/suggest", response_model=OptimizationResponse)
async def suggest_optimizations(request: OptimizationRequest) -> OptimizationResponse:
    """
    Get optimization suggestions for code
    """
    try:
        logger.info("Starting optimization analysis", language=request.language, type=request.optimization_type)
        
        # Use real optimization service
        optimization_service = OptimizationService()
        result = await optimization_service.analyze_optimization_opportunities(request.code, request.language)
        
        if "error" in result:
            return OptimizationResponse(
                success=False,
                original_code=request.code,
                error=result["error"]
            )
        
        # Extract suggestions from optimizations
        suggestions = []
        for opt in result.get("optimizations", []):
            suggestions.extend(opt.get("suggestions", []))
        
        # Create improvements summary
        improvements = {
            "total_opportunities": result.get("total_opportunities", 0),
            "high_priority": result.get("high_priority", 0),
            "medium_priority": result.get("medium_priority", 0),
            "low_priority": result.get("low_priority", 0)
        }
        
        return OptimizationResponse(
            success=True,
            original_code=request.code,
            suggestions=suggestions,
            improvements=improvements
        )
        
    except Exception as e:
        logger.error("Optimization analysis failed", error=str(e))
        raise HTTPException(
            status_code=500,
            detail=f"Optimization analysis failed: {str(e)}"
        )


@router.post("/apply")
async def apply_optimizations(request: OptimizationRequest) -> OptimizationResponse:
    """
    Apply optimizations to code and return optimized version
    """
    try:
        logger.info("Applying optimizations", language=request.language)
        
        # Use real optimization service
        optimization_service = OptimizationService()
        
        # First analyze for opportunities
        analysis = await optimization_service.analyze_optimization_opportunities(request.code, request.language)
        
        if "error" in analysis:
            return OptimizationResponse(
                success=False,
                original_code=request.code,
                error=analysis["error"]
            )
        
        # Get optimization types to apply
        optimization_types = [opt.get("type") for opt in analysis.get("optimizations", [])]
        
        # Generate optimized code
        result = await optimization_service.generate_optimized_code(request.code, request.language, optimization_types)
        
        if "error" in result:
            return OptimizationResponse(
                success=False,
                original_code=request.code,
                error=result["error"]
            )
        
        return OptimizationResponse(
            success=True,
            original_code=request.code,
            optimized_code=result.get("optimized_code", request.code),
            suggestions=[f"Applied {opt} optimization" for opt in result.get("applied_optimizations", [])],
            improvements=result.get("improvements", {})
        )
        
    except Exception as e:
        logger.error("Optimization application failed", error=str(e))
        raise HTTPException(
            status_code=500,
            detail=f"Optimization application failed: {str(e)}"
        ) 
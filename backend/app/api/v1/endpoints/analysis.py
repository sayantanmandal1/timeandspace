"""
Code analysis endpoints
"""

from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from pydantic import BaseModel, Field

from app.core.logging import get_logger
from app.core.monitoring import get_metrics_collector
from app.services.code_analyzer import CodeAnalyzer
from app.services.visualization import VisualizationService
from app.services.complexity_analyzer import ComplexityAnalyzer

logger = get_logger(__name__)
router = APIRouter()


class CodeAnalysisRequest(BaseModel):
    """Request model for code analysis"""
    code: str = Field(..., description="Source code to analyze")
    language: str = Field(..., description="Programming language")
    input_data: Optional[List[Any]] = Field(default=None, description="Test input data")
    analysis_type: str = Field(default="full", description="Type of analysis: full, ast, complexity, visualization")
    
    class Config:
        schema_extra = {
            "example": {
                "code": "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
                "language": "python",
                "input_data": [5, 10, 15],
                "analysis_type": "full"
            }
        }


class CodeAnalysisResponse(BaseModel):
    """Response model for code analysis"""
    success: bool
    analysis_id: str
    ast_analysis: Optional[Dict[str, Any]] = None
    complexity_analysis: Optional[Dict[str, Any]] = None
    visualization_data: Optional[Dict[str, Any]] = None
    execution_trace: Optional[List[Dict[str, Any]]] = None
    optimization_suggestions: Optional[List[str]] = None
    error: Optional[str] = None


@router.post("/analyze", response_model=CodeAnalysisResponse)
async def analyze_code(
    request: CodeAnalysisRequest,
    background_tasks: BackgroundTasks
) -> CodeAnalysisResponse:
    """
    Analyze code and generate comprehensive analysis including AST, complexity, and visualizations
    """
    metrics = get_metrics_collector()
    metrics.increment_counter("code_analysis_requests")
    
    try:
        logger.info("Starting code analysis", language=request.language, analysis_type=request.analysis_type)
        
        # Initialize services
        code_analyzer = CodeAnalyzer()
        visualization_service = VisualizationService()
        complexity_analyzer = ComplexityAnalyzer()
        
        # Generate analysis ID
        import uuid
        analysis_id = str(uuid.uuid4())
        
        # Perform AST analysis (always, to detect input requirements)
        ast_analysis = await code_analyzer.analyze_ast(request.code, request.language)
        
        # If input is required but not provided, return input schema for frontend prompt
        if ast_analysis.get("input_required") and (not request.input_data or len(request.input_data) == 0):
            return CodeAnalysisResponse(
                success=False,
                analysis_id=analysis_id,
                ast_analysis=ast_analysis,
                error="Input required for this code. Please provide input as specified in input_schema.",
            )
        
        # Perform complexity analysis
        complexity_analysis = None
        if request.analysis_type in ["full", "complexity"]:
            complexity_analysis = await complexity_analyzer.analyze_complexity(
                request.code, request.language
            )
        
        # Generate visualizations
        visualization_data = None
        if request.analysis_type in ["full", "visualization"]:
            visualization_data = await visualization_service.generate_visualizations(
                request.code, request.language, request.input_data
            )
        
        # Execute code with test inputs
        execution_trace = None
        if request.input_data is not None:
            execution_trace = await code_analyzer.execute_with_trace(
                request.code, request.language, request.input_data
            )
        
        # Generate optimization suggestions
        optimization_suggestions = await code_analyzer.generate_optimization_suggestions(
            request.code, request.language, complexity_analysis
        )
        
        logger.info("Code analysis completed successfully", analysis_id=analysis_id)
        metrics.increment_counter("code_analysis_success")
        
        return CodeAnalysisResponse(
            success=True,
            analysis_id=analysis_id,
            ast_analysis=ast_analysis,
            complexity_analysis=complexity_analysis,
            visualization_data=visualization_data,
            execution_trace=execution_trace,
            optimization_suggestions=optimization_suggestions
        )
        
    except Exception as e:
        logger.error("Code analysis failed", error=str(e), language=request.language)
        metrics.increment_counter("code_analysis_errors")
        metrics.record_error("code_analysis_error", str(e))
        
        raise HTTPException(
            status_code=500,
            detail=f"Code analysis failed: {str(e)}"
        )


@router.get("/ast/{analysis_id}")
async def get_ast_analysis(analysis_id: str) -> Dict[str, Any]:
    """
    Get AST analysis for a specific analysis ID
    """
    # This would typically fetch from cache or database
    # For now, return a placeholder
    return {
        "analysis_id": analysis_id,
        "ast": "AST data would be returned here",
        "status": "completed"
    }


@router.get("/complexity/{analysis_id}")
async def get_complexity_analysis(analysis_id: str) -> Dict[str, Any]:
    """
    Get complexity analysis for a specific analysis ID
    """
    # This would typically fetch from cache or database
    # For now, return a placeholder
    return {
        "analysis_id": analysis_id,
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "status": "completed"
    }


@router.get("/visualization/{analysis_id}")
async def get_visualization(analysis_id: str) -> Dict[str, Any]:
    """
    Get visualization data for a specific analysis ID
    """
    # This would typically fetch from cache or database
    # For now, return a placeholder
    return {
        "analysis_id": analysis_id,
        "visualizations": {
            "execution_flow": "execution_flow_data",
            "memory_usage": "memory_usage_data",
            "performance_graph": "performance_graph_data"
        },
        "status": "completed"
    }


@router.post("/batch-analyze")
async def batch_analyze_code(requests: List[CodeAnalysisRequest]) -> List[CodeAnalysisResponse]:
    """
    Analyze multiple code snippets in batch
    """
    metrics = get_metrics_collector()
    metrics.increment_counter("batch_analysis_requests")
    
    results = []
    for request in requests:
        try:
            result = await analyze_code(request, BackgroundTasks())
            results.append(result)
        except Exception as e:
            logger.error("Batch analysis item failed", error=str(e))
            results.append(CodeAnalysisResponse(
                success=False,
                analysis_id="",
                error=str(e)
            ))
    
    return results 
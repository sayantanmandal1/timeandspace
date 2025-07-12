"""
Batch analysis endpoint for processing multiple code files
"""

from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.logging import get_logger
from app.services.code_analyzer import CodeAnalyzer
from app.services.complexity_analyzer import ComplexityAnalyzer
from app.services.optimization_service import OptimizationService
from app.services.visualization import VisualizationService
from app.core.monitoring import metrics

logger = get_logger(__name__)
router = APIRouter()


class BatchAnalysisRequest(BaseModel):
    """Request model for batch analysis"""
    files: List[Dict[str, Any]] = [
        {
            "name": "example.py",
            "content": "print('Hello, World!')",
            "language": "python"
        }
    ]
    analysis_types: List[str] = ["ast", "complexity", "optimization"]
    include_visualizations: bool = False


class BatchAnalysisResponse(BaseModel):
    """Response model for batch analysis"""
    success: bool
    total_files: int
    processed_files: int
    failed_files: int
    results: List[Dict[str, Any]]
    summary: Dict[str, Any]
    error: Optional[str] = None


@router.post("/analyze", response_model=BatchAnalysisResponse)
async def analyze_batch(request: BatchAnalysisRequest) -> BatchAnalysisResponse:
    """
    Analyze multiple code files in batch
    """
    try:
        logger.info("Starting batch analysis", file_count=len(request.files))
        metrics.increment_counter("batch_analysis_requests")
        
        # Initialize services
        code_analyzer = CodeAnalyzer()
        complexity_analyzer = ComplexityAnalyzer()
        optimization_service = OptimizationService()
        visualization_service = VisualizationService()
        
        results = []
        processed_files = 0
        failed_files = 0
        
        # Process each file
        for file_data in request.files:
            try:
                file_name = file_data.get("name", "unknown")
                content = file_data.get("content", "")
                language = file_data.get("language", "python")
                
                logger.info(f"Processing file: {file_name}", language=language)
                
                file_result = {
                    "file_name": file_name,
                    "language": language,
                    "file_size": len(content),
                    "analysis": {}
                }
                
                # Perform requested analyses
                if "ast" in request.analysis_types:
                    ast_analysis = await code_analyzer.analyze_ast(content, language)
                    file_result["analysis"]["ast"] = ast_analysis
                
                if "complexity" in request.analysis_types:
                    complexity_analysis = await complexity_analyzer.analyze_complexity(content, language)
                    file_result["analysis"]["complexity"] = complexity_analysis
                
                if "optimization" in request.analysis_types:
                    optimization_analysis = await optimization_service.analyze_optimization_opportunities(content, language)
                    file_result["analysis"]["optimization"] = optimization_analysis
                
                if request.include_visualizations:
                    visualization_data = await visualization_service.generate_visualizations(content, language, [])
                    file_result["analysis"]["visualization"] = visualization_data
                
                results.append(file_result)
                processed_files += 1
                
            except Exception as e:
                logger.error(f"Failed to process file {file_data.get('name', 'unknown')}", error=str(e))
                failed_files += 1
                results.append({
                    "file_name": file_data.get("name", "unknown"),
                    "language": file_data.get("language", "unknown"),
                    "error": str(e),
                    "analysis": {}
                })
        
        # Generate summary
        summary = _generate_batch_summary(results, request.analysis_types)
        
        logger.info("Batch analysis completed", 
                   processed=processed_files, 
                   failed=failed_files,
                   total=len(request.files))
        
        return BatchAnalysisResponse(
            success=True,
            total_files=len(request.files),
            processed_files=processed_files,
            failed_files=failed_files,
            results=results,
            summary=summary
        )
        
    except Exception as e:
        logger.error("Batch analysis failed", error=str(e))
        metrics.increment_counter("batch_analysis_errors")
        metrics.record_error("batch_analysis_error", str(e))
        
        raise HTTPException(
            status_code=500,
            detail=f"Batch analysis failed: {str(e)}"
        )


def _generate_batch_summary(results: List[Dict[str, Any]], analysis_types: List[str]) -> Dict[str, Any]:
    """Generate summary statistics for batch analysis"""
    summary = {
        "total_files": len(results),
        "successful_analyses": len([r for r in results if "error" not in r]),
        "failed_analyses": len([r for r in results if "error" in r]),
        "languages": {},
        "complexity_distribution": {},
        "optimization_opportunities": {
            "high_priority": 0,
            "medium_priority": 0,
            "low_priority": 0
        }
    }
    
    # Language distribution
    for result in results:
        if "error" not in result:
            lang = result.get("language", "unknown")
            summary["languages"][lang] = summary["languages"].get(lang, 0) + 1
    
    # Complexity distribution
    for result in results:
        if "error" not in result and "complexity" in result.get("analysis", {}):
            complexity = result["analysis"]["complexity"]
            time_complexity = complexity.get("time_complexity", "Unknown")
            summary["complexity_distribution"][time_complexity] = summary["complexity_distribution"].get(time_complexity, 0) + 1
    
    # Optimization opportunities
    for result in results:
        if "error" not in result and "optimization" in result.get("analysis", {}):
            optimization = result["analysis"]["optimization"]
            summary["optimization_opportunities"]["high_priority"] += optimization.get("high_priority", 0)
            summary["optimization_opportunities"]["medium_priority"] += optimization.get("medium_priority", 0)
            summary["optimization_opportunities"]["low_priority"] += optimization.get("low_priority", 0)
    
    return summary


@router.get("/status/{batch_id}")
async def get_batch_status(batch_id: str) -> Dict[str, Any]:
    """
    Get status of a batch analysis job
    """
    # This would typically check a job queue or database
    # For now, return a mock status
    return {
        "batch_id": batch_id,
        "status": "completed",
        "progress": 100,
        "message": "Batch analysis completed successfully"
    }


@router.get("/results/{batch_id}")
async def get_batch_results(batch_id: str) -> Dict[str, Any]:
    """
    Get results of a completed batch analysis
    """
    # This would typically fetch from cache or database
    # For now, return a mock response
    return {
        "batch_id": batch_id,
        "status": "completed",
        "results": [],
        "summary": {
            "total_files": 0,
            "successful_analyses": 0,
            "failed_analyses": 0
        }
    } 
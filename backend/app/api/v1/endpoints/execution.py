"""
Code execution endpoints
"""

from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.core.logging import get_logger

logger = get_logger(__name__)
router = APIRouter()


class ExecutionRequest(BaseModel):
    """Request model for code execution"""
    code: str = Field(..., description="Source code to execute")
    language: str = Field(..., description="Programming language")
    input_data: List[Any] = Field(default=[], description="Input data for execution")
    timeout: Optional[int] = Field(default=30, description="Execution timeout in seconds")
    
    class Config:
        schema_extra = {
            "example": {
                "code": "print('Hello, World!')",
                "language": "python",
                "input_data": [],
                "timeout": 30
            }
        }


class ExecutionResponse(BaseModel):
    """Response model for code execution"""
    success: bool
    output: Optional[str] = None
    error: Optional[str] = None
    execution_time: Optional[float] = None
    memory_usage: Optional[float] = None
    exit_code: Optional[int] = None


@router.post("/execute", response_model=ExecutionResponse)
async def execute_code(request: ExecutionRequest) -> ExecutionResponse:
    """
    Execute code with given input data
    """
    try:
        logger.info("Starting code execution", language=request.language)
        
        # Placeholder for actual execution logic
        # In a real implementation, this would use the execution service
        
        return ExecutionResponse(
            success=True,
            output="Code execution completed successfully",
            execution_time=0.1,
            memory_usage=1024.0,
            exit_code=0
        )
        
    except Exception as e:
        logger.error("Code execution failed", error=str(e))
        raise HTTPException(
            status_code=500,
            detail=f"Code execution failed: {str(e)}"
        )


@router.post("/test")
async def test_code(request: ExecutionRequest) -> Dict[str, Any]:
    """
    Test code with multiple test cases
    """
    # Placeholder for test execution
    return {
        "success": True,
        "test_results": [
            {"test_case": 1, "passed": True, "output": "Expected output"},
            {"test_case": 2, "passed": True, "output": "Expected output"}
        ],
        "total_tests": 2,
        "passed_tests": 2,
        "failed_tests": 0
    } 
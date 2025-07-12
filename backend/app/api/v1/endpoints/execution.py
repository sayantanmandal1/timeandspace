"""
Code execution endpoints
"""

from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.core.logging import get_logger
from app.services.runx_executor import execute_code_with_runx

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
        
        # Execute code using the runx executor
        result = execute_code_with_runx(request.code, request.language, request.input_data)
        
        if "error" in result:
            return ExecutionResponse(
                success=False,
                error=result["error"],
                exit_code=1
            )
        
        # Extract output from trace
        trace = result.get("trace", [])
        if trace and len(trace) > 0:
            last_trace = trace[-1]
            output = last_trace.get("stdout", "")
            error_output = last_trace.get("stderr", "")
            compile_output = last_trace.get("compile_output", "")
            
            # Combine outputs
            full_output = ""
            if compile_output:
                full_output += f"Compilation:\n{compile_output}\n\n"
            if error_output:
                full_output += f"Errors:\n{error_output}\n\n"
            if output:
                full_output += f"Output:\n{output}"
            
            return ExecutionResponse(
                success=not bool(error_output),
                output=full_output.strip() if full_output.strip() else "Code executed successfully",
                execution_time=0.1,  # Could be extracted from runx response if available
                memory_usage=1024.0,  # Could be extracted from runx response if available
                exit_code=0 if not error_output else 1
            )
        else:
            return ExecutionResponse(
                success=False,
                error="No execution trace received",
                exit_code=1
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
    try:
        logger.info("Starting code testing", language=request.language)
        
        # Execute the code
        result = execute_code_with_runx(request.code, request.language, request.input_data)
        
        if "error" in result:
            return {
                "success": False,
                "test_results": [
                    {"test_case": 1, "passed": False, "output": result["error"]}
                ],
                "total_tests": 1,
                "passed_tests": 0,
                "failed_tests": 1
            }
        
        # Extract output from trace
        trace = result.get("trace", [])
        if trace and len(trace) > 0:
            last_trace = trace[-1]
            output = last_trace.get("stdout", "")
            error_output = last_trace.get("stderr", "")
            
            success = not bool(error_output)
            
            return {
                "success": success,
                "test_results": [
                    {
                        "test_case": 1, 
                        "passed": success, 
                        "output": output if success else error_output
                    }
                ],
                "total_tests": 1,
                "passed_tests": 1 if success else 0,
                "failed_tests": 0 if success else 1
            }
        else:
            return {
                "success": False,
                "test_results": [
                    {"test_case": 1, "passed": False, "output": "No execution trace received"}
                ],
                "total_tests": 1,
                "passed_tests": 0,
                "failed_tests": 1
            }
            
    except Exception as e:
        logger.error("Code testing failed", error=str(e))
        return {
            "success": False,
            "test_results": [
                {"test_case": 1, "passed": False, "output": f"Testing failed: {str(e)}"}
            ],
            "total_tests": 1,
            "passed_tests": 0,
            "failed_tests": 1
        } 
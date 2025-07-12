"""
Service to execute code in any supported language using the runx API.
"""
import requests
import subprocess
import tempfile
import os
import sys
from typing import List, Dict, Any

RUNX_API_URL = "https://runx.alanj.live/api/execute"  # Replace with your self-hosted URL if needed

LANGUAGE_MAP = {
    'python': 'python3',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'javascript': 'nodejs',
    # Add more as supported by runx
}

def execute_python_locally(code: str, input_data: List[Any]) -> Dict[str, Any]:
    """
    Execute Python code locally as a fallback when runx API is not available
    """
    try:
        # Create a temporary file for the code
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
            f.write(code)
            temp_file = f.name
        
        # Prepare input data
        input_str = "\n".join(str(x) for x in input_data) if input_data else ""
        
        # Execute the Python code
        result = subprocess.run(
            [sys.executable, temp_file],
            input=input_str,
            capture_output=True,
            text=True,
            timeout=30
        )
        
        # Clean up the temporary file
        os.unlink(temp_file)
        
        # Create trace format compatible with frontend
        trace = [{
            "stdout": result.stdout,
            "stderr": result.stderr,
            "compile_output": "",
            "signal": None,
            "code": result.returncode
        }]
        
        return {"trace": trace}
        
    except subprocess.TimeoutExpired:
        return {"error": "Execution timed out"}
    except Exception as e:
        return {"error": f"Local execution failed: {str(e)}"}

def execute_code_with_runx(code: str, language: str, input_data: List[Any]) -> Dict[str, Any]:
    """
    Execute code using the runx API and return output/trace in a unified format.
    Falls back to local execution for Python if runx API is not available.
    """
    runtime = LANGUAGE_MAP.get(language.lower())
    if not runtime:
        return {"error": f"Language {language} not supported by runx."}
    
    # For Python, try local execution first as fallback
    if language.lower() == 'python':
        try:
            return execute_python_locally(code, input_data)
        except Exception as e:
            return {"error": f"Local Python execution failed: {str(e)}"}
    
    # For other languages, try runx API
    stdin = "\n".join(str(x) for x in input_data) if input_data else ""
    payload = {
        "code": code,
        "runtime": runtime,
        "stdin": stdin
    }
    
    try:
        resp = requests.post(RUNX_API_URL, json=payload, timeout=10)
        if resp.status_code != 200:
            return {"error": f"Runx API error: {resp.status_code}"}
        data = resp.json()
        # Wrap output in a trace-like format for frontend compatibility
        trace = [{
            "stdout": data.get("stdout"),
            "stderr": data.get("stderr"),
            "compile_output": data.get("compile_output"),
            "signal": data.get("signal"),
            "code": data.get("code")
        }]
        return {"trace": trace}
    except requests.exceptions.ConnectionError:
        return {"error": "Runx API is not available. Please check your internet connection or use Python for local execution."}
    except Exception as e:
        return {"error": str(e)} 
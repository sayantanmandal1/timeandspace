"""
Service to execute code in any supported language using the runx API.
"""
import requests
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

def execute_code_with_runx(code: str, language: str, input_data: List[Any]) -> Dict[str, Any]:
    """
    Execute code using the runx API and return output/trace in a unified format.
    """
    runtime = LANGUAGE_MAP.get(language.lower())
    if not runtime:
        return {"error": f"Language {language} not supported by runx."}
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
    except Exception as e:
        return {"error": str(e)} 
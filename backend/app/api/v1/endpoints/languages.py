"""
Languages endpoint
"""

from typing import Dict, Any, List
from fastapi import APIRouter

from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)
router = APIRouter()


@router.get("/supported")
async def get_supported_languages() -> Dict[str, Any]:
    """
    Get list of supported programming languages
    """
    return {
        "languages": list(settings.SUPPORTED_LANGUAGES.keys()),
        "total_count": len(settings.SUPPORTED_LANGUAGES),
        "details": settings.SUPPORTED_LANGUAGES
    }


@router.get("/{language}")
async def get_language_info(language: str) -> Dict[str, Any]:
    """
    Get detailed information about a specific language
    """
    if language not in settings.SUPPORTED_LANGUAGES:
        return {
            "error": f"Language '{language}' is not supported",
            "supported_languages": list(settings.SUPPORTED_LANGUAGES.keys())
        }
    
    lang_info = settings.SUPPORTED_LANGUAGES[language]
    return {
        "language": language,
        "extensions": lang_info.get("extensions", []),
        "executor": lang_info.get("executor", ""),
        "compiler": lang_info.get("compiler", ""),
        "timeout": lang_info.get("timeout", 30),
        "memory_limit": lang_info.get("memory_limit", "512m"),
        "features": {
            "ast_analysis": True,
            "complexity_analysis": True,
            "execution": True,
            "visualization": True
        }
    }


@router.get("/{language}/extensions")
async def get_language_extensions(language: str) -> Dict[str, Any]:
    """
    Get file extensions for a specific language
    """
    if language not in settings.SUPPORTED_LANGUAGES:
        return {
            "error": f"Language '{language}' is not supported"
        }
    
    return {
        "language": language,
        "extensions": settings.SUPPORTED_LANGUAGES[language].get("extensions", [])
    }


@router.get("/{language}/executor")
async def get_language_executor(language: str) -> Dict[str, Any]:
    """
    Get executor information for a specific language
    """
    if language not in settings.SUPPORTED_LANGUAGES:
        return {
            "error": f"Language '{language}' is not supported"
        }
    
    lang_info = settings.SUPPORTED_LANGUAGES[language]
    return {
        "language": language,
        "executor": lang_info.get("executor", ""),
        "compiler": lang_info.get("compiler", ""),
        "timeout": lang_info.get("timeout", 30),
        "memory_limit": lang_info.get("memory_limit", "512m")
    } 
"""
Logging configuration for the DSA Code Analysis Platform
"""

import logging
import sys
import json
from datetime import datetime
from typing import Optional, Dict, Any


class StructuredLogger:
    """Simple structured logger implementation"""
    
    def __init__(self, name: str):
        self.name = name
        self.logger = logging.getLogger(name)
    
    def _format_message(self, level: str, message: str, **kwargs) -> str:
        """Format log message as JSON"""
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": level,
            "logger": self.name,
            "message": message,
            **kwargs
        }
        return json.dumps(log_entry)
    
    def debug(self, message: str, **kwargs):
        """Log debug message"""
        self.logger.debug(self._format_message("DEBUG", message, **kwargs))
    
    def info(self, message: str, **kwargs):
        """Log info message"""
        self.logger.info(self._format_message("INFO", message, **kwargs))
    
    def warning(self, message: str, **kwargs):
        """Log warning message"""
        self.logger.warning(self._format_message("WARNING", message, **kwargs))
    
    def error(self, message: str, **kwargs):
        """Log error message"""
        self.logger.error(self._format_message("ERROR", message, **kwargs))
    
    def critical(self, message: str, **kwargs):
        """Log critical message"""
        self.logger.critical(self._format_message("CRITICAL", message, **kwargs))


def setup_logging(
    log_level: str = "INFO",
    log_format: str = "json",
    log_file: Optional[str] = None
) -> None:
    """
    Setup structured logging for the application
    
    Args:
        log_level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        log_format: Log format (json, console)
        log_file: Optional log file path
    """
    
    # Configure standard library logging
    if log_file:
        logging.basicConfig(
            level=getattr(logging, log_level.upper()),
            format="%(message)s",
            filename=log_file,
            filemode="a",
        )
    else:
        logging.basicConfig(
            level=getattr(logging, log_level.upper()),
            format="%(message)s",
            stream=sys.stdout,
        )


def get_logger(name: str) -> StructuredLogger:
    """
    Get a structured logger instance
    
    Args:
        name: Logger name (usually __name__)
        
    Returns:
        Structured logger instance
    """
    return StructuredLogger(name) 
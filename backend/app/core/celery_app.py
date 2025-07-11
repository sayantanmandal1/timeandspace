"""
Celery task queue configuration
"""

from typing import Optional
from celery import Celery

from .config import settings
from .logging import get_logger

logger = get_logger(__name__)

# Global Celery app
celery_app: Optional[Celery] = None


def init_celery() -> None:
    """Initialize Celery task queue"""
    global celery_app
    
    try:
        # Create Celery app
        celery_app = Celery(
            "dsa_analysis",
            broker=settings.CELERY_BROKER_URL,
            backend=settings.CELERY_RESULT_BACKEND,
            include=[
                "app.tasks.code_analysis",
                "app.tasks.visualization",
                "app.tasks.optimization",
                "app.tasks.execution",
            ]
        )
        
        # Configure Celery
        celery_app.conf.update(
            task_serializer="json",
            accept_content=["json"],
            result_serializer="json",
            timezone="UTC",
            enable_utc=True,
            task_track_started=True,
            task_time_limit=settings.CODE_EXECUTION_TIMEOUT * 2,
            task_soft_time_limit=settings.CODE_EXECUTION_TIMEOUT,
            worker_prefetch_multiplier=1,
            worker_max_tasks_per_child=1000,
            broker_connection_retry_on_startup=True,
        )
        
        logger.info("Celery task queue initialized successfully")
        
    except Exception as e:
        logger.error("Failed to initialize Celery", error=str(e))
        celery_app = None


def get_celery() -> Optional[Celery]:
    """Get Celery app instance"""
    return celery_app


def create_task_queue():
    """Create task queue for background processing"""
    if not celery_app:
        logger.warning("Celery not initialized, using synchronous processing")
        return None
    
    return celery_app 
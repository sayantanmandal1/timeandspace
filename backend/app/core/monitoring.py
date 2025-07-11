"""
Monitoring and metrics configuration
"""

import time
import asyncio
from typing import Dict, Any, Optional
from datetime import datetime

from .config import settings
from .logging import get_logger

logger = get_logger(__name__)

# Global metrics storage
metrics = {
    "requests": {},
    "errors": {},
    "performance": {},
    "custom": {}
}


def init_monitoring() -> None:
    """Initialize monitoring system"""
    logger.info("Monitoring system initialized")


class MetricsCollector:
    """Simple metrics collector (placeholder for Prometheus)"""
    
    def __init__(self):
        self.metrics = metrics
    
    def increment_counter(self, name: str, labels: Optional[Dict[str, str]] = None):
        """Increment a counter metric"""
        key = f"{name}:{hash(str(labels))}" if labels else name
        if key not in self.metrics["requests"]:
            self.metrics["requests"][key] = 0
        self.metrics["requests"][key] += 1
    
    def record_histogram(self, name: str, value: float, labels: Optional[Dict[str, str]] = None):
        """Record a histogram metric"""
        key = f"{name}:{hash(str(labels))}" if labels else name
        if key not in self.metrics["performance"]:
            self.metrics["performance"][key] = []
        self.metrics["performance"][key].append(value)
    
    def record_gauge(self, name: str, value: float, labels: Optional[Dict[str, str]] = None):
        """Record a gauge metric"""
        key = f"{name}:{hash(str(labels))}" if labels else name
        self.metrics["custom"][key] = value
    
    def record_error(self, error_type: str, error_message: str):
        """Record an error metric"""
        if error_type not in self.metrics["errors"]:
            self.metrics["errors"][error_type] = 0
        self.metrics["errors"][error_type] += 1
        logger.error("Error recorded", error_type=error_type, error_message=error_message)
    
    def get_metrics(self) -> Dict[str, Any]:
        """Get all metrics"""
        return self.metrics.copy()
    
    def reset_metrics(self):
        """Reset all metrics"""
        self.metrics = {
            "requests": {},
            "errors": {},
            "performance": {},
            "custom": {}
        }


# Global metrics collector
metrics_collector = MetricsCollector()


def get_metrics_collector() -> MetricsCollector:
    """Get metrics collector instance"""
    return metrics_collector


class PerformanceMonitor:
    """Performance monitoring utilities"""
    
    def __init__(self):
        self.start_times = {}
    
    def start_timer(self, name: str):
        """Start a performance timer"""
        self.start_times[name] = time.time()
    
    def end_timer(self, name: str) -> float:
        """End a performance timer and return duration"""
        if name not in self.start_times:
            return 0.0
        
        duration = time.time() - self.start_times[name]
        del self.start_times[name]
        
        # Record metric
        metrics_collector.record_histogram(f"{name}_duration", duration)
        
        return duration
    
    def measure_function(self, name: str):
        """Decorator to measure function performance"""
        def decorator(func):
            def wrapper(*args, **kwargs):
                self.start_timer(name)
                try:
                    result = func(*args, **kwargs)
                    return result
                finally:
                    self.end_timer(name)
            return wrapper
        return decorator


# Global performance monitor
performance_monitor = PerformanceMonitor()


def get_performance_monitor() -> PerformanceMonitor:
    """Get performance monitor instance"""
    return performance_monitor


class HealthChecker:
    """Health check utilities"""
    
    def __init__(self):
        self.checks = {}
    
    def register_check(self, name: str, check_func):
        """Register a health check"""
        self.checks[name] = check_func
    
    async def run_checks(self) -> Dict[str, Any]:
        """Run all health checks"""
        results = {}
        
        for name, check_func in self.checks.items():
            try:
                if asyncio.iscoroutinefunction(check_func):
                    result = await check_func()
                else:
                    result = check_func()
                results[name] = {"status": "healthy", "result": result}
            except Exception as e:
                results[name] = {"status": "unhealthy", "error": str(e)}
                logger.error("Health check failed", check_name=name, error=str(e))
        
        return results
    
    def get_overall_status(self, results: Dict[str, Any]) -> str:
        """Get overall health status"""
        for check_result in results.values():
            if check_result["status"] == "unhealthy":
                return "unhealthy"
        return "healthy"


# Global health checker
health_checker = HealthChecker()


def get_health_checker() -> HealthChecker:
    """Get health checker instance"""
    return health_checker 
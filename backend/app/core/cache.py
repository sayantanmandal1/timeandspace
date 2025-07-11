"""
Cache configuration and Redis connection management
"""

import json
import asyncio
from typing import Optional, Any, Dict, List
import redis.asyncio as redis
from redis.asyncio import Redis

from .config import settings
from .logging import get_logger

logger = get_logger(__name__)

# Global Redis client
redis_client: Optional[Redis] = None


async def init_cache() -> None:
    """Initialize Redis cache connection"""
    global redis_client
    
    try:
        # Create Redis client
        redis_client = redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
            max_connections=settings.REDIS_POOL_SIZE,
        )
        
        # Test connection
        await redis_client.ping()
        
        logger.info("Redis cache connection established successfully")
        
    except Exception as e:
        logger.error("Failed to initialize Redis cache", error=str(e))
        # Don't raise error for cache - it's optional
        redis_client = None


async def get_cache() -> Optional[Redis]:
    """Get Redis cache client"""
    return redis_client


async def close_cache() -> None:
    """Close Redis cache connection"""
    global redis_client
    
    if redis_client:
        await redis_client.close()
        logger.info("Redis cache connection closed")


class CacheManager:
    """Cache manager for the application"""
    
    def __init__(self, redis_client: Optional[Redis] = None):
        self.redis = redis_client
        self.default_ttl = settings.CACHE_TTL
    
    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        if not self.redis:
            return None
        
        try:
            value = await self.redis.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error("Cache get error", key=key, error=str(e))
            return None
    
    async def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Set value in cache"""
        if not self.redis:
            return False
        
        try:
            ttl = ttl or self.default_ttl
            await self.redis.setex(key, ttl, json.dumps(value))
            return True
        except Exception as e:
            logger.error("Cache set error", key=key, error=str(e))
            return False
    
    async def delete(self, key: str) -> bool:
        """Delete value from cache"""
        if not self.redis:
            return False
        
        try:
            await self.redis.delete(key)
            return True
        except Exception as e:
            logger.error("Cache delete error", key=key, error=str(e))
            return False
    
    async def exists(self, key: str) -> bool:
        """Check if key exists in cache"""
        if not self.redis:
            return False
        
        try:
            return await self.redis.exists(key) > 0
        except Exception as e:
            logger.error("Cache exists error", key=key, error=str(e))
            return False
    
    async def expire(self, key: str, ttl: int) -> bool:
        """Set expiration for key"""
        if not self.redis:
            return False
        
        try:
            return await self.redis.expire(key, ttl)
        except Exception as e:
            logger.error("Cache expire error", key=key, error=str(e))
            return False
    
    async def clear_pattern(self, pattern: str) -> int:
        """Clear all keys matching pattern"""
        if not self.redis:
            return 0
        
        try:
            keys = await self.redis.keys(pattern)
            if keys:
                return await self.redis.delete(*keys)
            return 0
        except Exception as e:
            logger.error("Cache clear pattern error", pattern=pattern, error=str(e))
            return 0
    
    async def get_many(self, keys: List[str]) -> Dict[str, Any]:
        """Get multiple values from cache"""
        if not self.redis:
            return {}
        
        try:
            values = await self.redis.mget(keys)
            result = {}
            for key, value in zip(keys, values):
                if value:
                    result[key] = json.loads(value)
            return result
        except Exception as e:
            logger.error("Cache get many error", keys=keys, error=str(e))
            return {}
    
    async def set_many(self, data: Dict[str, Any], ttl: Optional[int] = None) -> bool:
        """Set multiple values in cache"""
        if not self.redis:
            return False
        
        try:
            ttl = ttl or self.default_ttl
            pipeline = self.redis.pipeline()
            
            for key, value in data.items():
                pipeline.setex(key, ttl, json.dumps(value))
            
            await pipeline.execute()
            return True
        except Exception as e:
            logger.error("Cache set many error", error=str(e))
            return False


# Global cache manager instance
cache_manager: Optional[CacheManager] = None


async def get_cache_manager() -> CacheManager:
    """Get cache manager instance"""
    global cache_manager
    
    if not cache_manager:
        redis_client = await get_cache()
        cache_manager = CacheManager(redis_client)
    
    return cache_manager 
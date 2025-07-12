"""
Optimization models for storing code optimization results
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Optimization(Base):
    """Optimization model for storing code optimization metadata"""
    
    __tablename__ = "optimizations"
    
    id = Column(Integer, primary_key=True, index=True)
    optimization_id = Column(String(36), unique=True, index=True, nullable=False)  # UUID
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Optional for anonymous users
    title = Column(String(200))
    description = Column(Text)
    original_code = Column(Text, nullable=False)
    language = Column(String(20), nullable=False)
    optimization_type = Column(String(20), default="performance")  # performance, readability, security
    status = Column(String(20), default="pending")  # pending, processing, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime)
    processing_time = Column(Float)  # in seconds
    error_message = Column(Text)
    
    # Relationships
    user = relationship("User", back_populates="optimizations")
    result = relationship("OptimizationResult", back_populates="optimization", uselist=False)
    
    def __repr__(self):
        return f"<Optimization(id={self.id}, optimization_id='{self.optimization_id}', language='{self.language}')>"


class OptimizationResult(Base):
    """OptimizationResult model for storing detailed optimization results"""
    
    __tablename__ = "optimization_results"
    
    id = Column(Integer, primary_key=True, index=True)
    optimization_id = Column(Integer, ForeignKey("optimizations.id"), nullable=False)
    optimized_code = Column(Text)
    suggestions = Column(JSON)
    improvements = Column(JSON)
    before_metrics = Column(JSON)  # Performance metrics before optimization
    after_metrics = Column(JSON)   # Performance metrics after optimization
    complexity_analysis = Column(JSON)
    security_analysis = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    optimization = relationship("Optimization", back_populates="result")
    
    def __repr__(self):
        return f"<OptimizationResult(id={self.id}, optimization_id={self.optimization_id})>" 
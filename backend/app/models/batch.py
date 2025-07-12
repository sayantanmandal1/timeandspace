"""
Batch analysis models for storing batch processing results
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class BatchAnalysis(Base):
    """BatchAnalysis model for storing batch analysis metadata"""
    
    __tablename__ = "batch_analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(String(36), unique=True, index=True, nullable=False)  # UUID
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Optional for anonymous users
    title = Column(String(200))
    description = Column(Text)
    files = Column(JSON, nullable=False)  # Array of file objects with name, content, language
    analysis_types = Column(JSON, default=[])  # Array of analysis types to perform
    status = Column(String(20), default="pending")  # pending, processing, completed, failed
    progress = Column(Float, default=0.0)  # Progress percentage (0-100)
    total_files = Column(Integer, default=0)
    processed_files = Column(Integer, default=0)
    failed_files = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime)
    processing_time = Column(Float)  # in seconds
    error_message = Column(Text)
    
    # Relationships
    user = relationship("User", back_populates="batch_analyses")
    results = relationship("BatchResult", back_populates="batch_analysis")
    
    def __repr__(self):
        return f"<BatchAnalysis(id={self.id}, batch_id='{self.batch_id}', status='{self.status}')>"


class BatchResult(Base):
    """BatchResult model for storing individual file analysis results within a batch"""
    
    __tablename__ = "batch_results"
    
    id = Column(Integer, primary_key=True, index=True)
    batch_analysis_id = Column(Integer, ForeignKey("batch_analyses.id"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_language = Column(String(20), nullable=False)
    analysis_results = Column(JSON)  # Combined results from all analysis types
    status = Column(String(20), default="pending")  # pending, completed, failed
    error_message = Column(Text)
    processing_time = Column(Float)  # in seconds
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    batch_analysis = relationship("BatchAnalysis", back_populates="results")
    
    def __repr__(self):
        return f"<BatchResult(id={self.id}, file_name='{self.file_name}', status='{self.status}')>" 
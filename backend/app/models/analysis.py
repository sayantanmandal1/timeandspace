"""
Analysis models for storing code analysis results
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Analysis(Base):
    """Analysis model for storing code analysis metadata"""
    
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(String(36), unique=True, index=True, nullable=False)  # UUID
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Optional for anonymous users
    title = Column(String(200))
    description = Column(Text)
    code = Column(Text, nullable=False)
    language = Column(String(20), nullable=False)
    analysis_type = Column(String(20), default="full")  # full, ast, complexity, visualization
    input_data = Column(JSON, default=[])
    status = Column(String(20), default="pending")  # pending, processing, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime)
    execution_time = Column(Float)  # in seconds
    error_message = Column(Text)
    
    # Relationships
    user = relationship("User", back_populates="analyses")
    result = relationship("AnalysisResult", back_populates="analysis", uselist=False)
    
    def __repr__(self):
        return f"<Analysis(id={self.id}, analysis_id='{self.analysis_id}', language='{self.language}')>"


class AnalysisResult(Base):
    """AnalysisResult model for storing detailed analysis results"""
    
    __tablename__ = "analysis_results"
    
    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"), nullable=False)
    ast_analysis = Column(JSON)
    complexity_analysis = Column(JSON)
    visualization_data = Column(JSON)
    execution_trace = Column(JSON)
    optimization_suggestions = Column(JSON)
    metrics = Column(JSON)  # Performance metrics, code quality scores, etc.
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    analysis = relationship("Analysis", back_populates="result")
    
    def __repr__(self):
        return f"<AnalysisResult(id={self.id}, analysis_id={self.analysis_id})>" 
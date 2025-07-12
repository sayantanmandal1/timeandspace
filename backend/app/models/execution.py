"""
Execution models for storing code execution results
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Execution(Base):
    """Execution model for storing code execution metadata"""
    
    __tablename__ = "executions"
    
    id = Column(Integer, primary_key=True, index=True)
    execution_id = Column(String(36), unique=True, index=True, nullable=False)  # UUID
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Optional for anonymous users
    title = Column(String(200))
    description = Column(Text)
    code = Column(Text, nullable=False)
    language = Column(String(20), nullable=False)
    input_data = Column(JSON, default=[])
    status = Column(String(20), default="pending")  # pending, running, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime)
    execution_time = Column(Float)  # in seconds
    memory_usage = Column(Float)  # in MB
    cpu_usage = Column(Float)  # in percentage
    error_message = Column(Text)
    
    # Relationships
    user = relationship("User", back_populates="executions")
    result = relationship("ExecutionResult", back_populates="execution", uselist=False)
    
    def __repr__(self):
        return f"<Execution(id={self.id}, execution_id='{self.execution_id}', language='{self.language}')>"


class ExecutionResult(Base):
    """ExecutionResult model for storing detailed execution results"""
    
    __tablename__ = "execution_results"
    
    id = Column(Integer, primary_key=True, index=True)
    execution_id = Column(Integer, ForeignKey("executions.id"), nullable=False)
    output = Column(Text)
    error_output = Column(Text)
    compile_output = Column(Text)
    exit_code = Column(Integer)
    execution_trace = Column(JSON)
    performance_metrics = Column(JSON)  # CPU, memory, timing details
    security_scan = Column(JSON)  # Security analysis results
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    execution = relationship("Execution", back_populates="result")
    
    def __repr__(self):
        return f"<ExecutionResult(id={self.id}, execution_id={self.execution_id})>" 
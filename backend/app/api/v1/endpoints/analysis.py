"""
Analysis endpoints for code analysis and insights
"""

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import asyncio
import json
from datetime import datetime, timedelta

from app.services.mock_analysis_service import (
    MockCodeAnalyzer as CodeAnalyzer,
    MockComplexityAnalyzer as ComplexityAnalyzer,
    MockAIAnalyzer as AIAnalyzer,
    MockOptimizationService as OptimizationService,
    MockVisualizationService as VisualizationService
)
from app.core.security import get_current_user
from app.models.user import User
from app.models.analysis import Analysis
from app.core.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

class CodeAnalysisRequest(BaseModel):
    code: str
    language: str
    include_ast: bool = True
    include_complexity: bool = True
    include_optimization: bool = True
    include_ai_insights: bool = True
    include_visualization: bool = True
    user_context: Optional[Dict[str, Any]] = None

class BatchAnalysisRequest(BaseModel):
    files: List[Dict[str, str]]  # List of {code, language} objects
    include_comparison: bool = True
    include_ai_insights: bool = True

class LearningRecommendationRequest(BaseModel):
    user_id: int
    current_skills: List[str]
    learning_goals: List[str]
    time_available: int  # hours per week
    preferred_difficulty: str = "medium"

class PerformanceAnalysisRequest(BaseModel):
    user_id: int
    time_range: str = "month"  # week, month, quarter, year
    include_trends: bool = True
    include_predictions: bool = True

class AIInsightRequest(BaseModel):
    code: str
    language: str
    context: Optional[str] = None
    focus_areas: Optional[List[str]] = None

@router.post("/analyze")
async def analyze_code(
    request: CodeAnalysisRequest,
    background_tasks: BackgroundTasks,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Comprehensive code analysis with AI insights
    """
    try:
        analysis_result = {
            "timestamp": datetime.utcnow().isoformat(),
            "user_id": current_user.id if current_user else None,
            "language": request.language,
            "code_length": len(request.code),
            "analysis": {}
        }

        # Basic code analysis
        if request.include_ast:
            code_analyzer = CodeAnalyzer()
            ast_result = await code_analyzer.analyze(request.code, request.language)
            analysis_result["analysis"]["ast"] = ast_result

        # Complexity analysis
        if request.include_complexity:
            complexity_analyzer = ComplexityAnalyzer()
            complexity_result = await complexity_analyzer.analyze(request.code, request.language)
            analysis_result["analysis"]["complexity"] = complexity_result

        # AI-powered insights
        if request.include_ai_insights:
            ai_analyzer = AIAnalyzer()
            ai_insights = await ai_analyzer.get_insights(
                request.code, 
                request.language, 
                request.user_context
            )
            analysis_result["analysis"]["ai_insights"] = ai_insights

        # Optimization suggestions
        if request.include_optimization:
            optimization_service = OptimizationService()
            optimization_result = await optimization_service.get_suggestions(
                request.code, 
                request.language
            )
            analysis_result["analysis"]["optimization"] = optimization_result

        # Visualization data
        if request.include_visualization:
            visualization_service = VisualizationService()
            viz_data = await visualization_service.generate_data(
                request.code, 
                request.language
            )
            analysis_result["analysis"]["visualization"] = viz_data

        # Save analysis to database (only if user is authenticated)
        analysis_record = None
        if current_user:
            analysis_record = Analysis(
                user_id=current_user.id,
                code=request.code,
                language=request.language,
                result=json.dumps(analysis_result),
                created_at=datetime.utcnow()
            )
            db.add(analysis_record)
            db.commit()

            # Background task for advanced analytics
            background_tasks.add_task(
                perform_advanced_analytics, 
                current_user.id, 
                analysis_result
            )

        return {
            "success": True,
            "analysis_id": analysis_record.id if analysis_record else None,
            "result": analysis_result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/batch-analyze")
async def batch_analyze(
    request: BatchAnalysisRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Analyze multiple code files with comparison
    """
    try:
        results = []
        comparison_data = {}

        for i, file_data in enumerate(request.files):
            code_analyzer = CodeAnalyzer()
            complexity_analyzer = ComplexityAnalyzer()
            
            # Basic analysis
            ast_result = await code_analyzer.analyze(file_data["code"], file_data["language"])
            complexity_result = await complexity_analyzer.analyze(file_data["code"], file_data["language"])
            
            file_result = {
                "file_index": i,
                "language": file_data["language"],
                "ast": ast_result,
                "complexity": complexity_result
            }
            
            results.append(file_result)

        # AI-powered comparison if requested
        if request.include_comparison and len(results) > 1:
            ai_analyzer = AIAnalyzer()
            comparison_data = await ai_analyzer.compare_code_files(results)

        # AI insights for the batch
        if request.include_ai_insights:
            ai_analyzer = AIAnalyzer()
            batch_insights = await ai_analyzer.get_batch_insights(results)
            comparison_data["batch_insights"] = batch_insights

        return {
            "success": True,
            "results": results,
            "comparison": comparison_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch analysis failed: {str(e)}")

@router.post("/ai-insights")
async def get_ai_insights(
    request: AIInsightRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Get AI-powered insights for code
    """
    try:
        ai_analyzer = AIAnalyzer()
        
        insights = await ai_analyzer.get_detailed_insights(
            code=request.code,
            language=request.language,
            context=request.context,
            focus_areas=request.focus_areas
        )
        
        return {
            "success": True,
            "insights": insights
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI insights failed: {str(e)}")

@router.post("/learning-recommendations")
async def get_learning_recommendations(
    request: LearningRecommendationRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Get personalized learning recommendations
    """
    try:
        ai_analyzer = AIAnalyzer()
        
        recommendations = await ai_analyzer.get_learning_recommendations(
            user_id=request.user_id,
            current_skills=request.current_skills,
            learning_goals=request.learning_goals,
            time_available=request.time_available,
            preferred_difficulty=request.preferred_difficulty
        )
        
        return {
            "success": True,
            "recommendations": recommendations
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Learning recommendations failed: {str(e)}")

@router.post("/performance-analysis")
async def get_performance_analysis(
    request: PerformanceAnalysisRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get comprehensive performance analysis
    """
    try:
        # Get user's analysis history
        analyses = db.query(Analysis).filter(
            Analysis.user_id == request.user_id
        ).order_by(Analysis.created_at.desc()).all()

        # Calculate time range
        end_date = datetime.utcnow()
        if request.time_range == "week":
            start_date = end_date - timedelta(days=7)
        elif request.time_range == "month":
            start_date = end_date - timedelta(days=30)
        elif request.time_range == "quarter":
            start_date = end_date - timedelta(days=90)
        elif request.time_range == "year":
            start_date = end_date - timedelta(days=365)
        else:
            start_date = end_date - timedelta(days=30)

        # Filter analyses by time range
        filtered_analyses = [
            a for a in analyses 
            if start_date <= a.created_at <= end_date
        ]

        # Calculate performance metrics
        performance_data = calculate_performance_metrics(filtered_analyses)

        # Get trends if requested
        trends_data = {}
        if request.include_trends:
            trends_data = calculate_trends(filtered_analyses)

        # Get predictions if requested
        predictions_data = {}
        if request.include_predictions:
            ai_analyzer = AIAnalyzer()
            predictions_data = await ai_analyzer.predict_performance(
                performance_data, 
                trends_data
            )

        return {
            "success": True,
            "time_range": request.time_range,
            "performance": performance_data,
            "trends": trends_data,
            "predictions": predictions_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Performance analysis failed: {str(e)}")

@router.get("/user/{user_id}/analytics")
async def get_user_analytics(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get comprehensive user analytics
    """
    try:
        # Get user's analysis history
        analyses = db.query(Analysis).filter(
            Analysis.user_id == user_id
        ).order_by(Analysis.created_at.desc()).all()

        # Calculate various analytics
        analytics = {
            "total_analyses": len(analyses),
            "languages_used": {},
            "complexity_distribution": {},
            "improvement_trends": {},
            "strengths_weaknesses": {},
            "recommendations": {}
        }

        # Language usage analysis
        for analysis in analyses:
            result = json.loads(analysis.result)
            language = result.get("language", "unknown")
            analytics["languages_used"][language] = analytics["languages_used"].get(language, 0) + 1

        # Complexity analysis
        for analysis in analyses:
            result = json.loads(analysis.result)
            complexity = result.get("analysis", {}).get("complexity", {})
            if complexity:
                time_complexity = complexity.get("time_complexity", "unknown")
                analytics["complexity_distribution"][time_complexity] = \
                    analytics["complexity_distribution"].get(time_complexity, 0) + 1

        # Get AI-powered insights
        ai_analyzer = AIAnalyzer()
        ai_insights = await ai_analyzer.get_user_insights(analyses)
        analytics["strengths_weaknesses"] = ai_insights.get("strengths_weaknesses", {})
        analytics["recommendations"] = ai_insights.get("recommendations", {})

        return {
            "success": True,
            "analytics": analytics
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analytics failed: {str(e)}")

@router.get("/trending-topics")
async def get_trending_topics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get trending topics and popular algorithms
    """
    try:
        # Get recent analyses from all users
        recent_analyses = db.query(Analysis).filter(
            Analysis.created_at >= datetime.utcnow() - timedelta(days=30)
        ).all()

        # Analyze trending topics
        trending_data = analyze_trending_topics(recent_analyses)

        return {
            "success": True,
            "trending_topics": trending_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Trending topics failed: {str(e)}")

async def perform_advanced_analytics(user_id: int, analysis_result: Dict[str, Any]):
    """
    Background task for advanced analytics
    """
    try:
        # Perform additional analysis in background
        ai_analyzer = AIAnalyzer()
        
        # Generate learning recommendations
        recommendations = await ai_analyzer.generate_recommendations(
            user_id, 
            analysis_result
        )
        
        # Update user profile with new insights
        # This would typically update the user's learning profile
        
        print(f"Advanced analytics completed for user {user_id}")
        
    except Exception as e:
        print(f"Advanced analytics failed for user {user_id}: {str(e)}")

def calculate_performance_metrics(analyses: List[Analysis]) -> Dict[str, Any]:
    """
    Calculate performance metrics from analyses
    """
    if not analyses:
        return {}
    
    metrics = {
        "total_analyses": len(analyses),
        "languages_used": {},
        "average_complexity": {},
        "improvement_rate": 0,
        "strengths": [],
        "weaknesses": []
    }
    
    # Calculate language usage
    for analysis in analyses:
        result = json.loads(analysis.result)
        language = result.get("language", "unknown")
        metrics["languages_used"][language] = metrics["languages_used"].get(language, 0) + 1
    
    # Calculate complexity trends
    complexity_scores = []
    for analysis in analyses:
        result = json.loads(analysis.result)
        complexity = result.get("analysis", {}).get("complexity", {})
        if complexity:
            time_complexity = complexity.get("time_complexity", "O(1)")
            # Convert complexity to numeric score
            score = convert_complexity_to_score(time_complexity)
            complexity_scores.append(score)
    
    if complexity_scores:
        metrics["average_complexity"] = sum(complexity_scores) / len(complexity_scores)
    
    return metrics

def calculate_trends(analyses: List[Analysis]) -> Dict[str, Any]:
    """
    Calculate trends from analyses
    """
    trends = {
        "complexity_trend": [],
        "language_trend": [],
        "improvement_trend": []
    }
    
    # Group analyses by time periods
    weekly_groups = {}
    for analysis in analyses:
        week = analysis.created_at.strftime("%Y-%W")
        if week not in weekly_groups:
            weekly_groups[week] = []
        weekly_groups[week].append(analysis)
    
    # Calculate trends for each week
    for week, week_analyses in sorted(weekly_groups.items()):
        avg_complexity = calculate_weekly_average_complexity(week_analyses)
        trends["complexity_trend"].append({
            "week": week,
            "average_complexity": avg_complexity
        })
    
    return trends

def analyze_trending_topics(analyses: List[Analysis]) -> Dict[str, Any]:
    """
    Analyze trending topics from recent analyses
    """
    trending = {
        "popular_languages": {},
        "common_patterns": {},
        "difficulty_distribution": {},
        "hot_topics": []
    }
    
    # Count language usage
    for analysis in analyses:
        result = json.loads(analysis.result)
        language = result.get("language", "unknown")
        trending["popular_languages"][language] = \
            trending["popular_languages"].get(language, 0) + 1
    
    # Identify common patterns
    pattern_count = {}
    for analysis in analyses:
        result = json.loads(analysis.result)
        ast = result.get("analysis", {}).get("ast", {})
        if ast:
            patterns = extract_patterns_from_ast(ast)
            for pattern in patterns:
                pattern_count[pattern] = pattern_count.get(pattern, 0) + 1
    
    trending["common_patterns"] = dict(sorted(
        pattern_count.items(), 
        key=lambda x: x[1], 
        reverse=True
    )[:10])
    
    return trending

def convert_complexity_to_score(complexity: str) -> float:
    """
    Convert time complexity to numeric score
    """
    complexity_map = {
        "O(1)": 1.0,
        "O(log n)": 2.0,
        "O(n)": 3.0,
        "O(n log n)": 4.0,
        "O(n²)": 5.0,
        "O(n³)": 6.0,
        "O(2ⁿ)": 7.0,
        "O(n!)": 8.0
    }
    return complexity_map.get(complexity, 3.0)

def calculate_weekly_average_complexity(analyses: List[Analysis]) -> float:
    """
    Calculate average complexity for a week
    """
    scores = []
    for analysis in analyses:
        result = json.loads(analysis.result)
        complexity = result.get("analysis", {}).get("complexity", {})
        if complexity:
            time_complexity = complexity.get("time_complexity", "O(1)")
            score = convert_complexity_to_score(time_complexity)
            scores.append(score)
    
    return sum(scores) / len(scores) if scores else 0.0

def extract_patterns_from_ast(ast: Dict[str, Any]) -> List[str]:
    """
    Extract common patterns from AST
    """
    patterns = []
    
    def traverse_ast(node):
        if isinstance(node, dict):
            node_type = node.get("type", "")
            if node_type:
                patterns.append(node_type)
            
            for value in node.values():
                traverse_ast(value)
        elif isinstance(node, list):
            for item in node:
                traverse_ast(item)
    
    traverse_ast(ast)
    return patterns 
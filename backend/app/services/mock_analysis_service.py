"""
Mock analysis service for development
Provides basic analysis functionality without external dependencies
"""

import json
import random
from typing import Dict, Any, List, Optional
from datetime import datetime

class MockCodeAnalyzer:
    """Mock code analyzer that provides basic AST-like analysis"""
    
    async def analyze(self, code: str, language: str) -> Dict[str, Any]:
        """Analyze code and return mock AST data"""
        lines = code.split('\n')
        functions = []
        variables = []
        classes = []
        
        # Simple parsing for common patterns
        for i, line in enumerate(lines):
            line = line.strip()
            if line.startswith('def ') or line.startswith('function '):
                func_name = line.split('(')[0].split()[-1]
                functions.append({
                    "name": func_name,
                    "line": i + 1,
                    "type": "function"
                })
            elif line.startswith('class '):
                class_name = line.split(':')[0].split()[-1]
                classes.append({
                    "name": class_name,
                    "line": i + 1,
                    "type": "class"
                })
            elif '=' in line and not line.startswith('#'):
                var_name = line.split('=')[0].strip()
                if var_name and not var_name.startswith('#'):
                    variables.append({
                        "name": var_name,
                        "line": i + 1,
                        "type": "variable"
                    })
        
        return {
            "ast": {
                "functions": functions,
                "classes": classes,
                "variables": variables,
                "total_lines": len(lines),
                "language": language
            },
            "metrics": {
                "function_count": len(functions),
                "class_count": len(classes),
                "variable_count": len(variables),
                "complexity_score": random.uniform(1.0, 10.0)
            }
        }

class MockComplexityAnalyzer:
    """Mock complexity analyzer"""
    
    async def analyze(self, code: str, language: str) -> Dict[str, Any]:
        """Analyze code complexity"""
        lines = code.split('\n')
        functions = len([line for line in lines if line.strip().startswith(('def ', 'function '))])
        nested_levels = max([len(line) - len(line.lstrip()) for line in lines if line.strip()], default=0) // 2
        
        complexity_score = functions * 2 + nested_levels * 1.5 + random.uniform(0, 5)
        
        return {
            "time_complexity": random.choice(["O(1)", "O(n)", "O(n²)", "O(log n)", "O(n log n)"]),
            "space_complexity": random.choice(["O(1)", "O(n)", "O(n²)"]),
            "cyclomatic_complexity": max(1, int(complexity_score)),
            "cognitive_complexity": max(1, int(complexity_score * 0.8)),
            "nesting_depth": nested_levels,
            "function_count": functions
        }

class MockAIAnalyzer:
    """Mock AI analyzer for insights"""
    
    async def get_insights(self, code: str, language: str, user_context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Get AI-powered insights"""
        insights = [
            "Consider using more descriptive variable names",
            "This function could benefit from early returns",
            "Consider extracting this logic into a separate function",
            "The algorithm could be optimized for better performance",
            "Good use of data structures here",
            "Consider adding input validation",
            "This code follows good practices"
        ]
        
        return {
            "insights": random.sample(insights, min(3, len(insights))),
            "suggestions": [
                "Add error handling",
                "Consider edge cases",
                "Document complex logic"
            ],
            "best_practices": [
                "Code is well-structured",
                "Good separation of concerns",
                "Consider adding type hints"
            ],
            "potential_issues": [
                "Possible null pointer exception",
                "Consider memory usage",
                "Check for edge cases"
            ]
        }
    
    async def compare_code_files(self, results: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Compare multiple code files"""
        return {
            "similarity_score": random.uniform(0.3, 0.9),
            "common_patterns": ["function definitions", "variable declarations"],
            "differences": ["algorithm approach", "data structure usage"],
            "recommendations": ["Consider consistent naming", "Standardize error handling"]
        }
    
    async def get_batch_insights(self, results: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Get insights for batch analysis"""
        return {
            "overall_quality": random.choice(["Good", "Excellent", "Fair", "Needs Improvement"]),
            "consistency_score": random.uniform(0.6, 1.0),
            "recommendations": [
                "Maintain consistent coding style",
                "Consider code reuse opportunities",
                "Add comprehensive testing"
            ]
        }
    
    async def get_detailed_insights(self, code: str, language: str) -> Dict[str, Any]:
        """Get detailed AI insights"""
        return {
            "detailed_analysis": "This code shows good algorithmic thinking",
            "improvement_areas": ["Error handling", "Documentation", "Performance"],
            "strengths": ["Clean code", "Good logic", "Readable structure"],
            "score": random.randint(70, 95)
        }
    
    async def get_learning_recommendations(self, user_id: int, current_skills: List[str], 
                                         learning_goals: List[str], time_available: int) -> Dict[str, Any]:
        """Get personalized learning recommendations"""
        return {
            "recommended_topics": ["Dynamic Programming", "Graph Algorithms", "System Design"],
            "difficulty_level": "Intermediate",
            "estimated_time": f"{time_available * 2} hours",
            "resources": ["LeetCode", "HackerRank", "GeeksforGeeks"],
            "next_steps": ["Practice recursion", "Learn tree traversal", "Study sorting algorithms"]
        }
    
    async def predict_performance(self, user_id: int, skill_area: str) -> Dict[str, Any]:
        """Predict user performance in a skill area"""
        return {
            "predicted_score": random.randint(60, 95),
            "confidence": random.uniform(0.7, 0.95),
            "improvement_rate": f"{random.randint(5, 20)}% per week",
            "recommended_focus": ["Practice problems", "Review concepts", "Take mock tests"]
        }
    
    async def get_user_insights(self, user_id: int) -> Dict[str, Any]:
        """Get user-specific insights"""
        return {
            "strengths": ["Algorithms", "Data Structures", "Problem Solving"],
            "weaknesses": ["System Design", "Advanced DP", "Graph Theory"],
            "learning_pattern": "Consistent daily practice",
            "recommended_focus": "Advanced algorithms and system design"
        }
    
    async def generate_recommendations(self, user_id: int, context: str) -> Dict[str, Any]:
        """Generate personalized recommendations"""
        return {
            "daily_practice": ["2-3 medium problems", "1 hard problem", "Review concepts"],
            "weekly_goals": ["Complete 15 problems", "Learn 2 new algorithms", "Take 1 mock test"],
            "monthly_targets": ["Improve rating by 100 points", "Master 5 new topics", "Complete 1 project"]
        }

class MockOptimizationService:
    """Mock optimization service"""
    
    async def get_suggestions(self, code: str, language: str) -> Dict[str, Any]:
        """Get optimization suggestions"""
        suggestions = [
            "Use list comprehension instead of for loop",
            "Consider using a more efficient data structure",
            "Cache frequently accessed values",
            "Use early returns to reduce nesting",
            "Consider using built-in functions",
            "Optimize the algorithm approach"
        ]
        
        return {
            "suggestions": random.sample(suggestions, min(3, len(suggestions))),
            "performance_improvements": [
                "Reduce time complexity from O(n²) to O(n log n)",
                "Use more efficient data structure",
                "Implement caching strategy"
            ],
            "code_quality": [
                "Improve readability",
                "Add proper error handling",
                "Use consistent naming conventions"
            ],
            "estimated_improvement": f"{random.randint(10, 50)}% performance gain"
        }

class MockVisualizationService:
    """Mock visualization service"""
    
    async def generate_data(self, code: str, language: str) -> Dict[str, Any]:
        """Generate visualization data"""
        lines = code.split('\n')
        functions = len([line for line in lines if line.strip().startswith(('def ', 'function '))])
        
        return {
            "flow_chart": {
                "nodes": [
                    {"id": "start", "label": "Start", "type": "start"},
                    {"id": "process", "label": "Main Process", "type": "process"},
                    {"id": "end", "label": "End", "type": "end"}
                ],
                "edges": [
                    {"from": "start", "to": "process"},
                    {"from": "process", "to": "end"}
                ]
            },
            "complexity_chart": {
                "data": [
                    {"function": f"func_{i}", "complexity": random.randint(1, 10)}
                    for i in range(functions)
                ]
            },
            "structure_tree": {
                "root": {
                    "name": "main",
                    "children": [
                        {"name": f"function_{i}", "type": "function"}
                        for i in range(functions)
                    ]
                }
            }
        }

# Create instances for easy import
code_analyzer = MockCodeAnalyzer()
complexity_analyzer = MockComplexityAnalyzer()
ai_analyzer = MockAIAnalyzer()
optimization_service = MockOptimizationService()
visualization_service = MockVisualizationService() 
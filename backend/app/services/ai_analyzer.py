"""
AI-powered code analysis service for intelligent insights and suggestions
"""

import re
import ast
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass
from app.core.logging import get_logger

logger = get_logger(__name__)


@dataclass
class CodeInsight:
    """Code insight with AI analysis"""
    type: str  # performance, security, readability, best_practice
    severity: str  # low, medium, high, critical
    title: str
    description: str
    suggestion: str
    line_number: Optional[int] = None
    code_snippet: Optional[str] = None
    impact_score: float = 0.0  # 0-10 scale


@dataclass
class AlgorithmDetection:
    """Detected algorithm information"""
    name: str
    confidence: float  # 0-1
    complexity: str
    description: str
    variations: List[str]
    optimization_tips: List[str]


class AIAnalyzer:
    """AI-powered code analysis service"""
    
    def __init__(self):
        self.algorithm_patterns = {
            'binary_search': {
                'patterns': [
                    r'while\s+left\s*<=\s*right',
                    r'mid\s*=\s*\(left\s*\+\s*right\)\s*//\s*2',
                    r'if\s+arr\[mid\]\s*==\s*target',
                    r'elif\s+arr\[mid\]\s*<\s*target'
                ],
                'complexity': 'O(log n)',
                'description': 'Binary search algorithm for finding elements in sorted arrays',
                'variations': ['recursive', 'iterative', 'lower_bound', 'upper_bound'],
                'optimization_tips': [
                    'Use bit shifting for division by 2: mid = (left + right) >> 1',
                    'Avoid integer overflow: mid = left + (right - left) // 2',
                    'Consider using bisect module for Python'
                ]
            },
            'quick_sort': {
                'patterns': [
                    r'def\s+quick_sort',
                    r'pivot\s*=\s*arr\[',
                    r'partition\s*\(',
                    r'quick_sort\s*\(.*left.*\)',
                    r'quick_sort\s*\(.*right.*\)'
                ],
                'complexity': 'O(n log n) average, O(n²) worst case',
                'description': 'Quick sort algorithm using divide and conquer',
                'variations': ['lomuto', 'hoare', 'randomized', 'three_way'],
                'optimization_tips': [
                    'Use median-of-three for pivot selection',
                    'Switch to insertion sort for small subarrays',
                    'Use three-way partitioning for duplicate elements'
                ]
            },
            'dynamic_programming': {
                'patterns': [
                    r'dp\s*=\s*\[',
                    r'memo\s*=\s*\{',
                    r'@lru_cache',
                    r'if\s+.*in\s+memo',
                    r'dp\[i\]\s*=\s*max\(',
                    r'dp\[i\]\s*=\s*min\('
                ],
                'complexity': 'Varies by problem',
                'description': 'Dynamic programming with memoization',
                'variations': ['top_down', 'bottom_up', 'space_optimized'],
                'optimization_tips': [
                    'Use tabulation for better space efficiency',
                    'Consider rolling arrays for space optimization',
                    'Use bit manipulation for state compression'
                ]
            },
            'dijkstra': {
                'patterns': [
                    r'import\s+heapq',
                    r'heapq\.heappush',
                    r'heapq\.heappop',
                    r'distance\s*=\s*\[float\(',
                    r'while\s+pq'
                ],
                'complexity': 'O((V + E) log V)',
                'description': "Dijkstra's shortest path algorithm",
                'variations': ['priority_queue', 'fibonacci_heap', 'bidirectional'],
                'optimization_tips': [
                    'Use Fibonacci heaps for better performance',
                    'Consider bidirectional search',
                    'Use A* with admissible heuristic'
                ]
            }
        }
        
        self.code_smells = {
            'long_function': {
                'pattern': r'def\s+\w+\([^)]*\):[\s\S]{500,}',
                'description': 'Function is too long and complex',
                'suggestion': 'Break down into smaller, focused functions',
                'severity': 'medium'
            },
            'deep_nesting': {
                'pattern': r'(\s+){12,}(if|for|while|try)',
                'description': 'Code has too many nested levels',
                'suggestion': 'Extract nested logic into separate functions',
                'severity': 'medium'
            },
            'magic_numbers': {
                'pattern': r'\b\d{2,}\b(?!\s*[a-zA-Z_])',
                'description': 'Magic numbers without clear meaning',
                'suggestion': 'Define constants with descriptive names',
                'severity': 'low'
            },
            'duplicate_code': {
                'pattern': r'(.{20,})\1',
                'description': 'Code duplication detected',
                'suggestion': 'Extract common code into reusable functions',
                'severity': 'high'
            }
        }
        
        self.security_patterns = {
            'sql_injection': {
                'patterns': [
                    r'f".*SELECT.*{.*}',
                    r'f".*INSERT.*{.*}',
                    r'f".*UPDATE.*{.*}',
                    r'f".*DELETE.*{.*}'
                ],
                'description': 'Potential SQL injection vulnerability',
                'suggestion': 'Use parameterized queries or ORM',
                'severity': 'critical'
            },
            'command_injection': {
                'patterns': [
                    r'os\.system\(',
                    r'subprocess\.call\(',
                    r'eval\(',
                    r'exec\('
                ],
                'description': 'Potential command injection vulnerability',
                'suggestion': 'Avoid executing user input directly',
                'severity': 'critical'
            },
            'path_traversal': {
                'patterns': [
                    r'open\(.*\+.*\)',
                    r'file\(.*\+.*\)'
                ],
                'description': 'Potential path traversal vulnerability',
                'suggestion': 'Validate and sanitize file paths',
                'severity': 'high'
            }
        }
    
    async def analyze_code_intelligence(self, code: str, language: str) -> Dict[str, Any]:
        """
        Perform comprehensive AI-powered code analysis
        """
        try:
            logger.info("Starting AI code analysis", language=language)
            
            insights = []
            detected_algorithms = []
            
            # Detect algorithms
            for algo_name, algo_info in self.algorithm_patterns.items():
                confidence = self._calculate_algorithm_confidence(code, algo_info['patterns'])
                if confidence > 0.3:  # Threshold for detection
                    detected_algorithms.append(AlgorithmDetection(
                        name=algo_name,
                        confidence=confidence,
                        complexity=algo_info['complexity'],
                        description=algo_info['description'],
                        variations=algo_info['variations'],
                        optimization_tips=algo_info['optimization_tips']
                    ))
            
            # Detect code smells
            for smell_name, smell_info in self.code_smells.items():
                matches = re.finditer(smell_info['pattern'], code, re.MULTILINE)
                for match in matches:
                    insights.append(CodeInsight(
                        type='code_smell',
                        severity=smell_info['severity'],
                        title=f"{smell_name.replace('_', ' ').title()}",
                        description=smell_info['description'],
                        suggestion=smell_info['suggestion'],
                        line_number=self._get_line_number(code, match.start()),
                        code_snippet=match.group(),
                        impact_score=self._calculate_impact_score(smell_info['severity'])
                    ))
            
            # Detect security issues
            for sec_name, sec_info in self.security_patterns.items():
                for pattern in sec_info['patterns']:
                    matches = re.finditer(pattern, code, re.IGNORECASE)
                    for match in matches:
                        insights.append(CodeInsight(
                            type='security',
                            severity=sec_info['severity'],
                            title=f"{sec_name.replace('_', ' ').title()}",
                            description=sec_info['description'],
                            suggestion=sec_info['suggestion'],
                            line_number=self._get_line_number(code, match.start()),
                            code_snippet=match.group(),
                            impact_score=self._calculate_impact_score(sec_info['severity'])
                        ))
            
            # Analyze code quality
            quality_insights = self._analyze_code_quality(code, language)
            insights.extend(quality_insights)
            
            # Generate intelligent suggestions
            suggestions = self._generate_intelligent_suggestions(code, language, detected_algorithms)
            
            # Calculate overall code quality score
            quality_score = self._calculate_quality_score(insights, detected_algorithms)
            
            logger.info("AI code analysis completed", 
                       insights_count=len(insights), 
                       algorithms_detected=len(detected_algorithms))
            
            return {
                "insights": [self._insight_to_dict(insight) for insight in insights],
                "detected_algorithms": [self._algorithm_to_dict(algo) for algo in detected_algorithms],
                "suggestions": suggestions,
                "quality_score": quality_score,
                "summary": self._generate_analysis_summary(insights, detected_algorithms)
            }
            
        except Exception as e:
            logger.error("AI code analysis failed", error=str(e))
            return {
                "error": f"AI analysis failed: {str(e)}",
                "insights": [],
                "detected_algorithms": [],
                "suggestions": [],
                "quality_score": 0.0
            }
    
    def _calculate_algorithm_confidence(self, code: str, patterns: List[str]) -> float:
        """Calculate confidence score for algorithm detection"""
        matches = 0
        total_patterns = len(patterns)
        
        for pattern in patterns:
            if re.search(pattern, code, re.IGNORECASE):
                matches += 1
        
        return matches / total_patterns if total_patterns > 0 else 0.0
    
    def _analyze_code_quality(self, code: str, language: str) -> List[CodeInsight]:
        """Analyze code quality metrics"""
        insights = []
        
        # Analyze function complexity
        if language == 'python':
            try:
                tree = ast.parse(code)
                for node in ast.walk(tree):
                    if isinstance(node, ast.FunctionDef):
                        complexity = self._calculate_function_complexity(node)
                        if complexity > 10:
                            insights.append(CodeInsight(
                                type='complexity',
                                severity='high',
                                title='High Function Complexity',
                                description=f'Function {node.name} has complexity {complexity}',
                                suggestion='Consider breaking down into smaller functions',
                                line_number=node.lineno,
                                impact_score=8.0
                            ))
            except:
                pass
        
        # Analyze naming conventions
        naming_issues = self._check_naming_conventions(code, language)
        insights.extend(naming_issues)
        
        return insights
    
    def _calculate_function_complexity(self, node: ast.FunctionDef) -> int:
        """Calculate cyclomatic complexity of a function"""
        complexity = 1  # Base complexity
        
        for child in ast.walk(node):
            if isinstance(child, (ast.If, ast.While, ast.For, ast.AsyncFor)):
                complexity += 1
            elif isinstance(child, ast.ExceptHandler):
                complexity += 1
            elif isinstance(child, ast.BoolOp):
                complexity += len(child.values) - 1
        
        return complexity
    
    def _check_naming_conventions(self, code: str, language: str) -> List[CodeInsight]:
        """Check naming conventions"""
        insights = []
        
        # Check for single letter variables (except loop variables)
        single_letter_vars = re.findall(r'\b[a-zA-Z]\s*=', code)
        if len(single_letter_vars) > 3:
            insights.append(CodeInsight(
                type='naming',
                severity='low',
                title='Poor Variable Naming',
                description='Multiple single-letter variables detected',
                suggestion='Use descriptive variable names',
                impact_score=3.0
            ))
        
        return insights
    
    def _generate_intelligent_suggestions(self, code: str, language: str, algorithms: List[AlgorithmDetection]) -> List[str]:
        """Generate intelligent code improvement suggestions"""
        suggestions = []
        
        # Language-specific suggestions
        if language == 'python':
            if 'import *' in code:
                suggestions.append("Avoid 'import *' - import specific modules for better clarity")
            
            if 'global ' in code:
                suggestions.append("Consider avoiding global variables - use function parameters or class attributes")
            
            if 'except:' in code:
                suggestions.append("Use specific exception types instead of bare 'except:'")
        
        # Algorithm-specific suggestions
        for algo in algorithms:
            suggestions.extend(algo.optimization_tips)
        
        # Performance suggestions
        if 'for ' in code and ' in ' in code and 'range(' in code:
            suggestions.append("Consider using enumerate() for index and value iteration")
        
        if 'list(' in code and 'map(' in code:
            suggestions.append("Consider list comprehension for better readability")
        
        return suggestions[:10]  # Limit to top 10 suggestions
    
    def _calculate_quality_score(self, insights: List[CodeInsight], algorithms: List[AlgorithmDetection]) -> float:
        """Calculate overall code quality score (0-100)"""
        base_score = 100.0
        
        # Deduct points for issues
        for insight in insights:
            if insight.severity == 'critical':
                base_score -= 15
            elif insight.severity == 'high':
                base_score -= 10
            elif insight.severity == 'medium':
                base_score -= 5
            elif insight.severity == 'low':
                base_score -= 2
        
        # Bonus points for good algorithms
        for algo in algorithms:
            if algo.confidence > 0.7:
                base_score += 5
        
        return max(0.0, min(100.0, base_score))
    
    def _calculate_impact_score(self, severity: str) -> float:
        """Calculate impact score based on severity"""
        severity_scores = {
            'critical': 10.0,
            'high': 8.0,
            'medium': 5.0,
            'low': 2.0
        }
        return severity_scores.get(severity, 0.0)
    
    def _get_line_number(self, code: str, position: int) -> int:
        """Get line number from character position"""
        return code[:position].count('\n') + 1
    
    def _insight_to_dict(self, insight: CodeInsight) -> Dict[str, Any]:
        """Convert CodeInsight to dictionary"""
        return {
            "type": insight.type,
            "severity": insight.severity,
            "title": insight.title,
            "description": insight.description,
            "suggestion": insight.suggestion,
            "line_number": insight.line_number,
            "code_snippet": insight.code_snippet,
            "impact_score": insight.impact_score
        }
    
    def _algorithm_to_dict(self, algo: AlgorithmDetection) -> Dict[str, Any]:
        """Convert AlgorithmDetection to dictionary"""
        return {
            "name": algo.name,
            "confidence": algo.confidence,
            "complexity": algo.complexity,
            "description": algo.description,
            "variations": algo.variations,
            "optimization_tips": algo.optimization_tips
        }
    
    def _generate_analysis_summary(self, insights: List[CodeInsight], algorithms: List[AlgorithmDetection]) -> str:
        """Generate a human-readable analysis summary"""
        total_insights = len(insights)
        critical_issues = len([i for i in insights if i.severity == 'critical'])
        high_issues = len([i for i in insights if i.severity == 'high'])
        detected_algorithms = len(algorithms)
        
        summary = f"Analysis found {total_insights} insights with {critical_issues} critical and {high_issues} high priority issues. "
        
        if detected_algorithms > 0:
            summary += f"Detected {detected_algorithms} algorithm(s). "
        
        if critical_issues > 0:
            summary += "⚠️ Critical security or performance issues detected. "
        
        if high_issues > 0:
            summary += "🔧 Several improvements recommended. "
        
        if total_insights == 0 and detected_algorithms > 0:
            summary += "✅ Code quality looks good!"
        
        return summary 
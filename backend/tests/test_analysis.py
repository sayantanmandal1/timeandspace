"""
Tests for code analysis functionality
"""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import Mock, patch

from app.main import app
from app.services.code_analyzer import CodeAnalyzer
from app.services.complexity_analyzer import ComplexityAnalyzer
from app.services.ai_analyzer import AIAnalyzer

client = TestClient(app)


class TestCodeAnalysis:
    """Test code analysis functionality"""
    
    def test_analyze_python_code(self):
        """Test analyzing Python code"""
        code = """
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
"""
        
        response = client.post("/api/v1/analysis/analyze", json={
            "code": code,
            "language": "python",
            "input_data": [],
            "analysis_type": "full"
        })
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "analysis_id" in data
        assert data["ast_analysis"] is not None
        assert data["complexity_analysis"] is not None
    
    def test_analyze_with_input_requirement(self):
        """Test analysis when input is required"""
        code = """
def add_numbers(a, b):
    return a + b

result = add_numbers(a, b)
print(result)
"""
        
        response = client.post("/api/v1/analysis/analyze", json={
            "code": code,
            "language": "python",
            "input_data": [],
            "analysis_type": "full"
        })
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is False
        assert "Input required" in data["error"]
        assert data["ast_analysis"]["input_required"] is True
    
    def test_analyze_with_input_data(self):
        """Test analysis with provided input data"""
        code = """
def add_numbers(a, b):
    return a + b

result = add_numbers(a, b)
print(result)
"""
        
        response = client.post("/api/v1/analysis/analyze", json={
            "code": code,
            "language": "python",
            "input_data": [5, 3],
            "analysis_type": "full"
        })
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["execution_trace"] is not None
    
    def test_analyze_unsupported_language(self):
        """Test analysis with unsupported language"""
        response = client.post("/api/v1/analysis/analyze", json={
            "code": "print('Hello')",
            "language": "unsupported",
            "input_data": [],
            "analysis_type": "full"
        })
        
        assert response.status_code == 500
    
    def test_analyze_empty_code(self):
        """Test analysis with empty code"""
        response = client.post("/api/v1/analysis/analyze", json={
            "code": "",
            "language": "python",
            "input_data": [],
            "analysis_type": "full"
        })
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True


class TestComplexityAnalysis:
    """Test complexity analysis functionality"""
    
    def test_complexity_analyzer_initialization(self):
        """Test complexity analyzer initialization"""
        analyzer = ComplexityAnalyzer()
        assert analyzer is not None
        assert hasattr(analyzer, 'complexity_patterns')
    
    def test_analyze_simple_function(self):
        """Test analyzing simple function complexity"""
        analyzer = ComplexityAnalyzer()
        code = """
def simple_function(n):
    return n * 2
"""
        
        result = analyzer.analyze_complexity(code, "python")
        assert result is not None
        assert "time_complexity" in result
        assert "space_complexity" in result
    
    def test_analyze_recursive_function(self):
        """Test analyzing recursive function complexity"""
        analyzer = ComplexityAnalyzer()
        code = """
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
"""
        
        result = analyzer.analyze_complexity(code, "python")
        assert result is not None
        assert "time_complexity" in result
        # Should detect exponential complexity for recursive fibonacci


class TestAIAnalysis:
    """Test AI analysis functionality"""
    
    def test_ai_analyzer_initialization(self):
        """Test AI analyzer initialization"""
        analyzer = AIAnalyzer()
        assert analyzer is not None
        assert hasattr(analyzer, 'algorithm_patterns')
        assert hasattr(analyzer, 'code_smells')
        assert hasattr(analyzer, 'security_patterns')
    
    def test_detect_binary_search(self):
        """Test binary search algorithm detection"""
        analyzer = AIAnalyzer()
        code = """
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
"""
        
        result = analyzer.analyze_code_intelligence(code, "python")
        assert result is not None
        assert "detected_algorithms" in result
        
        # Should detect binary search
        algorithms = result["detected_algorithms"]
        binary_search_found = any(algo["name"] == "binary_search" for algo in algorithms)
        assert binary_search_found
    
    def test_detect_security_issues(self):
        """Test security issue detection"""
        analyzer = AIAnalyzer()
        code = """
import os
user_input = input("Enter command: ")
os.system(user_input)  # Security issue
"""
        
        result = analyzer.analyze_code_intelligence(code, "python")
        assert result is not None
        assert "insights" in result
        
        # Should detect command injection
        insights = result["insights"]
        security_issues = [insight for insight in insights if insight["type"] == "security"]
        assert len(security_issues) > 0
    
    def test_code_quality_analysis(self):
        """Test code quality analysis"""
        analyzer = AIAnalyzer()
        code = """
def very_long_function_with_many_parameters(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z):
    # This function is intentionally long to test code smell detection
    result = 0
    for i in range(100):
        for j in range(100):
            for k in range(100):
                for l in range(100):
                    result += i + j + k + l
    return result
"""
        
        result = analyzer.analyze_code_intelligence(code, "python")
        assert result is not None
        assert "insights" in result
        assert "quality_score" in result
        
        # Should detect code smells
        insights = result["insights"]
        code_smells = [insight for insight in insights if insight["type"] == "code_smell"]
        assert len(code_smells) > 0


class TestAnalysisEndpoints:
    """Test analysis API endpoints"""
    
    def test_get_ast_analysis(self):
        """Test getting AST analysis by ID"""
        analysis_id = "test-ast-id"
        response = client.get(f"/api/v1/analysis/ast/{analysis_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["analysis_id"] == analysis_id
        assert "ast" in data
    
    def test_get_complexity_analysis(self):
        """Test getting complexity analysis by ID"""
        analysis_id = "test-complexity-id"
        response = client.get(f"/api/v1/analysis/complexity/{analysis_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["analysis_id"] == analysis_id
        assert "time_complexity" in data
        assert "space_complexity" in data
    
    def test_get_visualization(self):
        """Test getting visualization by ID"""
        analysis_id = "test-viz-id"
        response = client.get(f"/api/v1/analysis/visualization/{analysis_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["analysis_id"] == analysis_id
        assert "visualizations" in data


if __name__ == "__main__":
    pytest.main([__file__]) 
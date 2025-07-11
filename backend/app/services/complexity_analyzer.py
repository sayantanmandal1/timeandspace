"""
Complexity Analyzer Service for DSA Code Analysis
Analyzes time and space complexity of algorithms and code structures.
"""

import ast
import re
from typing import Dict, List, Any, Optional, Tuple
import structlog

logger = structlog.get_logger(__name__)


class ComplexityAnalyzer:
    """Service for analyzing time and space complexity of algorithms."""
    
    def __init__(self):
        """Initialize the complexity analyzer."""
        self.complexity_patterns = {
            'O(1)': ['constant', 'single operation', 'direct access'],
            'O(log n)': ['binary search', 'divide and conquer', 'logarithmic'],
            'O(n)': ['linear', 'single loop', 'traversal'],
            'O(n log n)': ['merge sort', 'quick sort', 'heap sort', 'linearithmic'],
            'O(n²)': ['nested loops', 'bubble sort', 'selection sort', 'insertion sort'],
            'O(n³)': ['three nested loops', 'matrix multiplication'],
            'O(2ⁿ)': ['recursive fibonacci', 'exponential', 'subset generation'],
            'O(n!)': ['factorial', 'permutation', 'traveling salesman']
        }
        
        self.space_complexity_patterns = {
            'O(1)': ['constant space', 'in-place', 'no extra space'],
            'O(n)': ['linear space', 'array', 'list', 'stack', 'queue'],
            'O(n²)': ['quadratic space', 'matrix', '2d array'],
            'O(log n)': ['logarithmic space', 'recursive call stack'],
            'O(n log n)': ['linearithmic space', 'merge sort space'],
            'O(2ⁿ)': ['exponential space', 'recursive tree']
        }
    
    async def analyze_complexity(self, code: str, language: str):
        # Use the real analysis methods for time and space complexity
        time_result = self.analyze_time_complexity(code, language)
        space_result = self.analyze_space_complexity(code, language)
        return {
            "time_complexity": time_result.get("complexity"),
            "time_analysis": time_result.get("analysis"),
            "time_confidence": time_result.get("confidence"),
            "time_details": time_result.get("details"),
            "space_complexity": space_result.get("complexity"),
            "space_analysis": space_result.get("analysis"),
            "space_confidence": space_result.get("confidence"),
            "space_details": space_result.get("details"),
        }
    
    def analyze_time_complexity(self, code: str, language: str = "python") -> Dict[str, Any]:
        """
        Analyze the time complexity of the given code.
        
        Args:
            code: Source code to analyze
            language: Programming language of the code
            
        Returns:
            Dictionary containing time complexity analysis
        """
        try:
            if language.lower() == "python":
                return self._analyze_python_time_complexity(code)
            else:
                return self._analyze_generic_time_complexity(code)
        except Exception as e:
            logger.error(f"Error analyzing time complexity: {e}")
            return {"error": str(e), "complexity": "Unknown"}
    
    def analyze_space_complexity(self, code: str, language: str = "python") -> Dict[str, Any]:
        """
        Analyze the space complexity of the given code.
        
        Args:
            code: Source code to analyze
            language: Programming language of the code
            
        Returns:
            Dictionary containing space complexity analysis
        """
        try:
            if language.lower() == "python":
                return self._analyze_python_space_complexity(code)
            else:
                return self._analyze_generic_space_complexity(code)
        except Exception as e:
            logger.error(f"Error analyzing space complexity: {e}")
            return {"error": str(e), "complexity": "Unknown"}
    
    def _analyze_python_time_complexity(self, code: str) -> Dict[str, Any]:
        """Analyze time complexity for Python code using AST."""
        try:
            tree = ast.parse(code)
            analyzer = PythonTimeComplexityAnalyzer()
            analyzer.visit(tree)
            
            return {
                "complexity": analyzer.get_complexity(),
                "analysis": analyzer.get_analysis(),
                "confidence": analyzer.get_confidence(),
                "details": analyzer.get_details()
            }
        except Exception as e:
            logger.error(f"Error in Python time complexity analysis: {e}")
            return {"complexity": "Unknown", "error": str(e)}
    
    def _analyze_python_space_complexity(self, code: str) -> Dict[str, Any]:
        """Analyze space complexity for Python code using AST."""
        try:
            tree = ast.parse(code)
            analyzer = PythonSpaceComplexityAnalyzer()
            analyzer.visit(tree)
            
            return {
                "complexity": analyzer.get_complexity(),
                "analysis": analyzer.get_analysis(),
                "confidence": analyzer.get_confidence(),
                "details": analyzer.get_details()
            }
        except Exception as e:
            logger.error(f"Error in Python space complexity analysis: {e}")
            return {"complexity": "Unknown", "error": str(e)}
    
    def _analyze_generic_time_complexity(self, code: str) -> Dict[str, Any]:
        """Analyze time complexity for generic code using pattern matching."""
        try:
            complexity_scores = {}
            
            for complexity, patterns in self.complexity_patterns.items():
                score = 0
                for pattern in patterns:
                    if pattern.lower() in code.lower():
                        score += 1
                
                if score > 0:
                    complexity_scores[complexity] = score
            
            if complexity_scores:
                # Find the complexity with highest score
                best_complexity = max(complexity_scores, key=complexity_scores.get)
                confidence = min(complexity_scores[best_complexity] / 3, 1.0)
            else:
                best_complexity = "O(n)"
                confidence = 0.3
            
            return {
                "complexity": best_complexity,
                "confidence": confidence,
                "analysis": f"Pattern-based analysis suggests {best_complexity}",
                "details": complexity_scores
            }
        except Exception as e:
            logger.error(f"Error in generic time complexity analysis: {e}")
            return {"complexity": "Unknown", "error": str(e)}
    
    def _analyze_generic_space_complexity(self, code: str) -> Dict[str, Any]:
        """Analyze space complexity for generic code using pattern matching."""
        try:
            complexity_scores = {}
            
            for complexity, patterns in self.space_complexity_patterns.items():
                score = 0
                for pattern in patterns:
                    if pattern.lower() in code.lower():
                        score += 1
                
                if score > 0:
                    complexity_scores[complexity] = score
            
            if complexity_scores:
                # Find the complexity with highest score
                best_complexity = max(complexity_scores, key=complexity_scores.get)
                confidence = min(complexity_scores[best_complexity] / 3, 1.0)
            else:
                best_complexity = "O(n)"
                confidence = 0.3
            
            return {
                "complexity": best_complexity,
                "confidence": confidence,
                "analysis": f"Pattern-based analysis suggests {best_complexity}",
                "details": complexity_scores
            }
        except Exception as e:
            logger.error(f"Error in generic space complexity analysis: {e}")
            return {"complexity": "Unknown", "error": str(e)}
    
    def analyze_algorithm_complexity(self, algorithm_name: str) -> Dict[str, Any]:
        """
        Analyze complexity for known algorithms.
        
        Args:
            algorithm_name: Name of the algorithm
            
        Returns:
            Dictionary containing algorithm complexity information
        """
        algorithm_complexities = {
            "bubble_sort": {"time": "O(n²)", "space": "O(1)", "best": "O(n)", "average": "O(n²)", "worst": "O(n²)"},
            "selection_sort": {"time": "O(n²)", "space": "O(1)", "best": "O(n²)", "average": "O(n²)", "worst": "O(n²)"},
            "insertion_sort": {"time": "O(n²)", "space": "O(1)", "best": "O(n)", "average": "O(n²)", "worst": "O(n²)"},
            "merge_sort": {"time": "O(n log n)", "space": "O(n)", "best": "O(n log n)", "average": "O(n log n)", "worst": "O(n log n)"},
            "quick_sort": {"time": "O(n log n)", "space": "O(log n)", "best": "O(n log n)", "average": "O(n log n)", "worst": "O(n²)"},
            "heap_sort": {"time": "O(n log n)", "space": "O(1)", "best": "O(n log n)", "average": "O(n log n)", "worst": "O(n log n)"},
            "binary_search": {"time": "O(log n)", "space": "O(1)", "best": "O(1)", "average": "O(log n)", "worst": "O(log n)"},
            "linear_search": {"time": "O(n)", "space": "O(1)", "best": "O(1)", "average": "O(n)", "worst": "O(n)"},
            "depth_first_search": {"time": "O(V + E)", "space": "O(V)", "best": "O(V)", "average": "O(V + E)", "worst": "O(V + E)"},
            "breadth_first_search": {"time": "O(V + E)", "space": "O(V)", "best": "O(V)", "average": "O(V + E)", "worst": "O(V + E)"},
            "dijkstra": {"time": "O((V + E) log V)", "space": "O(V)", "best": "O(V log V)", "average": "O((V + E) log V)", "worst": "O((V + E) log V)"},
            "bellman_ford": {"time": "O(VE)", "space": "O(V)", "best": "O(E)", "average": "O(VE)", "worst": "O(VE)"},
            "floyd_warshall": {"time": "O(V³)", "space": "O(V²)", "best": "O(V³)", "average": "O(V³)", "worst": "O(V³)"},
            "kruskal": {"time": "O(E log E)", "space": "O(E)", "best": "O(E log E)", "average": "O(E log E)", "worst": "O(E log E)"},
            "prim": {"time": "O(E log V)", "space": "O(V)", "best": "O(E log V)", "average": "O(E log V)", "worst": "O(E log V)"},
            "fibonacci": {"time": "O(2ⁿ)", "space": "O(n)", "best": "O(1)", "average": "O(2ⁿ)", "worst": "O(2ⁿ)"},
            "factorial": {"time": "O(n)", "space": "O(n)", "best": "O(1)", "average": "O(n)", "worst": "O(n)"}
        }
        
        # Normalize algorithm name
        normalized_name = algorithm_name.lower().replace(" ", "_").replace("-", "_")
        
        if normalized_name in algorithm_complexities:
            return {
                "algorithm": algorithm_name,
                "complexities": algorithm_complexities[normalized_name],
                "found": True
            }
        else:
            # Try partial matching
            for key, value in algorithm_complexities.items():
                if key in normalized_name or normalized_name in key:
                    return {
                        "algorithm": algorithm_name,
                        "complexities": value,
                        "found": True,
                        "note": "Partial match found"
                    }
            
            return {
                "algorithm": algorithm_name,
                "found": False,
                "message": "Algorithm not found in database"
            }
    
    def compare_complexities(self, complexities: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Compare multiple algorithm complexities.
        
        Args:
            complexities: List of complexity dictionaries
            
        Returns:
            Dictionary containing comparison results
        """
        try:
            if not complexities:
                return {"error": "No complexities to compare"}
            
            comparison = {
                "best_time": None,
                "best_space": None,
                "worst_time": None,
                "worst_space": None,
                "rankings": [],
                "analysis": {}
            }
            
            # Parse complexities and rank them
            parsed_complexities = []
            for comp in complexities:
                parsed = self._parse_complexity_string(comp.get("time_complexity", "O(n)"))
                parsed_complexities.append({
                    "name": comp.get("name", "Unknown"),
                    "time": parsed,
                    "space": comp.get("space_complexity", "O(n)"),
                    "original": comp
                })
            
            # Sort by time complexity
            sorted_by_time = sorted(parsed_complexities, key=lambda x: x["time"])
            
            comparison["rankings"] = [
                {
                    "name": comp["name"],
                    "time_complexity": comp["original"].get("time_complexity"),
                    "space_complexity": comp["space"],
                    "rank": i + 1
                }
                for i, comp in enumerate(sorted_by_time)
            ]
            
            comparison["best_time"] = sorted_by_time[0]["name"]
            comparison["worst_time"] = sorted_by_time[-1]["name"]
            
            return comparison
            
        except Exception as e:
            logger.error(f"Error comparing complexities: {e}")
            return {"error": str(e)}
    
    def _parse_complexity_string(self, complexity: str) -> float:
        """Parse complexity string to numeric value for comparison."""
        complexity = complexity.lower().replace(" ", "")
        
        if "o(1)" in complexity:
            return 1
        elif "o(log n)" in complexity:
            return 2
        elif "o(n)" in complexity:
            return 3
        elif "o(n log n)" in complexity:
            return 4
        elif "o(n²)" in complexity or "o(n^2)" in complexity:
            return 5
        elif "o(n³)" in complexity or "o(n^3)" in complexity:
            return 6
        elif "o(2ⁿ)" in complexity or "o(2^n)" in complexity:
            return 7
        elif "o(n!)" in complexity:
            return 8
        else:
            return 3  # Default to O(n)


class PythonTimeComplexityAnalyzer(ast.NodeVisitor):
    """AST visitor for analyzing Python time complexity."""
    
    def __init__(self):
        self.loop_depth = 0
        self.max_loop_depth = 0
        self.has_recursion = False
        self.has_nested_loops = False
        self.loop_types = []
        self.operations = []
    
    def visit_For(self, node):
        self.loop_depth += 1
        self.max_loop_depth = max(self.max_loop_depth, self.loop_depth)
        self.loop_types.append("for")
        self.generic_visit(node)
        self.loop_depth -= 1
    
    def visit_While(self, node):
        self.loop_depth += 1
        self.max_loop_depth = max(self.max_loop_depth, self.loop_depth)
        self.loop_types.append("while")
        self.generic_visit(node)
        self.loop_depth -= 1
    
    def visit_Call(self, node):
        if isinstance(node.func, ast.Name):
            if node.func.id == self._get_function_name():
                self.has_recursion = True
        self.generic_visit(node)
    
    def visit_BinOp(self, node):
        self.operations.append("arithmetic")
        self.generic_visit(node)
    
    def visit_Compare(self, node):
        self.operations.append("comparison")
        self.generic_visit(node)
    
    def get_complexity(self) -> str:
        """Get the determined time complexity."""
        if self.has_recursion:
            return "O(2ⁿ)"  # Exponential for recursion
        elif self.max_loop_depth >= 3:
            return "O(n³)"
        elif self.max_loop_depth == 2:
            return "O(n²)"
        elif self.max_loop_depth == 1:
            return "O(n)"
        else:
            return "O(1)"
    
    def get_analysis(self) -> str:
        """Get analysis description."""
        if self.has_recursion:
            return "Recursive algorithm detected - exponential complexity likely"
        elif self.max_loop_depth >= 3:
            return f"Deeply nested loops ({self.max_loop_depth} levels) - cubic complexity"
        elif self.max_loop_depth == 2:
            return "Nested loops detected - quadratic complexity"
        elif self.max_loop_depth == 1:
            return "Single loop detected - linear complexity"
        else:
            return "No loops detected - constant complexity"
    
    def get_confidence(self) -> float:
        """Get confidence level of the analysis."""
        if self.has_recursion:
            return 0.8
        elif self.max_loop_depth >= 2:
            return 0.9
        elif self.max_loop_depth == 1:
            return 0.8
        else:
            return 0.7
    
    def get_details(self) -> Dict[str, Any]:
        """Get detailed analysis information."""
        return {
            "max_loop_depth": self.max_loop_depth,
            "has_recursion": self.has_recursion,
            "loop_types": self.loop_types,
            "operation_count": len(self.operations)
        }
    
    def _get_function_name(self) -> str:
        """Get the current function name (simplified)."""
        return "current_function"


class PythonSpaceComplexityAnalyzer(ast.NodeVisitor):
    """AST visitor for analyzing Python space complexity."""
    
    def __init__(self):
        self.data_structures = []
        self.recursion_depth = 0
        self.max_recursion_depth = 0
        self.has_dynamic_allocation = False
    
    def visit_List(self, node):
        self.data_structures.append("list")
        self.generic_visit(node)
    
    def visit_Dict(self, node):
        self.data_structures.append("dict")
        self.generic_visit(node)
    
    def visit_Set(self, node):
        self.data_structures.append("set")
        self.generic_visit(node)
    
    def visit_Call(self, node):
        if isinstance(node.func, ast.Name):
            if node.func.id in ["list", "dict", "set", "[]", "{}"]:
                self.has_dynamic_allocation = True
            elif node.func.id == self._get_function_name():
                self.recursion_depth += 1
                self.max_recursion_depth = max(self.max_recursion_depth, self.recursion_depth)
        self.generic_visit(node)
    
    def get_complexity(self) -> str:
        """Get the determined space complexity."""
        if self.max_recursion_depth > 0:
            return "O(n)"  # Recursion stack
        elif self.has_dynamic_allocation:
            return "O(n)"
        elif self.data_structures:
            return "O(n)"
        else:
            return "O(1)"
    
    def get_analysis(self) -> str:
        """Get analysis description."""
        if self.max_recursion_depth > 0:
            return f"Recursive algorithm with depth {self.max_recursion_depth} - linear space complexity"
        elif self.has_dynamic_allocation:
            return "Dynamic data structure allocation detected - linear space complexity"
        elif self.data_structures:
            return f"Data structures used: {', '.join(set(self.data_structures))} - linear space complexity"
        else:
            return "No significant data structures - constant space complexity"
    
    def get_confidence(self) -> float:
        """Get confidence level of the analysis."""
        if self.max_recursion_depth > 0:
            return 0.9
        elif self.has_dynamic_allocation:
            return 0.8
        elif self.data_structures:
            return 0.7
        else:
            return 0.6
    
    def get_details(self) -> Dict[str, Any]:
        """Get detailed analysis information."""
        return {
            "max_recursion_depth": self.max_recursion_depth,
            "data_structures": list(set(self.data_structures)),
            "has_dynamic_allocation": self.has_dynamic_allocation
        }
    
    def _get_function_name(self) -> str:
        """Get the current function name (simplified)."""
        return "current_function" 
"""
Code analyzer service for AST parsing and code analysis
"""

import ast
import re
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass, field

from app.core.logging import get_logger
from app.core.config import settings
from .execution_tracer import trace_code
from .tree_sitter_parser import parse_code_with_tree_sitter
# Add import for runx execution service
from .runx_executor import execute_code_with_runx


def _make_json_serializable(obj):
    """
    Recursively convert objects to JSON-serializable types.
    Handles Python types, functions, and other non-serializable objects.
    """
    if obj is None:
        return None
    elif isinstance(obj, (str, int, float, bool)):
        return obj
    elif isinstance(obj, (list, tuple)):
        return [_make_json_serializable(item) for item in obj]
    elif isinstance(obj, dict):
        return {str(k): _make_json_serializable(v) for k, v in obj.items()}
    elif isinstance(obj, type):
        return f"<type '{obj.__name__}'>"
    elif callable(obj):
        return f"<function '{getattr(obj, '__name__', 'anonymous')}'>"
    elif hasattr(obj, '__dict__'):
        # For objects with __dict__, try to serialize their attributes
        try:
            return {str(k): _make_json_serializable(v) for k, v in obj.__dict__.items()}
        except:
            return f"<object '{type(obj).__name__}'>"
    else:
        return str(obj)

logger = get_logger(__name__)


@dataclass
class ASTNode:
    """AST node representation"""
    node_type: str
    line_number: int
    column: int
    value: Optional[str] = None
    children: List['ASTNode'] = field(default_factory=list)
    

@dataclass
class ComplexityInfo:
    """Complexity information"""
    time_complexity: str
    space_complexity: str
    worst_case: str
    best_case: str
    average_case: str
    explanation: str


class CodeAnalyzer:
    """Main code analyzer service"""
    
    def __init__(self):
        self.supported_languages = settings.SUPPORTED_LANGUAGES
        self.ast_parsers = {
            'python': self._parse_python_ast,
            'javascript': self._parse_javascript_ast,
            'java': self._parse_java_ast,
            'cpp': self._parse_cpp_ast,
        }
    
    def detect_input_schema(self, code: str, language: str) -> dict:
        """
        Analyze code to detect input requirements and return an input schema.
        For Python, extract function arguments from the first function definition.
        For Java, detect Scanner usage and method parameters.
        For other languages, return None for now.
        """
        if language.lower() == 'python':
            try:
                tree = ast.parse(code)
                for node in ast.walk(tree):
                    if isinstance(node, ast.FunctionDef):
                        args = node.args
                        schema = []
                        for arg in args.args:
                            schema.append({
                                'name': arg.arg,
                                'type': 'unknown',  # Could use type comments/annotations if present
                                'example': ''
                            })
                        return {'input_required': bool(schema), 'input_schema': schema}
                return {'input_required': False, 'input_schema': []}
            except Exception:
                return {'input_required': False, 'input_schema': []}
        elif language.lower() == 'java':
            try:
                # Detect Scanner usage for input
                has_scanner = 'Scanner' in code and 'System.in' in code
                # Detect method parameters
                import re
                method_pattern = r'(?:public\s+)?(?:static\s+)?(?:final\s+)?\w+\s+(\w+)\s*\(([^)]*)\)'
                matches = re.findall(method_pattern, code)
                
                schema = []
                if matches:
                    # Get parameters from the first method found
                    params_str = matches[0][1]
                    if params_str.strip():
                        params = [p.strip().split()[-1] for p in params_str.split(',') if p.strip()]
                        for param in params:
                            schema.append({
                                'name': param,
                                'type': 'unknown',
                                'example': ''
                            })
                
                # If Scanner is used, add input prompt
                if has_scanner:
                    schema.append({
                        'name': 'user_input',
                        'type': 'string',
                        'example': 'Enter your input here'
                    })
                
                return {'input_required': bool(schema), 'input_schema': schema}
            except Exception:
                return {'input_required': False, 'input_schema': []}
        # For other languages, could add heuristics or AST parsing
        return {'input_required': False, 'input_schema': []}

    async def analyze_ast(self, code: str, language: str) -> Any:
        """
        Analyze code and generate AST
        """
        try:
            logger.info("Starting AST analysis", language=language)
            
            if language.lower() == 'python':
                ast_tree = self._parse_python_ast(code)
            else:
                ts_tree = parse_code_with_tree_sitter(code, language)
                if ts_tree is None or 'error' in ts_tree:
                    ast_tree = self._create_placeholder_ast(code, language)
                else:
                    ast_tree = self._convert_tree_sitter_dict_to_astnode(ts_tree)
            
            # Analyze AST structure
            analysis = {
                "ast": self._ast_node_to_dict(ast_tree),
                "statistics": self._analyze_ast_statistics(ast_tree),
                "complexity_indicators": self._find_complexity_indicators(ast_tree),
                "data_structures": self._identify_data_structures(ast_tree),
                "algorithms": self._identify_algorithms(ast_tree),
                "functions": self._extract_functions(ast_tree),
                "variables": self._extract_variables(ast_tree),
            }
            # Detect input requirements
            input_schema = self.detect_input_schema(code, language)
            analysis["input_required"] = input_schema["input_required"]
            analysis["input_schema"] = input_schema["input_schema"]
            
            # Apply defensive serialization to ensure all data is JSON-serializable
            analysis = _make_json_serializable(analysis)
            
            logger.info("AST analysis completed", language=language)
            return analysis  # type: ignore
        except Exception as e:
            logger.error("AST analysis failed", error=str(e), language=language)
            raise
    
    async def execute_with_trace(self, code: str, language: str, input_data: List[Any]) -> List[Any]:
        """
        Execute code with tracing for visualization
        """
        try:
            logger.info("Starting code execution with tracing", language=language)
            if language.lower() == 'python':
                result = trace_code(code, input_data)
                if isinstance(result, dict) and 'trace' in result:
                    # Apply defensive serialization to trace data
                    trace_data = _make_json_serializable(result['trace'])
                    return trace_data  # type: ignore
                else:
                    return [_make_json_serializable(result)]  # wrap error or unexpected result in a list
            elif language.lower() == 'java':
                from app.services.java_executor import execute_java_with_trace
                result = execute_java_with_trace(code, input_data)
                if isinstance(result, dict) and 'trace' in result and result['trace']:
                    # Apply defensive serialization to trace data
                    trace_data = _make_json_serializable(result['trace'])
                    return trace_data  # type: ignore
                else:
                    # Return empty trace if no trace data available
                    return []
            else:
                result = execute_code_with_runx(code, language, input_data)
                if isinstance(result, dict) and 'trace' in result:
                    # Apply defensive serialization to trace data
                    trace_data = _make_json_serializable(result['trace'])
                    return trace_data  # type: ignore
                else:
                    return [_make_json_serializable(result)]
        except Exception as e:
            logger.error("Code execution tracing failed", error=str(e))
            raise
    
    async def generate_optimization_suggestions(self, code: str, language: str, complexity_analysis: Optional[Dict[str, Any]] = None) -> List[str]:
        """
        Generate optimization suggestions based on code analysis
        """
        suggestions = []
        
        # Basic optimization suggestions
        if "for" in code.lower() and "range" in code.lower():
            suggestions.append("Consider using list comprehension for better performance")
        
        if "recursive" in code.lower() or "fibonacci" in code.lower():
            suggestions.append("Consider using memoization or iterative approach for recursive functions")
        
        if "sort" in code.lower():
            suggestions.append("Consider using built-in sorting algorithms for better performance")
        
        if "nested" in code.lower() and "loop" in code.lower():
            suggestions.append("Consider optimizing nested loops or using more efficient algorithms")
        
        # Add complexity-based suggestions
        if complexity_analysis:
            time_complexity = complexity_analysis.get("time_complexity", "")
            if "O(n²)" in time_complexity or "O(n^2)" in time_complexity:
                suggestions.append("Consider using more efficient algorithms to reduce time complexity from O(n²)")
        
        return suggestions
    
    def _parse_python_ast(self, code: str) -> ASTNode:
        """Parse Python code to AST"""
        try:
            tree = ast.parse(code)
            return self._convert_ast_node(tree)
        except SyntaxError as e:
            logger.error("Python AST parsing failed", error=str(e))
            raise
    
    def _parse_javascript_ast(self, code: str) -> ASTNode:
        """Parse JavaScript code to AST (placeholder)"""
        # In a real implementation, use a JavaScript AST parser
        return self._create_placeholder_ast(code, "javascript")
    
    def _parse_java_ast(self, code: str) -> ASTNode:
        """Parse Java code to AST (placeholder)"""
        # In a real implementation, use a Java AST parser
        return self._create_placeholder_ast(code, "java")
    
    def _parse_cpp_ast(self, code: str) -> ASTNode:
        """Parse C++ code to AST (placeholder)"""
        # In a real implementation, use a C++ AST parser
        return self._create_placeholder_ast(code, "cpp")
    
    def _convert_ast_node(self, node) -> ASTNode:
        """Convert AST node to our format"""
        ast_node = ASTNode(
            node_type=type(node).__name__,
            line_number=getattr(node, 'lineno', 0),
            column=getattr(node, 'col_offset', 0)
        )
        
        # Add children
        for child in ast.iter_child_nodes(node):
            ast_node.children.append(self._convert_ast_node(child))
        
        return ast_node
    
    def _create_placeholder_ast(self, code: str, language: str) -> ASTNode:
        """Create placeholder AST for unsupported languages"""
        return ASTNode(
            node_type="Program",
            line_number=1,
            column=0,
            value=f"Placeholder AST for {language}",
            children=[]
        )
    
    def _analyze_ast_statistics(self, ast_tree: ASTNode) -> Dict[str, Any]:
        """Analyze AST statistics"""
        stats = {
            "total_nodes": 0,
            "function_definitions": 0,
            "variable_assignments": 0,
            "loops": 0,
            "conditionals": 0,
            "max_depth": 0
        }
        
        def count_nodes(node: ASTNode, depth: int = 0):
            stats["total_nodes"] += 1
            stats["max_depth"] = max(stats["max_depth"], depth)
            
            if "Function" in node.node_type:
                stats["function_definitions"] += 1
            elif "Assign" in node.node_type:
                stats["variable_assignments"] += 1
            elif "For" in node.node_type or "While" in node.node_type:
                stats["loops"] += 1
            elif "If" in node.node_type:
                stats["conditionals"] += 1
            
            for child in node.children:
                count_nodes(child, depth + 1)
        
        count_nodes(ast_tree)
        return stats
    
    def _find_complexity_indicators(self, ast_tree: ASTNode) -> List[Dict[str, Any]]:
        """Find indicators of code complexity"""
        indicators = []
        
        def analyze_complexity(node: ASTNode):
            if "For" in node.node_type or "While" in node.node_type:
                indicators.append({
                    "type": "loop",
                    "line": node.line_number,
                    "complexity": "O(n)"
                })
            elif "If" in node.node_type:
                indicators.append({
                    "type": "conditional",
                    "line": node.line_number,
                    "complexity": "O(1)"
                })
            
            for child in node.children:
                analyze_complexity(child)
        
        analyze_complexity(ast_tree)
        return indicators
    
    def _identify_data_structures(self, ast_tree: ASTNode) -> List[Dict[str, Any]]:
        """Identify data structures used in code"""
        data_structures = []
        
        def find_data_structures(node: ASTNode):
            node_type = node.node_type.lower()
            if any(ds in node_type for ds in ["list", "dict", "set", "tuple", "array"]):
                data_structures.append({
                    "type": str(node.node_type),
                    "line": node.line_number,
                    "usage": "data_storage"
                })
            
            for child in node.children:
                find_data_structures(child)
        
        find_data_structures(ast_tree)
        return data_structures
    
    def _identify_algorithms(self, ast_tree: ASTNode) -> List[Dict[str, Any]]:
        """Identify algorithms used in code"""
        algorithms = []
        
        def find_algorithms(node: ASTNode):
            # Simple pattern matching for common algorithms
            if "Sort" in node.node_type:
                algorithms.append({
                    "type": "sorting",
                    "line": node.line_number,
                    "algorithm": "sort"
                })
            elif "Search" in node.node_type:
                algorithms.append({
                    "type": "searching",
                    "line": node.line_number,
                    "algorithm": "search"
                })
            
            for child in node.children:
                find_algorithms(child)
        
        find_algorithms(ast_tree)
        return algorithms
    
    def _extract_functions(self, ast_tree: ASTNode) -> List[Dict[str, Any]]:
        """Extract function definitions"""
        functions = []
        
        def find_functions(node: ASTNode):
            if "Function" in node.node_type:
                functions.append({
                    "name": getattr(node, 'name', 'anonymous'),
                    "line": node.line_number,
                    "type": str(node.node_type)
                })
            
            for child in node.children:
                find_functions(child)
        
        find_functions(ast_tree)
        return functions
    
    def _extract_variables(self, ast_tree: ASTNode) -> List[Dict[str, Any]]:
        """Extract variable declarations"""
        variables = []
        
        def find_variables(node: ASTNode):
            if "Assign" in node.node_type:
                variables.append({
                    "line": node.line_number,
                    "type": "assignment"
                })
            
            for child in node.children:
                find_variables(child)
        
        find_variables(ast_tree)
        return variables
    
    def _ast_node_to_dict(self, node: ASTNode) -> Dict[str, Any]:
        """Convert AST node to dictionary for JSON serialization"""
        # Defensive: ensure no ASTNode objects leak into the output
        return {
            "node_type": str(node.node_type),
            "line_number": node.line_number,
            "column": node.column,
            "value": str(node.value) if node.value is not None else None,
            "children": [self._ast_node_to_dict(child) if isinstance(child, ASTNode) else str(child) for child in node.children]
        } 

    def _convert_tree_sitter_dict_to_astnode(self, node_dict) -> ASTNode:
        """
        Convert a tree-sitter node dict to ASTNode format recursively.
        """
        return ASTNode(
            node_type=node_dict.get('type', 'Node'),
            line_number=node_dict.get('start_point', (0, 0))[0] + 1,
            column=node_dict.get('start_point', (0, 0))[1],
            value=node_dict.get('text', None),
            children=[self._convert_tree_sitter_dict_to_astnode(child) for child in node_dict.get('children', [])]
        ) 
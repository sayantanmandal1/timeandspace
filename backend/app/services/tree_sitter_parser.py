"""
Multi-language AST parsing using tree-sitter
"""

from tree_sitter import Language, Parser
from tree_sitter_languages import get_language
from typing import Any, Dict, Optional

# Supported languages mapping (add more as needed)
LANGUAGE_MAP = {
    'python': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'javascript': 'javascript',
    'typescript': 'typescript',
    'go': 'go',
    'rust': 'rust',
    # Add more as needed
}

def parse_code_with_tree_sitter(code: str, language: str) -> Optional[Dict[str, Any]]:
    """
    Parse code using tree-sitter and return a tree in a generic dict format.
    """
    lang_key = LANGUAGE_MAP.get(language.lower())
    if not lang_key:
        return None
    try:
        lang = get_language(lang_key)
        parser = Parser()
        parser.set_language(lang)
        tree = parser.parse(bytes(code, "utf8"))
        root_node = tree.root_node
        return _tree_sitter_node_to_dict(root_node, code)
    except Exception as e:
        return {"error": str(e)}

def _tree_sitter_node_to_dict(node, code: str) -> Dict[str, Any]:
    """
    Recursively convert a tree-sitter node to a dict.
    """
    node_dict = {
        "type": str(node.type),
        "start_point": node.start_point,
        "end_point": node.end_point,
        "text": code[node.start_byte:node.end_byte],
        "children": [_tree_sitter_node_to_dict(child, code) for child in node.children]
    }
    return node_dict 
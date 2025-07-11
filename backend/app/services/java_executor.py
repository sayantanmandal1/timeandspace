"""
Java code execution and tracing service
"""

import subprocess
import tempfile
import os
import json
import re
from typing import List, Dict, Any, Optional, Union
from app.core.logging import get_logger

logger = get_logger(__name__)

class JavaExecutor:
    def __init__(self):
        self.temp_dir = tempfile.mkdtemp()
        self.code = ""
    
    def _create_java_file(self, code: str, class_name: str = "Main") -> str:
        """Create a temporary Java file with the given code"""
        self.code = code  # Store code for tracing
        # Ensure the code has a proper class structure
        if not code.strip().startswith("public class"):
            # Wrap in a Main class if not already wrapped
            code = f"""public class {class_name} {{
    public static void main(String[] args) {{
        {code}
    }}
}}"""
        
        file_path = os.path.join(self.temp_dir, f"{class_name}.java")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(code)
        return file_path
    
    def _compile_java(self, file_path: str) -> bool:
        """Compile the Java file"""
        try:
            result = subprocess.run(
                ['javac', file_path],
                capture_output=True,
                text=True,
                timeout=30
            )
            return result.returncode == 0
        except subprocess.TimeoutExpired:
            logger.error("Java compilation timed out")
            return False
        except Exception as e:
            logger.error(f"Java compilation failed: {e}")
            return False
    
    def _run_java_with_trace(self, class_path: str, class_name: str, input_data: List[Any]) -> Dict[str, Any]:
        """Run Java code with basic tracing (simulated step-by-step)"""
        try:
            # Create input string from input_data
            input_str = "\n".join(str(item) for item in input_data) if input_data else ""
            
            # Run the Java program
            result = subprocess.run(
                ['java', '-cp', class_path, class_name],
                input=input_str,
                capture_output=True,
                text=True,
                timeout=30
            )
            
            # Parse the output and create a simulated trace
            trace = self._create_simulated_trace(result.stdout, result.stderr, input_data)
            
            return {
                'success': result.returncode == 0,
                'output': result.stdout,
                'error': result.stderr if result.returncode != 0 else None,
                'trace': trace
            }
            
        except subprocess.TimeoutExpired:
            return {
                'success': False,
                'error': 'Execution timed out',
                'trace': []
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'trace': []
            }
    
    def _create_simulated_trace(self, output: str, error: str, input_data: List[Any]) -> List[Dict[str, Any]]:
        """Create a simulated execution trace for Java code"""
        trace = []
        
        # Add initial state
        trace.append({
            'line': 1,
            'code_line': '// Program start',
            'locals': {'args': input_data},
            'data_structures': {},
            'call_stack': [{'function': 'main', 'line': 1, 'filename': 'Main.java'}],
            'output': '',
            'error': None
        })
        
        # Parse the Java code to create more detailed traces
        lines = self.code.split('\n')
        current_line = 1
        variables = {'args': input_data}
        data_structures = {}
        
        for i, line in enumerate(lines):
            line = line.strip()
            if not line or line.startswith('//') or line.startswith('/*'):
                continue
                
            current_line = i + 1
            
            # Detect variable declarations and assignments
            if '=' in line and not line.startswith('if') and not line.startswith('for') and not line.startswith('while'):
                # Simple variable assignment detection
                parts = line.split('=')
                if len(parts) == 2:
                    var_name = parts[0].strip().split()[-1]  # Get last part as variable name
                    var_value = parts[1].strip().rstrip(';')
                    
                    # Try to evaluate the value
                    try:
                        if var_value.startswith('"') and var_value.endswith('"'):
                            # String literal
                            var_value = var_value[1:-1]
                        elif var_value.isdigit():
                            # Integer literal
                            var_value = int(var_value)
                        elif var_value in ['true', 'false']:
                            # Boolean literal
                            var_value = var_value == 'true'
                        else:
                            # Keep as string for now
                            pass
                    except:
                        pass
                    
                    variables[var_name] = var_value
                    
                    # Check if this creates a data structure
                    if 'new Stack' in line or 'new ArrayList' in line or 'new LinkedList' in line:
                        if 'Stack' in line:
                            data_structures[var_name] = {
                                'type': 'stack',
                                'elements': [],  # type: List[Any]
                                'top': None
                            }
                        elif 'ArrayList' in line or 'LinkedList' in line:
                            data_structures[var_name] = {
                                'type': 'array',
                                'elements': [],  # type: List[Any]
                                'length': 0
                            }
            
            # Detect method calls and operations
            elif '.push(' in line:
                # Stack push operation
                for var_name, structure in data_structures.items():
                    if structure['type'] == 'stack' and f'{var_name}.push(' in line:
                        # Extract the value being pushed
                        start = line.find('(') + 1
                        end = line.find(')')
                        if start > 0 and end > start:
                            value: Any = line[start:end].strip().rstrip(';')
                            structure['elements'].append(value)
                            structure['top'] = value
                        break
            
            elif '.pop()' in line:
                # Stack pop operation
                for var_name, structure in data_structures.items():
                    if structure['type'] == 'stack' and f'{var_name}.pop()' in line:
                        if structure['elements']:
                            structure['elements'].pop()
                            structure['top'] = structure['elements'][-1] if structure['elements'] else None
                        break
            
            elif '.add(' in line:
                # List/Queue add operation
                for var_name, structure in data_structures.items():
                    if structure['type'] == 'array' and f'{var_name}.add(' in line:
                        # Extract the value being added
                        start = line.find('(') + 1
                        end = line.find(')')
                        if start > 0 and end > start:
                            value = line[start:end].strip().rstrip(';')
                            structure['elements'].append(value)
                            structure['length'] = len(structure['elements'])
                        break
            
            # Add trace step for this line
            trace.append({
                'line': current_line,
                'code_line': line,
                'locals': variables.copy(),
                'data_structures': data_structures.copy(),
                'call_stack': [{'function': 'main', 'line': current_line, 'filename': 'Main.java'}],
                'output': '',
                'error': None
            })
        
        # Parse output lines and create trace steps
        if output:
            lines = output.strip().split('\n')
            for i, line in enumerate(lines):
                trace.append({
                    'line': len(trace) + 1,
                    'code_line': f'// Output: {line}',
                    'locals': {'output_line': line},
                    'data_structures': data_structures.copy(),
                    'call_stack': [{'function': 'main', 'line': len(trace) + 1, 'filename': 'Main.java'}],
                    'output': line,
                    'error': None
                })
        
        # Add error if any
        if error:
            trace.append({
                'line': len(trace) + 1,
                'code_line': '// Error occurred',
                'locals': variables.copy(),
                'data_structures': data_structures.copy(),
                'call_stack': [{'function': 'main', 'line': len(trace) + 1, 'filename': 'Main.java'}],
                'output': '',
                'error': error
            })
        
        return trace
    
    def execute_with_trace(self, code: str, input_data: List[Any]) -> Dict[str, Any]:
        """Execute Java code with tracing"""
        try:
            logger.info("Starting Java code execution with tracing")
            
            # Extract class name from code or use default
            class_name = self._extract_class_name(code) or "Main"
            
            # Create Java file
            file_path = self._create_java_file(code, class_name)
            
            # Compile Java file
            if not self._compile_java(file_path):
                return {
                    'success': False,
                    'error': 'Java compilation failed',
                    'trace': []
                }
            
            # Run with tracing
            class_path = os.path.dirname(file_path)
            result = self._run_java_with_trace(class_path, class_name, input_data)
            
            # Clean up
            try:
                os.remove(file_path)
                class_file = file_path.replace('.java', '.class')
                if os.path.exists(class_file):
                    os.remove(class_file)
            except:
                pass
            
            return result
            
        except Exception as e:
            logger.error(f"Java execution failed: {e}")
            return {
                'success': False,
                'error': str(e),
                'trace': []
            }
    
    def _extract_class_name(self, code: str) -> Optional[str]:
        """Extract class name from Java code"""
        match = re.search(r'public\s+class\s+(\w+)', code)
        return match.group(1) if match else None

def execute_java_with_trace(code: str, input_data: List[Any]) -> Dict[str, Any]:
    """Convenience function to execute Java code with tracing"""
    executor = JavaExecutor()
    return executor.execute_with_trace(code, input_data) 
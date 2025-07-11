import sys
import ast
import types
import copy
import traceback

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

class ExecutionTracer:
    def __init__(self, code, input_data=None):
        self.code = code
        self.input_data = input_data or []
        self.trace = []
        self.frame_locals = {}
        self.graph_snapshots = []
        self.current_line = None
        self.call_stack = []
        self.data_structures = {}

    def _is_graph(self, obj):
        # Detects adjacency list/dict as a graph
        if isinstance(obj, dict):
            if all(isinstance(v, (list, set, tuple)) for v in obj.values()):
                return True
        return False

    def _is_stack(self, obj):
        # Detect stack-like structures (list used as stack)
        if isinstance(obj, list):
            # Simple heuristic: if we see pop/append operations, it might be a stack
            return True
        return False

    def _is_queue(self, obj):
        # Detect queue-like structures
        if isinstance(obj, list):
            # Simple heuristic: if we see pop(0)/append operations, it might be a queue
            return True
        return False

    def _serialize_graph(self, graph):
        nodes = list(graph.keys())
        edges = []
        for src, targets in graph.items():
            for tgt in targets:
                edges.append({'from': src, 'to': tgt})
        return {'nodes': nodes, 'edges': edges}

    def _serialize_stack(self, stack):
        return {
            'type': 'stack',
            'elements': stack.copy() if isinstance(stack, list) else list(stack),
            'top': stack[-1] if stack else None
        }

    def _serialize_queue(self, queue):
        return {
            'type': 'queue',
            'elements': queue.copy() if isinstance(queue, list) else list(queue),
            'front': queue[0] if queue else None,
            'rear': queue[-1] if queue else None
        }

    def _detect_data_structures(self, local_vars):
        """Detect and serialize data structures for visualization"""
        structures = {}
        
        for var_name, var_value in local_vars.items():
            if self._is_graph(var_value):
                structures[var_name] = {
                    'type': 'graph',
                    'data': self._serialize_graph(var_value)
                }
            elif self._is_stack(var_value):
                structures[var_name] = self._serialize_stack(var_value)
            elif self._is_queue(var_value):
                structures[var_name] = self._serialize_queue(var_value)
            elif isinstance(var_value, (list, tuple)):
                structures[var_name] = {
                    'type': 'array',
                    'elements': list(var_value),
                    'length': len(var_value)
                }
            elif isinstance(var_value, dict):
                structures[var_name] = {
                    'type': 'dictionary',
                    'keys': list(var_value.keys()),
                    'values': list(var_value.values())
                }
        
        return structures

    def _snapshot(self, frame):
        # Make a deep copy of frame locals and ensure they're JSON-serializable
        local_vars = copy.deepcopy(frame.f_locals)
        # Apply defensive serialization to all frame locals
        serializable_locals = _make_json_serializable(local_vars)
        
        # Detect data structures for visualization
        data_structures = self._detect_data_structures(local_vars)
        
        # Get call stack information
        call_stack = []
        current_frame = frame
        while current_frame:
            call_stack.append({
                'function': current_frame.f_code.co_name,
                'line': current_frame.f_lineno,
                'filename': current_frame.f_code.co_filename
            })
            current_frame = current_frame.f_back
        
        # Get current line of code
        try:
            lines = self.code.split('\n')
            current_code_line = lines[frame.f_lineno - 1] if 0 <= frame.f_lineno - 1 < len(lines) else ""
        except:
            current_code_line = ""
        
        self.trace.append({
            'line': frame.f_lineno,
            'code_line': current_code_line.strip(),
            'locals': serializable_locals,
            'data_structures': data_structures,
            'call_stack': call_stack,
            'graph': self._serialize_graph(local_vars) if any(self._is_graph(v) for v in local_vars.values()) else None
        })

    def tracer(self, frame, event, arg):
        if event == 'line':
            self._snapshot(frame)
        return self.tracer

    def run(self):
        compiled = compile(self.code, '<string>', 'exec')
        g = {'__builtins__': __builtins__}
        if self.input_data:
            g['input_data'] = self.input_data
        sys.settrace(self.tracer)
        try:
            exec(compiled, g)
        except Exception as e:
            error_info = {
                'error': str(e),
                'error_type': type(e).__name__,
                'traceback': traceback.format_exc()
            }
            self.trace.append(error_info)
        finally:
            sys.settrace(None)
        return self.trace

def trace_code(code: str, input_data: list | None = None) -> dict:
    tracer = ExecutionTracer(code, input_data or [])
    trace = tracer.run()
    return {'trace': trace} 
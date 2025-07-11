"""
Enhanced visualization service for DSA algorithms
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
import io
import base64
from typing import Dict, Any, List, Optional
from app.core.logging import get_logger

logger = get_logger(__name__)

class EnhancedVisualizationService:
    def __init__(self):
        self.supported_structures = ['stack', 'queue', 'array', 'graph', 'tree', 'linked_list']
    
    async def generate_algorithm_visualization(self, algorithm_type: str, data: Dict[str, Any]) -> Dict[str, str]:
        """
        Generate algorithm-specific visualizations
        """
        try:
            visualizations = {}
            
            if algorithm_type == 'sorting':
                visualizations.update(await self._generate_sorting_visualization(data))
            elif algorithm_type == 'searching':
                visualizations.update(await self._generate_searching_visualization(data))
            elif algorithm_type == 'graph_traversal':
                visualizations.update(await self._generate_graph_visualization(data))
            elif algorithm_type == 'tree_traversal':
                visualizations.update(await self._generate_tree_visualization(data))
            elif algorithm_type == 'dynamic_programming':
                visualizations.update(await self._generate_dp_visualization(data))
            
            return visualizations
        except Exception as e:
            logger.error(f"Algorithm visualization failed: {e}")
            return {}
    
    async def _generate_sorting_visualization(self, data: Dict[str, Any]) -> Dict[str, str]:
        """Generate sorting algorithm visualizations"""
        try:
            array = data.get('array', [])
            if not array:
                return {}
            
            fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
            
            # Before sorting
            ax1.bar(range(len(array)), array, color='lightblue', alpha=0.7)
            ax1.set_title('Before Sorting')
            ax1.set_xlabel('Index')
            ax1.set_ylabel('Value')
            
            # After sorting
            sorted_array = sorted(array)
            ax2.bar(range(len(sorted_array)), sorted_array, color='lightgreen', alpha=0.7)
            ax2.set_title('After Sorting')
            ax2.set_xlabel('Index')
            ax2.set_ylabel('Value')
            
            plt.tight_layout()
            
            # Convert to base64
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
            buffer.seek(0)
            image_base64 = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
            
            return {'sorting_comparison': image_base64}
        except Exception as e:
            logger.error(f"Sorting visualization failed: {e}")
            return {}
    
    async def _generate_searching_visualization(self, data: Dict[str, Any]) -> Dict[str, str]:
        """Generate searching algorithm visualizations"""
        try:
            array = data.get('array', [])
            target = data.get('target')
            if not array or target is None:
                return {}
            
            fig, ax = plt.subplots(figsize=(12, 6))
            
            # Create bar chart with target highlighted
            colors = ['red' if x == target else 'lightblue' for x in array]
            bars = ax.bar(range(len(array)), array, color=colors, alpha=0.7)
            
            # Highlight target
            if target in array:
                target_indices = [i for i, x in enumerate(array) if x == target]
                for idx in target_indices:
                    bars[idx].set_color('red')
                    bars[idx].set_alpha(1.0)
            
            ax.set_title(f'Searching for {target}')
            ax.set_xlabel('Index')
            ax.set_ylabel('Value')
            ax.axhline(y=target, color='red', linestyle='--', alpha=0.5, label=f'Target: {target}')
            ax.legend()
            
            plt.tight_layout()
            
            # Convert to base64
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
            buffer.seek(0)
            image_base64 = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
            
            return {'searching_visualization': image_base64}
        except Exception as e:
            logger.error(f"Searching visualization failed: {e}")
            return {}
    
    async def _generate_graph_visualization(self, data: Dict[str, Any]) -> Dict[str, str]:
        """Generate graph traversal visualizations"""
        try:
            nodes = data.get('nodes', [])
            edges = data.get('edges', [])
            traversal_order = data.get('traversal_order', [])
            
            if not nodes:
                return {}
            
            fig, ax = plt.subplots(figsize=(10, 8))
            
            # Create graph layout
            pos = {}
            n = len(nodes)
            for i, node in enumerate(nodes):
                angle = 2 * np.pi * i / n
                pos[node] = (np.cos(angle), np.sin(angle))
            
            # Draw edges
            for edge in edges:
                start, end = edge['from'], edge['to']
                if start in pos and end in pos:
                    x1, y1 = pos[start]
                    x2, y2 = pos[end]
                    ax.plot([x1, x2], [y1, y2], 'k-', alpha=0.3, linewidth=1)
            
            # Draw nodes with traversal order coloring
            for i, node in enumerate(nodes):
                x, y = pos[node]
                if node in traversal_order:
                    order = traversal_order.index(node)
                    color = plt.cm.viridis(order / len(traversal_order))
                    ax.scatter(x, y, c=[color], s=200, alpha=0.8)
                    ax.annotate(f'{node}\n({order+1})', (x, y), 
                              xytext=(5, 5), textcoords='offset points',
                              ha='center', va='center', fontsize=10)
                else:
                    ax.scatter(x, y, c='lightgray', s=150, alpha=0.6)
                    ax.annotate(str(node), (x, y), 
                              xytext=(5, 5), textcoords='offset points',
                              ha='center', va='center', fontsize=10)
            
            ax.set_title('Graph Traversal Visualization')
            ax.set_xlim(-1.2, 1.2)
            ax.set_ylim(-1.2, 1.2)
            ax.set_aspect('equal')
            ax.axis('off')
            
            plt.tight_layout()
            
            # Convert to base64
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
            buffer.seek(0)
            image_base64 = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
            
            return {'graph_traversal': image_base64}
        except Exception as e:
            logger.error(f"Graph visualization failed: {e}")
            return {}
    
    async def _generate_tree_visualization(self, data: Dict[str, Any]) -> Dict[str, str]:
        """Generate tree traversal visualizations"""
        try:
            tree_data = data.get('tree', {})
            traversal_order = data.get('traversal_order', [])
            
            if not tree_data:
                return {}
            
            fig, ax = plt.subplots(figsize=(12, 8))
            
            # Simple tree visualization
            def draw_tree(node_data, x=0, y=0, level=0):
                if not node_data:
                    return
                
                # Draw current node
                color = 'red' if node_data['value'] in traversal_order else 'lightblue'
                circle = patches.Circle((x, y), 0.3, facecolor=color, alpha=0.7)
                ax.add_patch(circle)
                
                # Add label
                order = traversal_order.index(node_data['value']) + 1 if node_data['value'] in traversal_order else ''
                ax.text(x, y, f"{node_data['value']}\n{order}", 
                       ha='center', va='center', fontsize=10, fontweight='bold')
                
                # Draw children
                spacing = 2 ** (3 - level) if level < 3 else 0.5
                if 'left' in node_data and node_data['left']:
                    ax.plot([x, x - spacing], [y, y - 1], 'k-', alpha=0.5)
                    draw_tree(node_data['left'], x - spacing, y - 1, level + 1)
                
                if 'right' in node_data and node_data['right']:
                    ax.plot([x, x + spacing], [y, y - 1], 'k-', alpha=0.5)
                    draw_tree(node_data['right'], x + spacing, y - 1, level + 1)
            
            draw_tree(tree_data)
            
            ax.set_title('Tree Traversal Visualization')
            ax.set_xlim(-5, 5)
            ax.set_ylim(-4, 1)
            ax.set_aspect('equal')
            ax.axis('off')
            
            plt.tight_layout()
            
            # Convert to base64
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
            buffer.seek(0)
            image_base64 = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
            
            return {'tree_traversal': image_base64}
        except Exception as e:
            logger.error(f"Tree visualization failed: {e}")
            return {}
    
    async def _generate_dp_visualization(self, data: Dict[str, Any]) -> Dict[str, str]:
        """Generate dynamic programming visualizations"""
        try:
            dp_table = data.get('dp_table', [])
            if not dp_table:
                return {}
            
            fig, ax = plt.subplots(figsize=(10, 8))
            
            # Create heatmap
            im = ax.imshow(dp_table, cmap='YlOrRd', aspect='auto')
            
            # Add text annotations
            for i in range(len(dp_table)):
                for j in range(len(dp_table[0])):
                    text = ax.text(j, i, dp_table[i][j],
                                 ha="center", va="center", color="black", fontsize=10)
            
            ax.set_title('Dynamic Programming Table')
            ax.set_xlabel('Column')
            ax.set_ylabel('Row')
            
            # Add colorbar
            cbar = plt.colorbar(im, ax=ax)
            cbar.set_label('Value')
            
            plt.tight_layout()
            
            # Convert to base64
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
            buffer.seek(0)
            image_base64 = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
            
            return {'dp_table': image_base64}
        except Exception as e:
            logger.error(f"DP visualization failed: {e}")
            return {}
    
    async def generate_data_structure_animation(self, structure_type: str, operations: List[Dict[str, Any]]) -> str:
        """
        Generate animated visualization for data structure operations
        """
        try:
            if structure_type == 'stack':
                return await self._generate_stack_animation(operations)
            elif structure_type == 'queue':
                return await self._generate_queue_animation(operations)
            elif structure_type == 'array':
                return await self._generate_array_animation(operations)
            
            return ""
        except Exception as e:
            logger.error(f"Data structure animation failed: {e}")
            return ""
    
    async def _generate_stack_animation(self, operations: List[Dict[str, Any]]) -> str:
        """Generate stack operation animation"""
        try:
            fig, ax = plt.subplots(figsize=(8, 10))
            
            stack = []
            max_frames = len(operations)
            
            for i, op in enumerate(operations):
                ax.clear()
                
                if op['type'] == 'push':
                    stack.append(op['value'])
                elif op['type'] == 'pop':
                    if stack:
                        stack.pop()
                
                # Draw stack
                for j, value in enumerate(stack):
                    rect = patches.Rectangle((0.3, j * 0.8), 0.4, 0.7, 
                                          facecolor='lightblue', edgecolor='black')
                    ax.add_patch(rect)
                    ax.text(0.5, j * 0.8 + 0.35, str(value), 
                           ha='center', va='center', fontsize=12, fontweight='bold')
                
                ax.set_xlim(0, 1)
                ax.set_ylim(0, max(len(stack) * 0.8 + 0.5, 1))
                ax.set_title(f'Stack Operation: {op["type"].upper()} {op.get("value", "")}')
                ax.set_aspect('equal')
                ax.axis('off')
                
                # Save frame
                buffer = io.BytesIO()
                plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
                buffer.seek(0)
                frame_base64 = base64.b64encode(buffer.getvalue()).decode()
                buffer.close()
            
            plt.close()
            return frame_base64
        except Exception as e:
            logger.error(f"Stack animation failed: {e}")
            return ""

# Legacy compatibility
class VisualizationService:
    def __init__(self):
        self.enhanced_service = EnhancedVisualizationService()
    
    async def generate_visualizations(self, code: str, language: str, input_data: List[Any]) -> Dict[str, Any]:
        """
        Generate comprehensive visualizations for code execution
        """
        try:
            visualizations = {}
            
            # Generate basic visualizations
            visualizations['complexity_chart'] = await self._generate_complexity_chart()
            visualizations['execution_flow'] = await self._generate_execution_flow()
            visualizations['memory_usage'] = await self._generate_memory_usage()
            
            # Generate algorithm-specific visualizations if detected
            algorithm_type = self._detect_algorithm_type(code)
            if algorithm_type:
                algorithm_data = self._extract_algorithm_data(code, input_data)
                algorithm_viz = await self.enhanced_service.generate_algorithm_visualization(
                    algorithm_type, algorithm_data
                )
                visualizations.update(algorithm_viz)
            
            return visualizations
        except Exception as e:
            logger.error(f"Visualization generation failed: {e}")
            return {}
    
    def _detect_algorithm_type(self, code: str) -> Optional[str]:
        """Detect algorithm type from code"""
        code_lower = code.lower()
        
        if any(word in code_lower for word in ['sort', 'bubble', 'quick', 'merge', 'heap']):
            return 'sorting'
        elif any(word in code_lower for word in ['search', 'binary', 'linear', 'find']):
            return 'searching'
        elif any(word in code_lower for word in ['graph', 'bfs', 'dfs', 'traversal']):
            return 'graph_traversal'
        elif any(word in code_lower for word in ['tree', 'inorder', 'preorder', 'postorder']):
            return 'tree_traversal'
        elif any(word in code_lower for word in ['dp', 'dynamic', 'memoization']):
            return 'dynamic_programming'
        
        return None
    
    def _extract_algorithm_data(self, code: str, input_data: List[Any]) -> Dict[str, Any]:
        """Extract relevant data for algorithm visualization"""
        data = {}
        
        # For sorting algorithms
        if self._detect_algorithm_type(code) == 'sorting':
            if input_data and len(input_data) > 0:
                data['array'] = input_data
            else:
                # Generate sample data
                data['array'] = [64, 34, 25, 12, 22, 11, 90]
        
        # For searching algorithms
        elif self._detect_algorithm_type(code) == 'searching':
            if input_data and len(input_data) > 1:
                data['array'] = input_data[:-1]
                data['target'] = input_data[-1]
            else:
                data['array'] = [1, 3, 5, 7, 9, 11, 13, 15]
                data['target'] = 7
        
        return data
    
    async def _generate_complexity_chart(self) -> str:
        """Generate complexity analysis chart"""
        try:
            fig, ax = plt.subplots(figsize=(10, 6))
            
            x = np.linspace(1, 100, 100)
            y1 = x  # O(n)
            y2 = x * np.log(x)  # O(n log n)
            y3 = x**2  # O(n²)
            
            ax.plot(x, y1, label='O(n)', linewidth=2)
            ax.plot(x, y2, label='O(n log n)', linewidth=2)
            ax.plot(x, y3, label='O(n²)', linewidth=2)
            
            ax.set_xlabel('Input Size (n)')
            ax.set_ylabel('Time Complexity')
            ax.set_title('Algorithm Complexity Comparison')
            ax.legend()
            ax.grid(True, alpha=0.3)
            
            plt.tight_layout()
            
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
            buffer.seek(0)
            image_base64 = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
            
            return image_base64
        except Exception as e:
            logger.error(f"Complexity chart generation failed: {e}")
            return ""
    
    async def _generate_execution_flow(self) -> str:
        """Generate execution flow diagram"""
        try:
            fig, ax = plt.subplots(figsize=(10, 6))
            
            # Simple flow diagram
            flow_steps = ['Input', 'Process', 'Decision', 'Output']
            y_positions = [0.8, 0.6, 0.4, 0.2]
            
            for i, (step, y) in enumerate(zip(flow_steps, y_positions)):
                # Draw box
                rect = patches.Rectangle((0.1, y-0.1), 0.8, 0.15, 
                                      facecolor='lightblue', edgecolor='black')
                ax.add_patch(rect)
                ax.text(0.5, y, step, ha='center', va='center', fontsize=12, fontweight='bold')
                
                # Draw arrow
                if i < len(flow_steps) - 1:
                    ax.arrow(0.5, y-0.1, 0, -0.05, head_width=0.02, head_length=0.02, 
                           fc='black', ec='black')
            
            ax.set_xlim(0, 1)
            ax.set_ylim(0, 1)
            ax.set_title('Execution Flow')
            ax.axis('off')
            
            plt.tight_layout()
            
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
            buffer.seek(0)
            image_base64 = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
            
            return image_base64
        except Exception as e:
            logger.error(f"Execution flow generation failed: {e}")
            return ""
    
    async def _generate_memory_usage(self) -> str:
        """Generate memory usage visualization"""
        try:
            fig, ax = plt.subplots(figsize=(10, 6))
            
            # Simulate memory usage over time
            time_steps = np.linspace(0, 10, 50)
            memory_usage = 100 + 50 * np.sin(time_steps) + np.random.normal(0, 5, 50)
            
            ax.plot(time_steps, memory_usage, 'b-', linewidth=2, alpha=0.7)
            ax.fill_between(time_steps, memory_usage, alpha=0.3, color='blue')
            
            ax.set_xlabel('Time')
            ax.set_ylabel('Memory Usage (MB)')
            ax.set_title('Memory Usage Over Time')
            ax.grid(True, alpha=0.3)
            
            plt.tight_layout()
            
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
            buffer.seek(0)
            image_base64 = base64.b64encode(buffer.getvalue()).decode()
            plt.close()
            
            return image_base64
        except Exception as e:
            logger.error(f"Memory usage generation failed: {e}")
            return "" 
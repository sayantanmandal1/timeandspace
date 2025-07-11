import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

export default function DataStructureVisualizer({ dataStructures = {} }) {
  const [structures, setStructures] = useState({});

  useEffect(() => {
    setStructures(dataStructures);
  }, [dataStructures]);

  const renderStack = (stack) => {
    if (!Array.isArray(stack)) return null;
    
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Stack
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse', gap: 1 }}>
            {stack.map((item, index) => (
              <Paper 
                key={index} 
                sx={{ 
                  p: 2, 
                  backgroundColor: index === stack.length - 1 ? '#e3f2fd' : '#f5f5f5',
                  border: index === stack.length - 1 ? '2px solid #2196f3' : '1px solid #e0e0e0',
                  borderRadius: 1
                }}
              >
                <Typography variant="body2" fontFamily="monospace">
                  {JSON.stringify(item)}
                </Typography>
                {index === stack.length - 1 && (
                  <Chip label="TOP" size="small" color="primary" sx={{ mt: 1 }} />
                )}
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderQueue = (queue) => {
    if (!Array.isArray(queue)) return null;
    
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Queue
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {queue.map((item, index) => (
              <Paper 
                key={index} 
                sx={{ 
                  p: 2, 
                  backgroundColor: index === 0 ? '#e8f5e8' : '#f5f5f5',
                  border: index === 0 ? '2px solid #4caf50' : '1px solid #e0e0e0',
                  borderRadius: 1,
                  minWidth: 60,
                  textAlign: 'center'
                }}
              >
                <Typography variant="body2" fontFamily="monospace">
                  {JSON.stringify(item)}
                </Typography>
                {index === 0 && (
                  <Chip label="FRONT" size="small" color="success" sx={{ mt: 1 }} />
                )}
                {index === queue.length - 1 && (
                  <Chip label="BACK" size="small" color="secondary" sx={{ mt: 1 }} />
                )}
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderArray = (array) => {
    if (!Array.isArray(array)) return null;
    
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Array
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {array.map((item, index) => (
              <Paper 
                key={index} 
                sx={{ 
                  p: 2, 
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  minWidth: 60,
                  textAlign: 'center'
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  [{index}]
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  {JSON.stringify(item)}
                </Typography>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderDictionary = (dict) => {
    if (typeof dict !== 'object' || Array.isArray(dict)) return null;
    
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Dictionary
          </Typography>
          <List dense>
            {Object.entries(dict).map(([key, value]) => (
              <ListItem key={key} sx={{ py: 0.5 }}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {key}:
                      </Typography>
                      <Typography variant="body2" fontFamily="monospace">
                        {JSON.stringify(value)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

  const renderGraph = (graph) => {
    if (!graph || typeof graph !== 'object') return null;
    
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Graph
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Nodes: {Object.keys(graph).length}
          </Typography>
          <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
            {Object.entries(graph).map(([node, edges]) => (
              <Box key={node} sx={{ mb: 1, p: 1, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  Node {node}:
                </Typography>
                <Typography variant="body2" fontFamily="monospace">
                  Edges: {Array.isArray(edges) ? edges.join(', ') : JSON.stringify(edges)}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderTree = (tree) => {
    if (!tree || typeof tree !== 'object') return null;
    
    const renderTreeNode = (node, level = 0) => {
      if (!node) return null;
      
      return (
        <Box key={node.val || node.value || node} sx={{ ml: level * 2 }}>
          <Paper 
            sx={{ 
              p: 1, 
              mb: 1, 
              backgroundColor: '#f5f5f5',
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              display: 'inline-block'
            }}
          >
            <Typography variant="body2" fontFamily="monospace">
              {node.val || node.value || node}
            </Typography>
          </Paper>
          {node.left && renderTreeNode(node.left, level + 1)}
          {node.right && renderTreeNode(node.right, level + 1)}
        </Box>
      );
    };
    
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tree
          </Typography>
          {renderTreeNode(tree)}
        </CardContent>
      </Card>
    );
  };

  if (!structures || Object.keys(structures).length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No Data Structures Detected
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Run your code to see data structure visualizations
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Data Structure Visualizations
      </Typography>
      
      <Grid container spacing={2}>
        {Object.entries(structures).map(([name, data]) => (
          <Grid item xs={12} key={name}>
            <Typography variant="h6" color="primary" gutterBottom>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            
            {Array.isArray(data) && name.toLowerCase().includes('stack') && renderStack(data)}
            {Array.isArray(data) && name.toLowerCase().includes('queue') && renderQueue(data)}
            {Array.isArray(data) && !name.toLowerCase().includes('stack') && !name.toLowerCase().includes('queue') && renderArray(data)}
            {typeof data === 'object' && !Array.isArray(data) && name.toLowerCase().includes('graph') && renderGraph(data)}
            {typeof data === 'object' && !Array.isArray(data) && name.toLowerCase().includes('tree') && renderTree(data)}
            {typeof data === 'object' && !Array.isArray(data) && !name.toLowerCase().includes('graph') && !name.toLowerCase().includes('tree') && renderDictionary(data)}
            
            {!Array.isArray(data) && typeof data !== 'object' && (
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body2" fontFamily="monospace">
                    {JSON.stringify(data, null, 2)}
                  </Typography>
                </CardContent>
              </Card>
            )}
            <Divider sx={{ my: 2 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 
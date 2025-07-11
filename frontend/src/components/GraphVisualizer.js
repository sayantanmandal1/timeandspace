import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, Paper, Card, CardContent, Grid } from '@mui/material';

export default function GraphVisualizer({ data, title = "Graph Visualization" }) {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (data) {
      setGraphData(data);
    }
  }, [data]);

  const renderNode = (node, index) => (
    <Card 
      key={index} 
      variant="outlined" 
      sx={{ 
        p: 2, 
        mb: 1, 
        backgroundColor: '#e3f2fd',
        border: '2px solid #2196f3',
        borderRadius: 2,
        textAlign: 'center',
        minWidth: 80
      }}
    >
      <Typography variant="h6" color="primary">
        {node}
      </Typography>
    </Card>
  );

  const renderEdge = (edge, index) => (
    <Box 
      key={index} 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        mb: 1,
        p: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 1
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        {edge.from}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        →
      </Typography>
      <Typography variant="body2" fontWeight="bold">
        {edge.to}
      </Typography>
    </Box>
  );

  if (!graphData) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No graph data available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Graph visualization will appear here when data is available
        </Typography>
      </Paper>
    );
  }

  const { nodes = [], edges = [] } = graphData;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Nodes */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Nodes ({nodes.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {nodes.map((node, index) => renderNode(node, index))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Edges */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Edges ({edges.length})
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {edges.map((edge, index) => renderEdge(edge, index))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Graph Statistics */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Graph Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {nodes.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nodes
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="secondary">
                      {edges.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Edges
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success">
                      {nodes.length > 0 ? (edges.length / nodes.length).toFixed(2) : 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Degree
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning">
                      {nodes.length > 0 ? 'Connected' : 'Empty'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
} 
import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const features = [
  'Code analysis (AST, complexity, execution trace)',
  'Batch analysis',
  'Code execution',
  'Optimization suggestions',
  'Multi-language support',
  'Modern, responsive UI',
];

export default function HomePage() {
  return (
    <Box>
      <Paper sx={{ p: 4, mb: 4 }} elevation={3}>
        <Typography variant="h3" gutterBottom>DSA Code Analysis Platform</Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Analyze, visualize, and optimize your DSA code with insights.
        </Typography>
        <Button component={Link} to="/analyze" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Paper>
      <Typography variant="h4" gutterBottom>Features</Typography>
      <Grid container spacing={2}>
        {features.map((feature, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Paper sx={{ p: 2 }}>
              <Typography>{feature}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 
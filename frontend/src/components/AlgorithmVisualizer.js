import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Slider,
  IconButton,
  Paper,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  RestartAlt,
  Speed,
} from '@mui/icons-material';

export default function AlgorithmVisualizer({
  algorithmType,
  data,
  trace = [],
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [animationData, setAnimationData] = useState(null);

  const generateSortingAnimation = (trace) => {
    const steps = [];
    let currentArray = [];

    for (const step of trace) {
      if (step.locals) {
        // Look for array variables
        for (const [, value] of Object.entries(step.locals)) {
          if (Array.isArray(value) && value.length > 0) {
            currentArray = [...value];
            steps.push({
              array: currentArray,
              step: step.line,
              code: step.code_line,
              highlighted: [],
            });
          }
        }
      }
    }

    return steps;
  };

  const generateSearchingAnimation = (trace) => {
    const steps = [];
    let currentArray = [];
    let target = null;

    for (const step of trace) {
      if (step.locals) {
        for (const [key, value] of Object.entries(step.locals)) {
          if (Array.isArray(value)) {
            currentArray = [...value];
          } else if (typeof value === 'number' && key.includes('target')) {
            target = value;
          }
        }

        if (currentArray.length > 0) {
          steps.push({
            array: currentArray,
            target: target,
            step: step.line,
            code: step.code_line,
            highlighted: [],
          });
        }
      }
    }

    return steps;
  };

  const generateGraphAnimation = (trace) => {
    const steps = [];

    for (const step of trace) {
      if (step.data_structures) {
        for (const [, structure] of Object.entries(step.data_structures)) {
          if (structure.type === 'graph') {
            steps.push({
              nodes: structure.data.nodes,
              edges: structure.data.edges,
              step: step.line,
              code: step.code_line,
              visited: [],
            });
          }
        }
      }
    }

    return steps;
  };

  const generateTreeAnimation = (trace) => {
    const steps = [];

    for (const step of trace) {
      if (step.data_structures) {
        for (const [, structure] of Object.entries(step.data_structures)) {
          if (structure.type === 'tree') {
            steps.push({
              tree: structure.data,
              step: step.line,
              code: step.code_line,
              visited: [],
            });
          }
        }
      }
    }

    return steps;
  };

  const generateAnimationData = useCallback((type, trace) => {
    switch (type) {
      case 'sorting':
        return generateSortingAnimation(trace);
      case 'searching':
        return generateSearchingAnimation(trace);
      case 'graph_traversal':
        return generateGraphAnimation(trace);
      case 'tree_traversal':
        return generateTreeAnimation(trace);
      default:
        return [];
    }
  }, []);

  useEffect(() => {
    if (trace && trace.length > 0) {
      setAnimationData(generateAnimationData(algorithmType, trace));
    }
  }, [algorithmType, trace, generateAnimationData]);

  useEffect(() => {
    let interval;
    if (isPlaying && animationData && currentStep < animationData.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= animationData.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, animationData, playbackSpeed]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (animationData && currentStep < animationData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleSpeedChange = (event, newValue) => {
    setPlaybackSpeed(newValue);
  };

  const renderSortingVisualization = (stepData) => {
    if (!stepData || !stepData.array) return null;

    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sorting Visualization
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {stepData.array.map((value, index) => (
              <Box
                key={index}
                sx={{
                  width: '50px',
                  height: '50px',
                  border: '2px solid #2196F3',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: stepData.highlighted.includes(index)
                    ? '#E3F2FD'
                    : '#fff',
                  fontWeight: stepData.highlighted.includes(index)
                    ? 'bold'
                    : 'normal',
                  fontSize: '0.875rem',
                }}
              >
                {value}
              </Box>
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {stepData.code}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const renderSearchingVisualization = (stepData) => {
    if (!stepData || !stepData.array) return null;

    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Searching Visualization
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {stepData.array.map((value, index) => (
              <Box
                key={index}
                sx={{
                  width: '50px',
                  height: '50px',
                  border: '2px solid #2196F3',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    value === stepData.target ? '#FFCDD2' : '#fff',
                  fontWeight: value === stepData.target ? 'bold' : 'normal',
                  fontSize: '0.875rem',
                }}
              >
                {value}
              </Box>
            ))}
          </Box>
          {stepData.target && (
            <Typography variant="body2" color="error" gutterBottom>
              Searching for: {stepData.target}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {stepData.code}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const renderGraphVisualization = (stepData) => {
    if (!stepData || !stepData.nodes) return null;

    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Graph Traversal
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {stepData.nodes.map((node, index) => (
              <Box
                key={index}
                sx={{
                  width: '60px',
                  height: '60px',
                  border: '2px solid #4CAF50',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: stepData.visited.includes(node)
                    ? '#C8E6C9'
                    : '#fff',
                  fontWeight: stepData.visited.includes(node)
                    ? 'bold'
                    : 'normal',
                  fontSize: '0.875rem',
                }}
              >
                {node}
              </Box>
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {stepData.code}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const renderTreeVisualization = (stepData) => {
    if (!stepData || !stepData.tree) return null;

    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tree Traversal
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2,
            }}
          >
            {/* Simple tree representation */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  border: '2px solid #FF9800',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFF3E0',
                  mb: 1,
                }}
              >
                Root
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box
                  sx={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid #FF9800',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFF3E0',
                    fontSize: '0.75rem',
                  }}
                >
                  L
                </Box>
                <Box
                  sx={{
                    width: '40px',
                    height: '40px',
                    border: '2px solid #FF9800',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFF3E0',
                    fontSize: '0.75rem',
                  }}
                >
                  R
                </Box>
              </Box>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {stepData.code}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  if (!animationData || animationData.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No algorithm visualization available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Run an algorithm to see step-by-step visualization
        </Typography>
      </Paper>
    );
  }

  const currentStepData = animationData[currentStep];

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h5">
          {algorithmType.replace('_', ' ').toUpperCase()} Visualization
        </Typography>
        <Chip
          label={`Step ${currentStep + 1} of ${animationData.length}`}
          color="primary"
          variant="outlined"
        />
      </Box>

      {/* Playback controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <IconButton onClick={handleReset} disabled={currentStep === 0}>
          <RestartAlt />
        </IconButton>
        <IconButton onClick={handlePrevious} disabled={currentStep === 0}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={handlePlayPause} color="primary">
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={currentStep === animationData.length - 1}
        >
          <SkipNext />
        </IconButton>

        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}
        >
          <Speed fontSize="small" />
          <Slider
            value={playbackSpeed}
            onChange={handleSpeedChange}
            min={500}
            max={3000}
            step={500}
            marks={[
              { value: 500, label: 'Fast' },
              { value: 1000, label: 'Normal' },
              { value: 2000, label: 'Slow' },
              { value: 3000, label: 'Very Slow' },
            ]}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}ms`}
          />
        </Box>
      </Box>

      {/* Algorithm-specific visualization */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {algorithmType === 'sorting' &&
            renderSortingVisualization(currentStepData)}
          {algorithmType === 'searching' &&
            renderSearchingVisualization(currentStepData)}
          {algorithmType === 'graph_traversal' &&
            renderGraphVisualization(currentStepData)}
          {algorithmType === 'tree_traversal' &&
            renderTreeVisualization(currentStepData)}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Step Information
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Line:</strong> {currentStepData?.step || 'N/A'}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Code:</strong>
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#f5f5f5',
                  p: 1,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              >
                {currentStepData?.code || 'No code available'}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Slider,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  RestartAlt,
  Speed,
  Code,
} from '@mui/icons-material';

export default function StepByStepVisualizer({ trace = [], code = '' }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000); // milliseconds
  const [autoPlay, setAutoPlay] = useState(false);
  const intervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= trace.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, autoPlay, playbackSpeed, trace.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setAutoPlay(!isPlaying);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(trace.length - 1, prev + 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setAutoPlay(false);
  };

  const handleSpeedChange = (event, newValue) => {
    setPlaybackSpeed(newValue);
  };

  if (!trace.length) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No execution trace available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Run your code to see step-by-step execution
        </Typography>
      </Paper>
    );
  }

  const currentStepData = trace[currentStep] || {};
  const { line, code_line, locals, data_structures, call_stack, error } =
    currentStepData;

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header with controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h5">Step-by-Step Execution</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`Step ${currentStep + 1} of ${trace.length}`}
            color="primary"
            variant="outlined"
          />
        </Box>
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
          disabled={currentStep === trace.length - 1}
        >
          <SkipNext />
        </IconButton>

        <Divider orientation="vertical" flexItem />

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
          />
        </Box>
      </Box>

      {/* Current step information */}
      <Grid container spacing={3}>
        {/* Code line */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Code /> Current Line: {line || 'N/A'}
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: '#f5f5f5',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  border: '1px solid #e0e0e0',
                }}
              >
                {code_line || 'No code line available'}
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Variables */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Local Variables
              </Typography>
              {locals && Object.keys(locals).length > 0 ? (
                <Box>
                  {Object.entries(locals).map(([key, value]) => (
                    <Box
                      key={key}
                      sx={{
                        mb: 1,
                        p: 1,
                        backgroundColor: '#f8f9fa',
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="primary"
                      >
                        {key}:
                      </Typography>
                      <Typography variant="body2" fontFamily="monospace">
                        {JSON.stringify(value, null, 2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No local variables
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Call Stack */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Call Stack
              </Typography>
              {call_stack && call_stack.length > 0 ? (
                <Box>
                  {call_stack.map((call, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 1,
                        p: 1,
                        backgroundColor: '#f8f9fa',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" fontFamily="monospace">
                        {call}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No call stack information
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Data Structures */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Structures
              </Typography>
              {data_structures && Object.keys(data_structures).length > 0 ? (
                <Box>
                  {Object.entries(data_structures).map(([key, value]) => (
                    <Box key={key} sx={{ mb: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="secondary"
                      >
                        {key}:
                      </Typography>
                      <Typography variant="body2" fontFamily="monospace">
                        {JSON.stringify(value, null, 2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No data structures detected
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Error Information */}
        {error && (
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ borderColor: 'error.main' }}>
              <CardContent>
                <Typography variant="h6" color="error" gutterBottom>
                  Error
                </Typography>
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Progress indicator */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Progress: {currentStep + 1} / {trace.length}
        </Typography>
        <Slider
          value={currentStep}
          onChange={(event, newValue) => setCurrentStep(newValue)}
          min={0}
          max={Math.max(0, trace.length - 1)}
          step={1}
          marks={false}
          valueLabelDisplay="auto"
          sx={{ mt: 1 }}
        />
      </Box>
    </Paper>
  );
}

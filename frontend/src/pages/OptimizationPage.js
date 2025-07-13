import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Snackbar,
  InputLabel,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Code as CodeIcon,
  Assessment as AssessmentIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  BugReport as BugReportIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  Lightbulb as LightbulbIcon,
  AutoFixHigh as AutoFixHighIcon,
  TrendingUp as TrendingUpIcon,
  Clear as ClearIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import CodeEditor from '../components/CodeEditor';
import { suggestOptimizations, applyOptimizations } from '../api';

const defaultCode = `# Example: Inefficient Fibonacci implementation
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# This has O(2^n) time complexity
print(fibonacci(10))

# Example: Inefficient list operations
def find_duplicates(arr):
    duplicates = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j] and arr[i] not in duplicates:
                duplicates.append(arr[i])
    return duplicates

# This has O(n²) time complexity
numbers = [1, 2, 3, 4, 5, 1, 2, 6, 7, 8, 9, 1]
print(find_duplicates(numbers))`;

export default function OptimizationPage() {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState('python');
  const [optimizationType, setOptimizationType] = useState('all');
  const [suggestions, setSuggestions] = useState(null);
  const [optimizedCode, setOptimizedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [languages] = useState(['python', 'java', 'javascript', 'cpp', 'c']);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleSuggestOptimizations = async () => {
    if (!code.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter some code to optimize.',
        severity: 'warning',
      });
      return;
    }

    setLoading(true);
    setError(null);
    setSuggestions(null);
    setOptimizedCode(null);

    try {
      const response = await suggestOptimizations({
        code,
        language,
        optimization_type: optimizationType,
      });

      if (response.data.success) {
        setSuggestions(response.data);
        setSnackbar({
          open: true,
          message: 'Optimization suggestions generated!',
          severity: 'success',
        });
      } else {
        const responseError = response.data.error;
        const errorMessage =
          typeof responseError === 'string'
            ? responseError
            : JSON.stringify(responseError);
        setError(errorMessage || 'Failed to generate suggestions');
        setSnackbar({
          open: true,
          message: 'Failed to generate suggestions. Please check your code.',
          severity: 'error',
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        'Failed to generate suggestions';
      // Ensure error is a string
      setError(
        typeof errorMessage === 'string'
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
      setSnackbar({
        open: true,
        message: 'Failed to generate suggestions. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyOptimizations = async () => {
    if (!code.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter some code to optimize.',
        severity: 'warning',
      });
      return;
    }

    setLoading(true);
    setError(null);
    setOptimizedCode(null);

    try {
      const response = await applyOptimizations({
        code,
        language,
        optimization_type: optimizationType,
      });

      if (response.data.success) {
        setOptimizedCode(response.data);
        setSnackbar({
          open: true,
          message: 'Optimized code generated!',
          severity: 'success',
        });
      } else {
        const responseError = response.data.error;
        const errorMessage =
          typeof responseError === 'string'
            ? responseError
            : JSON.stringify(responseError);
        setError(errorMessage || 'Failed to apply optimizations');
        setSnackbar({
          open: true,
          message: 'Failed to apply optimizations. Please check your code.',
          severity: 'error',
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        'Failed to apply optimizations';
      // Ensure error is a string
      setError(
        typeof errorMessage === 'string'
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
      setSnackbar({
        open: true,
        message: 'Failed to apply optimizations. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode(defaultCode);
    setSuggestions(null);
    setOptimizedCode(null);
    setError(null);
    setSnackbar({ open: true, message: 'Code cleared.', severity: 'info' });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Code Optimization Platform
      </Typography>

      {/* Optimization notes field */}
      <TextField
        label="Optimization Notes"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        placeholder="Add notes about your optimization goals..."
      />

      {/* Info tooltip */}
      <Box sx={{ mb: 2 }}>
        <Tooltip title="Optimization Info">
          <IconButton color="info">
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Optimization stats card */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" gap={1} alignItems="center">
            <AssessmentIcon color="primary" />
            <SpeedIcon color="success" />
            <MemoryIcon color="info" />
            <BugReportIcon color="error" />
            <ErrorIcon color="error" />
            <WarningIcon color="warning" />
            <InfoIcon color="info" />
            <Typography variant="body2">
              Optimization stats and icons.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Progress bar */}
      <LinearProgress sx={{ mb: 2 }} />

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Button startIcon={<DownloadIcon />} variant="outlined">
          Download
        </Button>
        <Button startIcon={<UploadIcon />} variant="outlined">
          Upload
        </Button>
      </Box>

      {/* Languages info */}
      {languages && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Supported languages: {languages.join(', ')}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Code Editor Section - Wider */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom>
              <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Code Editor
            </Typography>

            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Programming Language</InputLabel>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  label="Programming Language"
                >
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="cpp">C++</MenuItem>
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="go">Go</MenuItem>
                  <MenuItem value="rust">Rust</MenuItem>
                  <MenuItem value="php">PHP</MenuItem>
                  <MenuItem value="ruby">Ruby</MenuItem>
                  <MenuItem value="scala">Scala</MenuItem>
                  <MenuItem value="swift">Swift</MenuItem>
                  <MenuItem value="kotlin">Kotlin</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Optimization Type</InputLabel>
                <Select
                  value={optimizationType}
                  onChange={(e) => setOptimizationType(e.target.value)}
                  label="Optimization Type"
                >
                  <MenuItem value="all">All Optimizations</MenuItem>
                  <MenuItem value="performance">Performance</MenuItem>
                  <MenuItem value="memory">Memory Usage</MenuItem>
                  <MenuItem value="readability">Readability</MenuItem>
                  <MenuItem value="security">Security</MenuItem>
                </Select>
              </FormControl>

              <CodeEditor
                value={code}
                onChange={setCode}
                language={language}
                height="500px"
                width="100%"
                placeholder={`Enter your ${language} code to optimize...`}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={handleSuggestOptimizations}
                disabled={loading || !code.trim()}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <LightbulbIcon />
                }
                sx={{ minWidth: 120 }}
              >
                {loading ? 'Analyzing...' : 'Get Suggestions'}
              </Button>

              <Button
                variant="contained"
                onClick={handleApplyOptimizations}
                disabled={loading || !code.trim()}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <PlayArrowIcon />
                }
                sx={{
                  backgroundColor: '#333',
                  '&:hover': { backgroundColor: '#555' },
                  minWidth: 120,
                }}
              >
                {loading ? 'Optimizing...' : 'Optimize Code'}
              </Button>

              <Button
                variant="outlined"
                onClick={handleClear}
                disabled={loading}
                startIcon={<ClearIcon />}
              >
                Clear
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Optimization Results Section - Wider */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={3} sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom>
              <AutoFixHighIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Optimization Results
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {loading && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Analyzing your code...
                </Typography>
              </Box>
            )}

            {suggestions && !loading && (
              <Accordion defaultExpanded sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LightbulbIcon color="primary" />
                    <Typography variant="h6">
                      Optimization Suggestions
                    </Typography>
                    <Chip
                      label={
                        Array.isArray(suggestions)
                          ? suggestions.length
                          : suggestions.suggestions
                            ? suggestions.suggestions.length
                            : 0
                      }
                      size="small"
                      color="primary"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {Array.isArray(suggestions) ? (
                      suggestions.map((suggestion, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          <ListItemText primary={suggestion} />
                        </ListItem>
                      ))
                    ) : suggestions.suggestions ? (
                      suggestions.suggestions.map((suggestion, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          <ListItemText primary={suggestion} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="No specific suggestions available" />
                      </ListItem>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            )}

            {suggestions?.improvements &&
              Object.keys(suggestions.improvements).length > 0 && (
                <Accordion sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <TrendingUpIcon color="success" />
                      <Typography variant="h6">
                        Expected Improvements
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {Object.entries(suggestions.improvements).map(
                        ([key, value]) => (
                          <ListItem key={key}>
                            <ListItemIcon>
                              <TrendingUpIcon
                                color="success"
                                fontSize="small"
                              />
                            </ListItemIcon>
                            <ListItemText primary={`${key}: ${value}`} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </AccordionDetails>
                </Accordion>
              )}

            {optimizedCode && (
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CodeIcon color="success" />
                    <Typography variant="h6">Optimized Code</Typography>
                    <Chip label="Ready to Copy" size="small" color="success" />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      backgroundColor: '#1e1e1e',
                      color: '#d4d4d4',
                      p: 2,
                      borderRadius: 1,
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      fontSize: '14px',
                      minHeight: '200px',
                      maxHeight: '400px',
                      overflow: 'auto',
                      whiteSpace: 'pre-wrap',
                      border: '1px solid #404040',
                    }}
                  >
                    {typeof optimizedCode === 'string'
                      ? optimizedCode
                      : optimizedCode.optimized_code ||
                        JSON.stringify(optimizedCode, null, 2)}
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          typeof optimizedCode === 'string'
                            ? optimizedCode
                            : optimizedCode.optimized_code ||
                                JSON.stringify(optimizedCode, null, 2)
                        )
                      }
                      startIcon={<ContentCopyIcon />}
                    >
                      Copy Code
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        setCode(
                          typeof optimizedCode === 'string'
                            ? optimizedCode
                            : optimizedCode.optimized_code || ''
                        )
                      }
                      startIcon={<CodeIcon />}
                    >
                      Replace Original
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            )}

            {!suggestions && !optimizedCode && !error && (
              <Box textAlign="center" py={4}>
                <LightbulbIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                <Typography color="textSecondary" gutterBottom>
                  Ready to optimize your code
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Enter your code and click "Get Suggestions" to start
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar?.open || false}
        autoHideDuration={4000}
        onClose={() => setSnackbar?.({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar?.({ ...snackbar, open: false })}
          severity={snackbar?.severity || 'info'}
          sx={{ width: '100%' }}
        >
          {snackbar?.message || 'Optimization notification'}
        </Alert>
      </Snackbar>
    </Container>
  );
}

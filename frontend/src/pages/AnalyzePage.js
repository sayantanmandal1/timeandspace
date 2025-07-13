import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Paper,
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Alert,
  Snackbar,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import {
  PlayArrow,
  Code,
  Language,
  Settings,
  Help,
  Share,
  Download,
  Visibility,
  Speed,
  BugReport,
  TrendingUp,
  Assessment,
  Clear,
  Lightbulb,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Memory,
  Functions as FunctionsIcon,
  Class,
  Memory as MemoryIcon,
} from '@mui/icons-material';
import CodeEditor from '../components/CodeEditor';
import { analyzeCode, health } from '../api';
import StepByStepVisualizer from '../components/StepByStepVisualizer';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import FAANGProblems from '../components/FAANGProblems';
import ASTVisualizer from '../components/ASTVisualizer';
import ComplexityChart from '../components/ComplexityChart';
import OptimizationSuggestions from '../components/OptimizationSuggestions';
import DataStructureVisualizer from '../components/DataStructureVisualizer';

const defaultCode = `def is_palindrome(s):
    # Remove non-alphanumeric characters and convert to lowercase
    s = ''.join(c.lower() for c in s if c.isalnum())
    
    # Use stack to check palindrome
    stack = []
    n = len(s)
    
    # Push first half of characters onto stack
    for i in range(n // 2):
        stack.append(s[i])
    
    # Compare with second half
    start = n // 2 + (1 if n % 2 == 1 else 0)
    for i in range(start, n):
        if stack.pop() != s[i]:
            return False
    
    return True

# Test the function
test_string = "A man, a plan, a canal: Panama"
result = is_palindrome(test_string)
print(f"'{test_string}' is palindrome: {result}")`;

export default function AnalyzePage() {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState('python');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [languages] = useState(['python', 'java', 'javascript', 'cpp', 'c']);
  const [inputSchema, setInputSchema] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [showExamples, setShowExamples] = useState(false);
  const [detectedAlgorithm, setDetectedAlgorithm] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [backendStatus, setBackendStatus] = useState('checking');

  // Check backend status on component mount
  React.useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        await health();
        setBackendStatus('connected');
      } catch (error) {
        setBackendStatus('disconnected');
        setSnackbar({
          open: true,
          message:
            'Backend server is not running. Please start the backend server.',
          severity: 'error',
        });
      }
    };

    checkBackendStatus();
  }, []);

  const detectAlgorithm = (code) => {
    const codeLower = code.toLowerCase();

    if (
      codeLower.includes('sort') ||
      codeLower.includes('bubble') ||
      codeLower.includes('quick') ||
      codeLower.includes('merge') ||
      codeLower.includes('heap')
    ) {
      return 'sorting';
    } else if (
      codeLower.includes('search') ||
      codeLower.includes('binary') ||
      codeLower.includes('linear') ||
      codeLower.includes('find')
    ) {
      return 'searching';
    } else if (
      codeLower.includes('graph') ||
      codeLower.includes('bfs') ||
      codeLower.includes('dfs') ||
      codeLower.includes('traversal')
    ) {
      return 'graph_traversal';
    } else if (
      codeLower.includes('tree') ||
      codeLower.includes('inorder') ||
      codeLower.includes('preorder') ||
      codeLower.includes('postorder')
    ) {
      return 'tree_traversal';
    } else if (
      codeLower.includes('dp') ||
      codeLower.includes('dynamic') ||
      codeLower.includes('memoization')
    ) {
      return 'dynamic_programming';
    } else if (
      codeLower.includes('palindrome') ||
      codeLower.includes('stack') ||
      codeLower.includes('queue')
    ) {
      return 'data_structures';
    }

    return null;
  };

  const handleSelectExample = (exampleCode, exampleLanguage) => {
    setCode(exampleCode);
    setLanguage(exampleLanguage);
    setShowExamples(false);
    setDetectedAlgorithm(detectAlgorithm(exampleCode));
    setSnackbar({
      open: true,
      message: `${exampleLanguage.charAt(0).toUpperCase() + exampleLanguage.slice(1)} example loaded! Click Analyze to visualize.`,
      severity: 'success',
    });
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter some code to analyze.',
        severity: 'warning',
      });
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setInputSchema(null);
    setInputValues({});
    setDetectedAlgorithm(detectAlgorithm(code));
    setActiveTab(0);

    try {
      let inputArr = [];
      if (inputSchema && Array.isArray(inputSchema)) {
        inputArr = inputSchema.map((field) => {
          const value = inputValues[field.name] || '';
          // Try to parse as JSON if it looks like an array or object
          if (value.trim().startsWith('[') || value.trim().startsWith('{')) {
            try {
              return JSON.parse(value);
            } catch {
              return value;
            }
          }
          // Try to parse as number if it's numeric
          if (!isNaN(value) && value !== '') {
            return Number(value);
          }
          return value;
        });
      }

      const res = await analyzeCode({
        code,
        language,
        input_data: inputArr,
        analysis_type: 'full',
      });

      // Check if the response indicates input is required
      const responseError = res.data.error;
      const errorMessage =
        typeof responseError === 'string'
          ? responseError
          : JSON.stringify(responseError);

      if (
        !res.data.success &&
        errorMessage &&
        errorMessage.includes('Input required')
      ) {
        if (res.data.ast_analysis?.input_schema) {
          setInputSchema(res.data.ast_analysis.input_schema);
          setError(
            'Input required for this code. Please provide the required input below.'
          );
          setSnackbar({
            open: true,
            message: 'Input required! Please fill in the input fields below.',
            severity: 'info',
          });
          return;
        }
      }

      // If we have input schema but no input values, show the input form
      if (
        res.data?.ast_analysis?.input_required &&
        res.data?.ast_analysis?.input_schema &&
        inputArr.length === 0
      ) {
        setInputSchema(res.data.ast_analysis.input_schema);
        setError(
          'Input required for this code. Please provide the required input below.'
        );
        setSnackbar({
          open: true,
          message: 'Input required! Please fill in the input fields below.',
          severity: 'info',
        });
        return;
      }

      if (res.data.success) {
        setResult(res.data);
        setSnackbar({
          open: true,
          message: 'Analysis complete! Explore the results below.',
          severity: 'success',
        });
      } else {
        // Handle different types of errors
        const responseError = res.data.error;
        const errorMessage =
          typeof responseError === 'string'
            ? responseError
            : JSON.stringify(responseError);

        if (errorMessage.includes('Input required')) {
          if (res.data.ast_analysis?.input_schema) {
            setInputSchema(res.data.ast_analysis.input_schema);
            setError(
              'Input required for this code. Please provide the required input below.'
            );
            setSnackbar({
              open: true,
              message: 'Input required! Please fill in the input fields below.',
              severity: 'info',
            });
          } else {
            setError(
              'Input required but no schema provided. Please check your code.'
            );
            setSnackbar({
              open: true,
              message: 'Input detection failed. Please check your code.',
              severity: 'error',
            });
          }
        } else {
          setError(errorMessage || 'Analysis failed');
          setSnackbar({
            open: true,
            message: 'Analysis failed. Please check your code and try again.',
            severity: 'error',
          });
        }
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || 'Analysis failed';
      // Ensure error is a string
      setError(
        typeof errorMessage === 'string'
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
      setSnackbar({
        open: true,
        message: 'Analysis failed. Please check your code and try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const shareData = {
      code,
      language,
      input: inputValues,
      result: result,
    };

    const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encodeURIComponent(JSON.stringify(shareData))}`;
    navigator.clipboard.writeText(shareUrl);
    setSnackbar({
      open: true,
      message: 'Share link copied to clipboard!',
      severity: 'success',
    });
    setShowShareDialog(false);
  };

  const handleExport = () => {
    const exportData = {
      code,
      language,
      input: inputValues,
      result: result,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSnackbar({
      open: true,
      message: 'Analysis exported successfully!',
      severity: 'success',
    });
  };

  const handleClear = () => {
    setCode('');
    setError(null);
    setResult(null);
    setInputSchema(null);
    setInputValues({});
    setDetectedAlgorithm(null);
    setActiveTab(0);
    setSnackbar({ open: true, message: 'Code cleared.', severity: 'info' });
  };

  const handleLoadExample = () => {
    const example = FAANGProblems.find((prob) => prob.language === language);
    if (example) {
      setCode(example.code);
      setDetectedAlgorithm(detectAlgorithm(example.code));
      setSnackbar({
        open: true,
        message: `${language.charAt(0).toUpperCase() + language.slice(1)} example loaded! Click Analyze to visualize.`,
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: `No example found for ${language}.`,
        severity: 'warning',
      });
    }
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
        Code Analysis Platform
      </Typography>

      {/* Help banner */}
      <Box display="flex" alignItems="center" mb={2}>
        <Help sx={{ mr: 1 }} color="info" />
        <Typography variant="body2" color="info.main">
          Need help? Click the Help icon for usage instructions.
        </Typography>
      </Box>

      {/* Language info */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Language color="primary" />
        <Typography variant="body2">
          Language selection available above the editor.
        </Typography>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Button startIcon={<PlayArrow />} variant="outlined">
          Quick Run
        </Button>
        <Button startIcon={<Share />} variant="outlined">
          Share
        </Button>
        <Button startIcon={<Download />} variant="outlined">
          Download
        </Button>
        <Button onClick={handleSelectExample} variant="outlined">
          Select Example
        </Button>
        <Button onClick={handleExport} variant="outlined">
          Export
        </Button>
      </Box>

      {/* Backend status */}
      {backendStatus && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Backend status: {backendStatus}
        </Alert>
      )}

      {/* Examples info */}
      {showExamples && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Example codes are shown.
        </Alert>
      )}

      {/* Languages info */}
      {languages && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Supported languages: {languages.join(', ')}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Code Input Section - Wider */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom>
              <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Code Input
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

              <CodeEditor
                value={code}
                onChange={setCode}
                language={language}
                height="600px"
                width="100%"
                placeholder={`Enter your ${language} code here...`}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={handleAnalyze}
                disabled={loading || !code.trim()}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <Assessment />
                }
                sx={{ minWidth: 120 }}
              >
                {loading ? 'Analyzing...' : 'Analyze Code'}
              </Button>

              <Button
                variant="outlined"
                onClick={handleClear}
                disabled={loading}
                startIcon={<Clear />}
              >
                Clear
              </Button>

              <Button
                variant="outlined"
                onClick={handleLoadExample}
                disabled={loading}
                startIcon={<CodeIcon />}
              >
                Load Example
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Results Section - Narrower but still functional */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={3} sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom>
              <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
              Analysis Results
            </Typography>

            {/* Memory info */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Memory color="secondary" />
              <Typography variant="body2">
                Memory usage is analyzed below.
              </Typography>
            </Box>

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

            {result && !loading && (
              <Box>
                {/* Complexity Analysis */}
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Complexity Analysis
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Time Complexity:{' '}
                        {result.complexity_analysis?.time || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Space Complexity:{' '}
                        {result.complexity_analysis?.space || 'N/A'}
                      </Typography>
                    </Box>
                    <ComplexityChart complexity={result.complexity_analysis} />
                  </CardContent>
                </Card>

                {/* Code Structure */}
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Code Structure
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CodeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Lines of Code: ${result.ast_analysis?.lines || 0}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FunctionsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Functions: ${result.ast_analysis?.functions || 0}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Class fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Classes: ${result.ast_analysis?.classes || 0}`}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Performance Metrics
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <SpeedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Execution Time: ${result.execution_trace?.[0]?.performance?.execution_time || 'N/A'}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <MemoryIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Memory Usage: ${result.execution_trace?.[0]?.performance?.memory_usage || 'N/A'}`}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                {result.optimization_suggestions &&
                  result.optimization_suggestions.length > 0 && (
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          <Lightbulb sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Optimization Suggestions
                        </Typography>
                        <List dense>
                          {result.optimization_suggestions.map(
                            (suggestion, index) => (
                              <ListItem key={index}>
                                <ListItemIcon>
                                  <Lightbulb fontSize="small" color="primary" />
                                </ListItemIcon>
                                <ListItemText primary={suggestion} />
                              </ListItem>
                            )
                          )}
                        </List>
                      </CardContent>
                    </Card>
                  )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Input Section */}
      <Grid item xs={12} lg={8}>
        <Paper
          sx={{
            p: 3,
            backgroundColor: '#fff',
            border: '2px solid #e0e0e0',
            borderRadius: 2,
            height: 'fit-content',
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="#333" gutterBottom>
            Input Configuration
          </Typography>

          {inputSchema &&
          Array.isArray(inputSchema) &&
          inputSchema.length > 0 ? (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                This code requires input. Please provide the values below:
              </Alert>
              {inputSchema.map((field, idx) => (
                <TextField
                  key={field.name}
                  label={
                    field.name +
                    (field.type !== 'unknown' ? ` (${field.type})` : '')
                  }
                  value={inputValues[field.name] || ''}
                  onChange={(e) =>
                    setInputValues((v) => ({
                      ...v,
                      [field.name]: e.target.value,
                    }))
                  }
                  fullWidth
                  placeholder={
                    field.example ||
                    (field.type === 'array'
                      ? '[1,2,3]'
                      : field.type === 'number'
                        ? '42'
                        : 'Enter value')
                  }
                  helperText={
                    field.type === 'array'
                      ? 'Enter as JSON array, e.g., [1,2,3]'
                      : field.type === 'number'
                        ? 'Enter a number'
                        : field.type === 'string'
                          ? 'Enter text'
                          : 'Enter value'
                  }
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
              ))}
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => setInputValues({})}
                  disabled={loading}
                  sx={{ flex: 1 }}
                >
                  Clear Input
                </Button>
                <Button
                  variant="contained"
                  onClick={handleAnalyze}
                  disabled={loading}
                  sx={{
                    flex: 2,
                    backgroundColor: '#333',
                    '&:hover': { backgroundColor: '#555' },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    'Analyze with Input'
                  )}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="body2" color="#666" gutterBottom>
                No input required for this code.
              </Typography>
              <Typography variant="body2" color="#666">
                The analyzer will automatically detect if input is needed based
                on your code.
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>

      {/* Error Display */}
      {error && (
        <Paper sx={{ p: 3, mt: 3, backgroundColor: '#fff' }}>
          <Alert severity="error">
            <Typography variant="h6" gutterBottom>
              Analysis Error
            </Typography>
            <Typography>{error}</Typography>
          </Alert>
        </Paper>
      )}

      {/* Results Section */}
      {result && !loading && !error && (
        <Paper sx={{ p: 3, mt: 3, backgroundColor: '#fff' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Typography variant="h5" fontWeight="bold" color="#333">
              Analysis Results
            </Typography>
            <Box display="flex" gap={1}>
              <Chip
                label={`Algorithm: ${detectedAlgorithm || 'General'}`}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`Language: ${language}`}
                color="secondary"
                variant="outlined"
              />
            </Box>
          </Box>

          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            sx={{
              mb: 3,
              '& .MuiTab-root': {
                color: '#666',
                '&.Mui-selected': { color: '#333' },
              },
            }}
          >
            <Tab label="Step-by-Step Execution" icon={<Visibility />} />
            <Tab label="AST Analysis" icon={<Code />} />
            <Tab label="Complexity Analysis" icon={<TrendingUp />} />
            {detectedAlgorithm && (
              <Tab label="Algorithm Visualization" icon={<Speed />} />
            )}
            <Tab label="Data Structures" icon={<BugReport />} />
            <Tab label="Optimizations" icon={<Settings />} />
          </Tabs>

          {activeTab === 0 && (
            <StepByStepVisualizer trace={result.execution_trace} code={code} />
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                AST Analysis
              </Typography>
              <ASTVisualizer ast={result.ast_analysis?.ast} />
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Complexity Analysis
              </Typography>
              <ComplexityChart complexity={result.complexity_analysis} />
            </Box>
          )}

          {activeTab === 3 && detectedAlgorithm && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Algorithm Visualization
              </Typography>
              <AlgorithmVisualizer
                algorithmType={detectedAlgorithm}
                data={result.execution_trace}
                trace={result.execution_trace}
              />
            </Box>
          )}

          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Data Structures
              </Typography>
              <DataStructureVisualizer
                dataStructures={
                  result.execution_trace?.[0]?.data_structures || {}
                }
              />
            </Box>
          )}

          {activeTab === (detectedAlgorithm ? 5 : 4) && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Optimization Suggestions
              </Typography>
              <OptimizationSuggestions
                suggestions={result.optimization_suggestions}
              />
            </Box>
          )}
        </Paper>
      )}

      {/* Onboarding Dialog */}
      <Dialog
        open={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Welcome to DSA Code Visualizer
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom color="#333">
            How to use this powerful tool:
          </Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>Write or paste your code</strong> in the large code editor
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>Select your programming language</strong> (Python, Java,
              C++, etc.)
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>Click "Analyze Code"</strong> to start the visualization
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>If input is required</strong>, the system will
              automatically detect and prompt you
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>Explore the results</strong> through multiple tabs:
              step-by-step execution, AST, complexity, and more
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom color="#333">
            Key Features:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>Step-by-step execution</strong> with variable tracking and
              data structure visualization
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>Algorithm detection</strong> and specialized
              visualizations for sorting, searching, graphs, etc.
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>Complexity analysis</strong> with time and space
              complexity estimates
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>FAANG-ready examples</strong> with real interview problems
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              <strong>Share and export</strong> your analysis results
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowOnboarding(false)}
            variant="contained"
            sx={{
              backgroundColor: '#333',
              '&:hover': { backgroundColor: '#555' },
            }}
          >
            Get Started
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Dialog */}
      <Dialog
        open={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Share Analysis</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Share your code analysis with others. The link will include your
            code, input, and results.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowShareDialog(false)}>Cancel</Button>
          <Button
            onClick={handleShare}
            variant="contained"
            sx={{
              backgroundColor: '#333',
              '&:hover': { backgroundColor: '#555' },
            }}
          >
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

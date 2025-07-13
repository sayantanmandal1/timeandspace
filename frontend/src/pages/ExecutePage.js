import React, { useState } from 'react';
import { useNotification } from '../components/NotificationToast';
import {
  Box,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Alert,

  Chip,
  Grid,
  Container,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  PlayArrow,
  Download,
  Upload,
  Language,
  Code as CodeIcon,
  Clear as ClearIcon,
  Assessment as AssessmentIcon,
  Speed as SpeedIcon,
  Timer as TimerIcon,
  Memory as MemoryIcon,
  Settings as SettingsIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import CodeEditor from '../components/CodeEditor';
import { executeCode } from '../api';

const defaultCode = `# Welcome to Code Execution
# Write your code here and click Run to execute it

print("Hello, World!")

# Example: Calculate factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(f"Factorial of 5: {factorial(5)}")

# Example: Simple list operations
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(f"Numbers: {numbers}")
print(f"Squares: {squares}")`;

export default function ExecutePage() {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [exitCode, setExitCode] = useState(null);
  const [languages] = useState(['python', 'java', 'javascript', 'cpp', 'c']);
  const { success, error: showError, warning, info } = useNotification();

  const handleExecute = async () => {
    if (!code.trim()) {
      warning('Please enter some code to execute.');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');
    setExecutionTime(null);
    setMemoryUsage(null);
    setExitCode(null);

    try {
      const startTime = performance.now();
      const response = await executeCode({
        code,
        language,
        input_data: [],
        timeout: 30,
      });

      const endTime = performance.now();
      const executionTime = ((endTime - startTime) / 1000).toFixed(2);

      if (response.data.success) {
        setOutput(response.data.output || '');
        setExecutionTime(response.data.execution_time || executionTime);
        setMemoryUsage(response.data.memory_usage || null);
        setExitCode(response.data.exit_code || null);
        success('Code executed successfully!');
      } else {
        const responseError = response.data.error;
        const errorMessage =
          typeof responseError === 'string'
            ? responseError
            : JSON.stringify(responseError);
        setError(errorMessage || 'Execution failed');
        showError('Code execution failed. Check the error output.');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Execution failed');
      showError('Execution failed. Please check your code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode('');
    setOutput('');
    setError('');
    setExecutionTime(null);
    setMemoryUsage(null);
    setExitCode(null);
    info('Code editor cleared.');
  };

  const handleReset = () => {
    setCode(defaultCode);
    setOutput('');
    setError('');
    setExecutionTime(null);
    setMemoryUsage(null);
    setExitCode(null);
    info('Reset to default code.');
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language}`;
    a.click();
    URL.revokeObjectURL(url);
    success('Code downloaded successfully!');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
        success('File uploaded successfully!');
      };
      reader.readAsText(file);
    }
  };

  const handleLoadExample = () => {
    setCode(defaultCode);
    info('Example code loaded.');
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
        Code Execution Platform
      </Typography>

      {/* Language info */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Language color="primary" />
        <Typography variant="body2">
          Language selection available above the editor.
        </Typography>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Button startIcon={<Download />} variant="outlined">
          Download
        </Button>
        <Button startIcon={<Upload />} variant="outlined">
          Upload
        </Button>
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
        <Button onClick={handleDownload} variant="outlined">
          Download Code
        </Button>
        <Button onClick={handleFileUpload} variant="outlined">
          Upload File
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

              <CodeEditor
                value={code}
                onChange={setCode}
                language={language}
                height="500px"
                width="100%"
                placeholder={`Enter your ${language} code here...`}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={handleExecute}
                disabled={loading || !code.trim()}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <PlayArrow />
                }
                sx={{ minWidth: 120 }}
              >
                {loading ? 'Executing...' : 'Execute Code'}
              </Button>

              <Button
                variant="outlined"
                onClick={handleClear}
                disabled={loading}
                startIcon={<ClearIcon />}
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

        {/* Output Section - Wider */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={3} sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom>
              <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Execution Output
            </Typography>

            {/* Execution stats icons */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <SpeedIcon color="primary" />
              <TimerIcon color="secondary" />
              <MemoryIcon color="success" />
              <SettingsIcon color="info" />
              <ErrorIcon color="error" />
              <Typography variant="body2">Execution stats icons.</Typography>
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
                  Executing your code...
                </Typography>
              </Box>
            )}

            {output && !loading && (
              <Box>
                {/* Output */}
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    borderRadius: 1,
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                    fontSize: '14px',
                    minHeight: '100px',
                    maxHeight: '200px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {output}
                </Paper>

                {/* Execution Stats */}
                <Box display="flex" gap={2} mb={2}>
                  {executionTime !== null && (
                    <Chip
                      icon={<TimerIcon />}
                      label={`${executionTime}ms`}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {memoryUsage !== null && (
                    <Chip
                      icon={<MemoryIcon />}
                      label={`${memoryUsage}MB`}
                      color="secondary"
                      variant="outlined"
                    />
                  )}
                  {exitCode !== null && (
                    <Chip
                      icon={<ErrorIcon />}
                      label={`Exit: ${exitCode}`}
                      color={exitCode === 0 ? 'success' : 'error'}
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>


    </Container>
  );
}

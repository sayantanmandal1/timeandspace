import React, { useState } from 'react';
import { useNotification } from '../components/NotificationToast';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,

  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add,
  Delete,
  Visibility,
  PlayArrow,
  Clear as ClearIcon,
  FileUpload as FileUploadIcon,
  Code as CodeIcon,
  Download as DownloadIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { analyzeCode } from '../api';
import CodeEditor from '../components/CodeEditor';

export default function BatchPage() {
  const [codeSnippets, setCodeSnippets] = useState([
    {
      id: 1,
      name: 'Sample 1',
      code: 'print("Hello World")',
      language: 'python',
      result: null,
      status: 'pending',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [error, setError] = useState(null);
  const { success, warning, info } = useNotification();
  const [batchResults, setBatchResults] = useState([]);

  const addCodeSnippet = () => {
    const newId = Math.max(...codeSnippets.map((s) => s.id), 0) + 1;
    setCodeSnippets([
      ...codeSnippets,
      {
        id: newId,
        name: `Code ${newId}`,
        code: '',
        language: 'python',
        result: null,
        status: 'pending',
      },
    ]);
  };

  const removeCodeSnippet = (index) => {
    setCodeSnippets(codeSnippets.filter((_, i) => i !== index));
  };

  const updateSnippet = (index, field, value) => {
    setCodeSnippets(
      codeSnippets.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const handleBatchAnalysis = async () => {
    if (codeSnippets.length === 0) {
      warning('No code snippets to analyze.');
      return;
    }

    setLoading(true);
    setError(null);
    setBatchResults([]);

    const results = [];

    for (let i = 0; i < codeSnippets.length; i++) {
      const snippet = codeSnippets[i];
      if (!snippet.code.trim()) {
        updateSnippet(i, 'status', 'skipped');
        updateSnippet(i, 'result', { error: 'Empty code snippet' });
        results.push({
          id: snippet.id,
          name: snippet.name,
          language: snippet.language,
          status: 'skipped',
          result: { error: 'Empty code snippet' },
        });
        continue;
      }

      updateSnippet(i, 'status', 'analyzing');

      try {
        const response = await analyzeCode({
          code: snippet.code,
          language: snippet.language,
          input_data: [],
          analysis_type: 'full',
        });

        if (response.data.success) {
          updateSnippet(i, 'status', 'completed');
          updateSnippet(i, 'result', response.data);
          results.push({
            id: snippet.id,
            name: snippet.name,
            language: snippet.language,
            status: 'completed',
            result: response.data,
          });
        } else {
          const responseError = response.data.error;
          const errorMessage =
            typeof responseError === 'string'
              ? responseError
              : JSON.stringify(responseError);
          updateSnippet(i, 'status', 'failed');
          updateSnippet(i, 'result', { error: errorMessage });
          results.push({
            id: snippet.id,
            name: snippet.name,
            language: snippet.language,
            status: 'failed',
            result: { error: errorMessage },
          });
        }
      } catch (error) {
        const errorMessage = error.message || 'Unknown error occurred';
        updateSnippet(i, 'status', 'failed');
        updateSnippet(i, 'result', { error: errorMessage });
        results.push({
          id: snippet.id,
          name: snippet.name,
          language: snippet.language,
          status: 'failed',
          result: { error: errorMessage },
        });
      }
    }

    setLoading(false);
    setBatchResults(results);
    success('Batch analysis completed!');
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newId = Math.max(...codeSnippets.map((s) => s.id), 0) + 1 + index;
        const language = getLanguageFromExtension(file.name);

        setCodeSnippets((prev) => [
          ...prev,
          {
            id: newId,
            name: file.name,
            code: e.target.result,
            language: language,
            result: null,
            status: 'pending',
          },
        ]);
      };
      reader.readAsText(file);
    });

    success(`${files.length} file(s) uploaded successfully!`);
  };

  const getLanguageFromExtension = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const languageMap = {
      py: 'python',
      java: 'java',
      js: 'javascript',
      cpp: 'cpp',
      c: 'c',
      cs: 'csharp',
      php: 'php',
      rb: 'ruby',
      go: 'go',
      rs: 'rust',
    };
    return languageMap[ext] || 'python';
  };

  const handleExportResults = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      total_snippets: codeSnippets.length,
      results: codeSnippets.map((s) => ({
        id: s.id,
        name: s.name,
        language: s.language,
        status: s.status,
        result: s.result,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    success('Results exported successfully!');
  };

  const clearAll = () => {
    setCodeSnippets([]);
    info('All snippets cleared.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'analyzing':
        return 'warning';
      case 'skipped':
        return 'default';
      default:
        return 'default';
    }
  };

  const getAverageComplexity = () => {
    const complexities = batchResults
      .filter((r) => r.result?.complexity_analysis?.time_complexity)
      .map((r) => r.result.complexity_analysis.time_complexity);

    if (complexities.length === 0) return 'N/A';

    const sum = complexities.reduce((acc, curr) => acc + parseFloat(curr), 0);
    return (sum / complexities.length).toFixed(2);
  };

  const completedCount = codeSnippets.filter(
    (s) => s.status === 'completed'
  ).length;
  const failedCount = codeSnippets.filter((s) => s.status === 'failed').length;
  const pendingCount = codeSnippets.filter(
    (s) => s.status === 'pending'
  ).length;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Batch Code Analysis Platform
      </Typography>

      <Grid container spacing={3}>
        {/* Code Snippets Section - Wider */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom>
              <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Code Snippets
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <Button
                  variant="outlined"
                  onClick={addCodeSnippet}
                  startIcon={<Add />}
                  disabled={loading}
                >
                  Add Code Snippet
                </Button>

                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<FileUploadIcon />}
                  disabled={loading}
                >
                  Upload Files
                  <input
                    type="file"
                    hidden
                    multiple
                    accept=".py,.java,.js,.cpp,.c,.go,.rs,.php,.rb,.scala,.swift,.kt,.txt"
                    onChange={handleFileUpload}
                  />
                </Button>

                <Button
                  variant="outlined"
                  onClick={clearAll}
                  disabled={loading || codeSnippets.length === 0}
                  startIcon={<ClearIcon />}
                >
                  Clear All
                </Button>
              </Box>

              {/* Status info */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Failed: {failedCount}, Pending: {pendingCount}
                </Typography>
                {getStatusColor && (
                  <Box sx={{ display: 'none' }}>
                    {getStatusColor('success')}
                  </Box>
                )}
              </Box>

              {codeSnippets.map((snippet, index) => (
                <Card key={snippet.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">
                        Code Snippet {index + 1}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <InputLabel>Language</InputLabel>
                          <Select
                            value={snippet.language}
                            onChange={(e) =>
                              updateSnippet(index, 'language', e.target.value)
                            }
                            label="Language"
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

                        <TextField
                          size="small"
                          label="Name"
                          value={snippet.name}
                          onChange={(e) =>
                            updateSnippet(index, 'name', e.target.value)
                          }
                          sx={{ minWidth: 150 }}
                        />

                        <IconButton
                          onClick={() => removeCodeSnippet(index)}
                          disabled={loading}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          onClick={() => setSelectedSnippet(snippet)}
                          disabled={loading}
                          color="info"
                        >
                          <Visibility />
                        </IconButton>
                      </Box>
                    </Box>

                    <CodeEditor
                      value={snippet.code}
                      onChange={(value) => updateSnippet(index, 'code', value)}
                      language={snippet.language}
                      height="300px"
                      width="100%"
                      placeholder={`Enter your ${snippet.language} code here...`}
                    />
                  </CardContent>
                </Card>
              ))}

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={handleBatchAnalysis}
                  disabled={
                    loading ||
                    codeSnippets.length === 0 ||
                    !codeSnippets.some((s) => s.code.trim())
                  }
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <PlayArrow />
                  }
                  sx={{ minWidth: 120 }}
                >
                  {loading ? 'Analyzing...' : 'Start Batch Analysis'}
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleExportResults}
                  disabled={completedCount === 0}
                  startIcon={<DownloadIcon />}
                >
                  Export Results
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Results Section - Wider */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={3} sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom>
              <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Batch Results
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
                  Analyzing {codeSnippets.length} code snippets...
                </Typography>
              </Box>
            )}

            {batchResults.length > 0 && !loading && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Analysis Summary
                </Typography>

                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Language</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Complexity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {batchResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.name}</TableCell>
                          <TableCell>{result.language}</TableCell>
                          <TableCell>
                            <Chip
                              label={result.status}
                              color={
                                result.status === 'completed'
                                  ? 'success'
                                  : result.status === 'failed'
                                    ? 'error'
                                    : 'warning'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {result.result?.complexity_analysis
                              ?.time_complexity ? (
                              <Typography variant="body2">
                                O(
                                {
                                  result.result.complexity_analysis
                                    .time_complexity
                                }
                                )
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="textSecondary">
                                N/A
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Summary Statistics
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Completed: ${batchResults.filter((r) => r.status === 'completed').length}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ErrorIcon color="error" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Failed: ${batchResults.filter((r) => r.status === 'failed').length}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SpeedIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Average Complexity: ${getAverageComplexity()}`}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            )}

            {!batchResults.length && !loading && !error && (
              <Box textAlign="center" py={4}>
                <AssessmentIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                <Typography color="textSecondary" gutterBottom>
                  Ready for batch analysis
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Add code snippets and click "Start Batch Analysis" to get
                  started
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Detail Dialog */}
      <Dialog
        open={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Analysis Details: {selectedSnippet?.name}</DialogTitle>
        <DialogContent dividers>
          {selectedSnippet && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Code:
              </Typography>
              <CodeEditor
                value={selectedSnippet.code}
                onChange={() => {}}
                language={selectedSnippet.language}
                theme="monokai"
                height="300px"
                readOnly
              />

              {selectedSnippet.result && (
                <Box mt={3}>
                  <Typography variant="h6" gutterBottom>
                    Results:
                  </Typography>
                  <pre
                    style={{
                      backgroundColor: '#f5f5f5',
                      padding: '16px',
                      borderRadius: '4px',
                      overflow: 'auto',
                      maxHeight: '400px',
                    }}
                  >
                    {JSON.stringify(selectedSnippet.result, null, 2)}
                  </pre>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetailDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>


    </Container>
  );
}

import axios from 'axios';

const API_BASE =
  process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/v1';

// Create axios instance with better error handling
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response?.status === 0) {
      throw new Error(
        'Backend server is not running. Please start the backend server.'
      );
    }

    if (error.response?.status === 404) {
      throw new Error(
        'API endpoint not found. Please check the backend configuration.'
      );
    }

    if (error.response?.status >= 500) {
      throw new Error('Backend server error. Please check the server logs.');
    }

    // Ensure we always throw a string error message
    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      'An unknown error occurred';
    throw new Error(
      typeof errorMessage === 'string'
        ? errorMessage
        : JSON.stringify(errorMessage)
    );
  }
);

export const analyzeCode = (data) => apiClient.post('/analysis/analyze', data);
export const batchAnalyzeCode = (data) =>
  apiClient.post('/analysis/batch-analyze', data);
export const getAstAnalysis = (id) => apiClient.get(`/analysis/ast/${id}`);
export const getComplexityAnalysis = (id) =>
  apiClient.get(`/analysis/complexity/${id}`);
export const getVisualization = (id) =>
  apiClient.get(`/analysis/visualization/${id}`);

export const executeCode = (data) => apiClient.post('/execution/execute', data);
export const testCode = (data) => apiClient.post('/execution/test', data);

export const suggestOptimizations = (data) =>
  apiClient.post('/optimization/suggest', data);
export const applyOptimizations = (data) =>
  apiClient.post('/optimization/apply', data);

export const getSupportedLanguages = () =>
  apiClient.get('/languages/supported');
export const getLanguageInfo = (lang) => apiClient.get(`/languages/${lang}`);
export const getLanguageExtensions = (lang) =>
  apiClient.get(`/languages/${lang}/extensions`);
export const getLanguageExecutor = (lang) =>
  apiClient.get(`/languages/${lang}/executor`);

export const health = () => apiClient.get('/health/');
export const healthDetailed = () => apiClient.get('/health/detailed');
export const healthReady = () => apiClient.get('/health/ready');
export const healthLive = () => apiClient.get('/health/live');

import React from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { Error, Refresh, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.setState({
      error,
      errorInfo,
      errorId,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // In production, you would send this to your error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
          onReset={() =>
            this.setState({ hasError: false, error: null, errorInfo: null })
          }
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, errorInfo, errorId, onReset }) {
  const navigate = useNavigate();

  const handleReset = () => {
    onReset();
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
    onReset();
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Error sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />

        <Typography variant="h4" gutterBottom fontWeight={600}>
          Oops! Something went wrong
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          We're sorry, but something unexpected happened. Our team has been
          notified.
        </Typography>

        {errorId && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 3, display: 'block' }}
          >
            Error ID: {errorId}
          </Typography>
        )}

        {process.env.NODE_ENV === 'development' && error && (
          <Box sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="h6" gutterBottom>
              Error Details (Development Only):
            </Typography>
            <Paper
              sx={{
                p: 2,
                backgroundColor: 'grey.100',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }}
            >
              <Typography
                variant="body2"
                component="pre"
                sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
              >
                {error.toString()}
              </Typography>
              {errorInfo && (
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    mt: 2,
                  }}
                >
                  {errorInfo.componentStack}
                </Typography>
              )}
            </Paper>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleReset}
            sx={{ minWidth: 120 }}
          >
            Try Again
          </Button>

          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={handleGoHome}
            sx={{ minWidth: 120 }}
          >
            Go Home
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          If this problem persists, please contact our support team.
        </Typography>
      </Paper>
    </Container>
  );
}

export default ErrorBoundary;

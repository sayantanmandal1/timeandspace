import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Email,
  School,
  AutoAwesome,
  ArrowBack,
  CheckCircle,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../components/NotificationToast';

export default function ForgotPasswordPage() {
  const { forgotPassword, loading } = useAuth();
  const { error: showError } = useNotification();
  
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validateEmail = () => {
    if (!email) {
      setErrors({ email: 'Email is required' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Email is invalid' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setEmailSent(true);
      }
    } catch (err) {
      showError('Failed to send reset email. Please try again.');
    }
  };

  if (emailSent) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <School sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
            <Typography variant="h4" component="h1" fontWeight={700}>
              DSA Visualizer Pro
            </Typography>
          </Box>
        </Box>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          
          <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
            Check Your Email
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We've sent a password reset link to <strong>{email}</strong>
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              If you don't see the email, check your spam folder. The link will expire in 1 hour.
            </Typography>
          </Alert>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              component={Link}
              to="/login"
              fullWidth
            >
              Back to Login
            </Button>
            
            <Button
              variant="text"
              onClick={() => {
                setEmailSent(false);
                setEmail('');
              }}
            >
              Try a different email
            </Button>
          </Box>
        </Paper>

        {/* Help Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom textAlign="center" fontWeight={600}>
            Need Help?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Card sx={{ minWidth: 200, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  📧 Check Spam
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reset emails sometimes go to spam folders
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 200, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  ⏰ Link Expires
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reset links are valid for 1 hour only
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 200, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  🔒 Secure Process
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your password is never sent via email
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <School sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
          <Typography variant="h4" component="h1" fontWeight={700}>
            DSA Visualizer Pro
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Reset your password to continue learning
        </Typography>
        <Chip
          icon={<AutoAwesome />}
          label="AI-Powered Learning Platform"
          color="primary"
          variant="outlined"
          sx={{ mt: 1 }}
        />
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom textAlign="center" fontWeight={600}>
          Forgot Password?
        </Typography>
        
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <Email color="action" sx={{ mr: 1 }} />
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mb: 3, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Remember your password?{' '}
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography
                component="span"
                variant="body2"
                color="primary"
                sx={{ fontWeight: 600, cursor: 'pointer' }}
              >
                Sign in here
              </Typography>
            </Link>
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography
                component="span"
                variant="body2"
                color="primary"
                sx={{ fontWeight: 600, cursor: 'pointer' }}
              >
                Sign up here
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>

      {/* Security Info */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom textAlign="center" fontWeight={600}>
          Password Reset Security
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Card sx={{ minWidth: 200, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                🔐 Secure
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We never store or send your actual password
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                ⚡ Fast
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reset links are sent instantly to your email
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                🛡️ Safe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Links expire automatically for your security
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
} 
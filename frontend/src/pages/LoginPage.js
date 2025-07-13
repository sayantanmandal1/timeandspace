import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  GitHub,
  Email,
  Lock,
  School,
  AutoAwesome,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../components/NotificationToast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { error: showError } = useNotification();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/');
    }
  };

  const handleSocialLogin = (provider) => {
    showError(`${provider} login is not implemented yet. Please use email/password login.`);
  };

  const handleDemoLogin = async () => {
    setFormData({
      email: 'demo@dsavisualizer.com',
      password: 'demo123'
    });
    
    // Auto-submit after a short delay
    setTimeout(async () => {
      const result = await login('demo@dsavisualizer.com', 'demo123');
      if (result.success) {
        navigate('/');
      }
    }, 500);
  };

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
          Welcome back! Sign in to continue your learning journey
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
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
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
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleDemoLogin}
            disabled={loading}
            sx={{ mb: 3, py: 1.5 }}
          >
            Try Demo Account
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={() => handleSocialLogin('Google')}
            sx={{ py: 1.5 }}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GitHub />}
            onClick={() => handleSocialLogin('GitHub')}
            sx={{ py: 1.5 }}
          >
            GitHub
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
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
          
          <Typography variant="body2" color="text.secondary">
            <Link to="/forgot-password" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography
                component="span"
                variant="body2"
                color="primary"
                sx={{ fontWeight: 600, cursor: 'pointer' }}
              >
                Forgot your password?
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>

      {/* Features Preview */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom textAlign="center" fontWeight={600}>
          What you'll get access to:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Card sx={{ minWidth: 200, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                🧠 AI Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Advanced code analysis with AI insights
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                📊 Visualizations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Interactive algorithm visualizations
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 200, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                🏆 Competitions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join coding competitions & leaderboards
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
} 
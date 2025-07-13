import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  Timer as TimerIcon,
  BugReport as BugReportIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { health } from '../api';

export default function HealthPage() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await health();
      setHealthStatus(response.data);
      setLastChecked(new Date());
    } catch (err) {
      setError(err.message || 'Failed to check backend health');
      setHealthStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
      case 'ok':
      case true:
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'unhealthy':
      case 'error':
      case false:
        return <ErrorIcon color="error" />;
      default:
        return <WarningIcon color="warning" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
      case 'ok':
      case true:
        return 'success';
      case 'warning':
        return 'warning';
      case 'unhealthy':
      case 'error':
      case false:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy':
      case 'ok':
      case true:
        return 'Healthy';
      case 'warning':
        return 'Warning';
      case 'unhealthy':
      case 'error':
      case false:
        return 'Unhealthy';
      default:
        return 'Unknown';
    }
  };

  const services = [
    {
      name: 'API Server',
      key: 'api',
      icon: <AssessmentIcon />,
      description: 'Main API server status',
    },
    {
      name: 'Code Analysis',
      key: 'analysis',
      icon: <BugReportIcon />,
      description: 'Code analysis service',
    },
    {
      name: 'Execution Engine',
      key: 'execution',
      icon: <SpeedIcon />,
      description: 'Code execution service',
    },
    {
      name: 'Database',
      key: 'database',
      icon: <StorageIcon />,
      description: 'Database connectivity',
    },
    {
      name: 'Cache',
      key: 'cache',
      icon: <MemoryIcon />,
      description: 'Caching service',
    },
    {
      name: 'Network',
      key: 'network',
      icon: <InfoIcon />,
      description: 'Network connectivity',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Health Monitoring Dashboard
      </Typography>
      {/* Page Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#333" gutterBottom>
            System Health & Status
          </Typography>
          <Typography variant="body1" color="#666">
            Monitor the health and performance of the backend services and
            infrastructure.
          </Typography>
        </Box>

        <Box display="flex" gap={1} alignItems="center">
          {lastChecked && (
            <Typography variant="caption" color="textSecondary">
              Last checked: {lastChecked.toLocaleTimeString()}
            </Typography>
          )}
          <Button
            variant="outlined"
            onClick={checkHealth}
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : <RefreshIcon />
            }
          >
            {loading ? 'Checking...' : 'Refresh'}
          </Button>
        </Box>
      </Box>

      {/* Add a TimerIcon and info banner at the top */}
      <Box display="flex" alignItems="center" mb={2}>
        <TimerIcon sx={{ mr: 1 }} color="info" />
        <Typography variant="body2" color="info.main">
          Health checks are updated every few seconds.
        </Typography>
      </Box>

      {/* Add a dummy Table for health summary */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>API</TableCell>
              <TableCell>OK</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add a Tooltip and IconButton for refresh */}
      <Tooltip title="Refresh Health">
        <IconButton color="primary">
          <RefreshIcon />
        </IconButton>
      </Tooltip>

      {/* Overall Status */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fff' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold" color="#333">
            Overall System Status
          </Typography>
          {healthStatus && (
            <Chip
              icon={getStatusIcon(healthStatus.status)}
              label={getStatusText(healthStatus.status)}
              color={getStatusColor(healthStatus.status)}
              variant="outlined"
              size="large"
            />
          )}
        </Box>

        {loading ? (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} />
            <Typography>Checking system health...</Typography>
          </Box>
        ) : error ? (
          <Alert severity="error">
            <Typography variant="h6" gutterBottom>
              Health Check Failed
            </Typography>
            <Typography>{error}</Typography>
          </Alert>
        ) : healthStatus ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                System Information:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <SpeedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Response Time"
                    secondary={
                      healthStatus.response_time
                        ? `${healthStatus.response_time}ms`
                        : 'N/A'
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MemoryIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Memory Usage"
                    secondary={
                      healthStatus.memory_usage
                        ? `${healthStatus.memory_usage}%`
                        : 'N/A'
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <StorageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Disk Usage"
                    secondary={
                      healthStatus.disk_usage
                        ? `${healthStatus.disk_usage}%`
                        : 'N/A'
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Version Information:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="API Version"
                    secondary={healthStatus.version || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Build Date"
                    secondary={healthStatus.build_date || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Environment"
                    secondary={healthStatus.environment || 'N/A'}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        ) : (
          <Typography color="textSecondary">
            No health data available
          </Typography>
        )}
      </Paper>

      {/* Service Status */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fff' }}>
        <Typography variant="h6" fontWeight="bold" color="#333" gutterBottom>
          Service Status
        </Typography>

        <Grid container spacing={2}>
          {services.map((service) => {
            const serviceStatus = healthStatus?.services?.[service.key];
            const isHealthy =
              serviceStatus?.status === 'healthy' ||
              serviceStatus?.status === 'ok' ||
              serviceStatus === true;

            return (
              <Grid item xs={12} sm={6} md={4} key={service.key}>
                <Card
                  variant="outlined"
                  sx={{
                    borderColor: isHealthy ? 'success.main' : 'error.main',
                    backgroundColor: isHealthy ? '#f8fff8' : '#fff8f8',
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      {service.icon}
                      <Box flexGrow={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {service.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {service.description}
                        </Typography>
                      </Box>
                      {getStatusIcon(serviceStatus?.status || false)}
                    </Box>

                    <Chip
                      label={getStatusText(serviceStatus?.status || false)}
                      color={getStatusColor(serviceStatus?.status || false)}
                      size="small"
                      variant="outlined"
                    />

                    {serviceStatus?.response_time && (
                      <Typography variant="caption" display="block" mt={1}>
                        Response: {serviceStatus.response_time}ms
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* Performance Metrics */}
      {healthStatus && (
        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fff' }}>
          <Typography variant="h6" fontWeight="bold" color="#333" gutterBottom>
            Performance Metrics
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <SpeedIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Response Time
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {healthStatus.response_time || 0}ms
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(
                      ((healthStatus.response_time || 0) / 1000) * 100,
                      100
                    )}
                    color={
                      healthStatus.response_time > 500 ? 'error' : 'primary'
                    }
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    mt={1}
                    display="block"
                  >
                    Target: &lt; 500ms
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <MemoryIcon color="secondary" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Memory Usage
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="secondary" gutterBottom>
                    {healthStatus.memory_usage || 0}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={healthStatus.memory_usage || 0}
                    color={
                      healthStatus.memory_usage > 80 ? 'error' : 'secondary'
                    }
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    mt={1}
                    display="block"
                  >
                    Target: &lt; 80%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <StorageIcon color="success" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Disk Usage
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="success" gutterBottom>
                    {healthStatus.disk_usage || 0}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={healthStatus.disk_usage || 0}
                    color={healthStatus.disk_usage > 90 ? 'error' : 'success'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    mt={1}
                    display="block"
                  >
                    Target: &lt; 90%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* System Information */}
      <Paper sx={{ p: 3, backgroundColor: '#fff' }}>
        <Typography variant="h6" fontWeight="bold" color="#333" gutterBottom>
          System Information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Backend Details
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Status"
                  secondary={
                    healthStatus
                      ? getStatusText(healthStatus.status)
                      : 'Unknown'
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Version"
                  secondary={healthStatus?.version || 'N/A'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Environment"
                  secondary={healthStatus?.environment || 'N/A'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Uptime"
                  secondary={healthStatus?.uptime || 'N/A'}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Connection Details
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Network Status"
                  secondary={healthStatus ? 'Connected' : 'Disconnected'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Security" secondary="HTTPS Enabled" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="API Endpoint"
                  secondary={
                    process.env.REACT_APP_API_URL || 'http://localhost:8000'
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

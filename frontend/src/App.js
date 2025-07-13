import React, { useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  Box,
  ThemeProvider,
  createTheme,
  Divider,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Chip,
} from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';
import NotificationProvider from './components/NotificationToast';
import LoadingSpinner from './components/LoadingSpinner';
import {
  Home,
  Code,
  PlayArrow,
  TrendingUp,
  Language,
  HealthAndSafety,
  Assessment,
  DarkMode,
  LightMode,
  Notifications,
  AccountCircle,
  School,
  EmojiEvents,
  Group,
  Analytics,
  Psychology,
  AutoAwesome,
  RocketLaunch,
} from '@mui/icons-material';
import AnalyzePage from './pages/AnalyzePage';
import BatchPage from './pages/BatchPage';
import ExecutePage from './pages/ExecutePage';
import OptimizationPage from './pages/OptimizationPage';
import LanguagesPage from './pages/LanguagesPage';
import HealthPage from './pages/HealthPage';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';
import CompetitionPage from './pages/CompetitionPage';
import CommunityPage from './pages/CommunityPage';
import AnalyticsPage from './pages/AnalyticsPage';

const drawerWidth = 280;

// Create dynamic theme with dark mode support
const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#64B5F6' : '#1976D2',
        light: mode === 'dark' ? '#90CAF9' : '#42A5F5',
        dark: mode === 'dark' ? '#1976D2' : '#1565C0',
      },
      secondary: {
        main: mode === 'dark' ? '#FFB74D' : '#FF9800',
        light: mode === 'dark' ? '#FFCC02' : '#FFB74D',
        dark: mode === 'dark' ? '#F57C00' : '#F57C00',
      },
      background: {
        default: mode === 'dark' ? '#0A0A0A' : '#FAFAFA',
        paper: mode === 'dark' ? '#1A1A1A' : '#FFFFFF',
        elevated: mode === 'dark' ? '#2A2A2A' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
        secondary: mode === 'dark' ? '#B0B0B0' : '#666666',
      },
      divider: mode === 'dark' ? '#333333' : '#E0E0E0',
      success: {
        main: '#4CAF50',
        light: '#81C784',
        dark: '#388E3C',
      },
      warning: {
        main: '#FF9800',
        light: '#FFB74D',
        dark: '#F57C00',
      },
      error: {
        main: '#F44336',
        light: '#E57373',
        dark: '#D32F2F',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        fontSize: '2.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 700,
        fontSize: '1.75rem',
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.5,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1A1A1A' : '#FFFFFF',
            color: mode === 'dark' ? '#FFFFFF' : '#1A1A1A',
            boxShadow:
              mode === 'dark'
                ? '0 2px 20px rgba(0,0,0,0.3)'
                : '0 2px 20px rgba(0,0,0,0.08)',
            borderBottom: `1px solid ${mode === 'dark' ? '#333333' : '#E0E0E0'}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? '#1A1A1A' : '#FFFFFF',
            borderRight: `1px solid ${mode === 'dark' ? '#333333' : '#E0E0E0'}`,
            boxShadow:
              mode === 'dark'
                ? '2px 0 20px rgba(0,0,0,0.3)'
                : '2px 0 20px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            margin: '4px 8px',
            borderRadius: 8,
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
              transform: 'translateX(4px)',
              transition: 'all 0.2s ease-in-out',
            },
            '&.Mui-selected': {
              backgroundColor: mode === 'dark' ? '#1976D2' : '#E3F2FD',
              color: mode === 'dark' ? '#FFFFFF' : '#1976D2',
              '&:hover': {
                backgroundColor: mode === 'dark' ? '#1565C0' : '#BBDEFB',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === 'dark'
                ? '0 4px 20px rgba(0,0,0,0.3)'
                : '0 4px 20px rgba(0,0,0,0.08)',
            border: `1px solid ${mode === 'dark' ? '#333333' : '#E0E0E0'}`,
          },
          elevation1: {
            boxShadow:
              mode === 'dark'
                ? '0 2px 8px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.08)',
          },
          elevation2: {
            boxShadow:
              mode === 'dark'
                ? '0 4px 16px rgba(0,0,0,0.3)'
                : '0 4px 16px rgba(0,0,0,0.08)',
          },
          elevation3: {
            boxShadow:
              mode === 'dark'
                ? '0 8px 24px rgba(0,0,0,0.3)'
                : '0 8px 24px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 24px',
          },
          contained: {
            boxShadow:
              mode === 'dark'
                ? '0 4px 12px rgba(100, 181, 246, 0.3)'
                : '0 4px 12px rgba(25, 118, 210, 0.2)',
            '&:hover': {
              boxShadow:
                mode === 'dark'
                  ? '0 6px 16px rgba(100, 181, 246, 0.4)'
                  : '0 6px 16px rgba(25, 118, 210, 0.3)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            fontWeight: 500,
          },
        },
      },
    },
  });

const navItems = [
  {
    text: 'Home',
    path: '/',
    icon: <Home />,
    description: 'Welcome to DSA Visualizer',
    badge: null,
  },
  {
    text: 'Analyze Code',
    path: '/analyze',
    icon: <Code />,
    description: 'Advanced code analysis with AI insights',
    badge: 'AI',
  },
  {
    text: 'Learning Hub',
    path: '/learning',
    icon: <School />,
    description: 'Interactive tutorials and courses',
    badge: 'NEW',
  },
  {
    text: 'Competitions',
    path: '/competitions',
    icon: <EmojiEvents />,
    description: 'Challenge yourself with coding contests',
    badge: 'HOT',
  },
  {
    text: 'Community',
    path: '/community',
    icon: <Group />,
    description: 'Connect with fellow developers',
    badge: null,
  },
  {
    text: 'Batch Analysis',
    path: '/batch',
    icon: <Assessment />,
    description: 'Analyze multiple files at once',
    badge: null,
  },
  {
    text: 'Execute Code',
    path: '/execute',
    icon: <PlayArrow />,
    description: 'Real-time code execution and debugging',
    badge: null,
  },
  {
    text: 'Optimization',
    path: '/optimization',
    icon: <TrendingUp />,
    description: 'AI-powered optimization suggestions',
    badge: 'AI',
  },
  {
    text: 'Analytics',
    path: '/analytics',
    icon: <Analytics />,
    description: 'Performance insights and metrics',
    badge: null,
  },
  {
    text: 'Languages',
    path: '/languages',
    icon: <Language />,
    description: 'Multi-language support and examples',
    badge: null,
  },
  {
    text: 'Health Check',
    path: '/health',
    icon: <HealthAndSafety />,
    description: 'System status and monitoring',
    badge: null,
  },
];

function NavigationDrawer({ darkMode, toggleDarkMode }) {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2, px: 2 }}>
        {/* Theme Toggle */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'background.elevated',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {darkMode ? (
              <DarkMode fontSize="small" />
            ) : (
              <LightMode fontSize="small" />
            )}
            <Typography variant="body2" fontWeight={500}>
              {darkMode ? 'Dark' : 'Light'} Mode
            </Typography>
          </Box>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="primary"
          />
        </Box>

        <List>
          {navItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem
                button
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  position: 'relative',
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? 'primary.main'
                        : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight:
                            location.pathname === item.path ? 600 : 400,
                          color: 'inherit',
                        }}
                      >
                        {item.text}
                      </Typography>
                      {item.badge && (
                        <Chip
                          label={item.badge}
                          size="small"
                          color={
                            item.badge === 'AI'
                              ? 'primary'
                              : item.badge === 'NEW'
                                ? 'success'
                                : 'warning'
                          }
                          sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {item.description}
                    </Typography>
                  }
                />
              </ListItem>
              {index < navItems.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </List>

        {/* Pro Features Banner */}
        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <AutoAwesome sx={{ fontSize: 24, mb: 1 }} />
          <Typography variant="body2" fontWeight={600} gutterBottom>
            Unlock Pro Features
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Advanced AI insights, unlimited analysis, and premium support
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState(3);

  const theme = createAppTheme(darkMode ? 'dark' : 'light');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Box
              sx={{
                display: 'flex',
                backgroundColor: 'background.default',
                minHeight: '100vh',
              }}
            >
              <CssBaseline />

              <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RocketLaunch
                        sx={{ fontSize: 32, color: 'primary.main' }}
                      />
                      <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ fontWeight: 700 }}
                      >
                        DSA Visualizer Pro
                      </Typography>
                    </Box>
                    <Chip
                      label="AI-Powered"
                      color="primary"
                      size="small"
                      icon={<Psychology />}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Notifications">
                      <IconButton color="inherit">
                        <Badge badgeContent={notifications} color="error">
                          <Notifications />
                        </Badge>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Profile">
                      <IconButton
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                          }}
                        >
                          <AccountCircle />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleProfileMenuClose}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>
                      Upgrade to Pro
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>

              <NavigationDrawer
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />

              <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                <Toolbar />
                <Box sx={{ p: 3 }}>
                  <Suspense
                    fallback={
                      <LoadingSpinner fullScreen message="Loading page..." />
                    }
                  >
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/analyze" element={<AnalyzePage />} />
                      <Route path="/learning" element={<LearningPage />} />
                      <Route
                        path="/competitions"
                        element={<CompetitionPage />}
                      />
                      <Route path="/community" element={<CommunityPage />} />
                      <Route path="/batch" element={<BatchPage />} />
                      <Route path="/execute" element={<ExecutePage />} />
                      <Route
                        path="/optimization"
                        element={<OptimizationPage />}
                      />
                      <Route path="/analytics" element={<AnalyticsPage />} />
                      <Route path="/languages" element={<LanguagesPage />} />
                      <Route path="/health" element={<HealthPage />} />
                    </Routes>
                  </Suspense>
                </Box>
              </Box>
            </Box>
          </Router>
        </ThemeProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;

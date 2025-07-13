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
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';

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
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '8px 16px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === 'dark'
                ? '0 4px 20px rgba(0,0,0,0.3)'
                : '0 4px 20px rgba(0,0,0,0.08)',
          },
        },
      },
    },
  });

function NavigationDrawer({ darkMode, toggleDarkMode }) {
  const location = useLocation();

  const menuItems = [
    {
      text: 'Home',
      icon: <Home />,
      path: '/',
      description: 'Dashboard & Overview',
    },
    {
      text: 'Analyze',
      icon: <Code />,
      path: '/analyze',
      description: 'Code Analysis & Insights',
    },
    {
      text: 'Learning',
      icon: <School />,
      path: '/learning',
      description: 'Interactive Courses & Tutorials',
    },
    {
      text: 'Competitions',
      icon: <EmojiEvents />,
      path: '/competitions',
      description: 'Coding Challenges & Leaderboards',
    },
    {
      text: 'Community',
      icon: <Group />,
      path: '/community',
      description: 'Forums & Collaboration',
    },
    {
      text: 'Execute',
      icon: <PlayArrow />,
      path: '/execute',
      description: 'Code Execution & Testing',
    },
    {
      text: 'Optimization',
      icon: <TrendingUp />,
      path: '/optimization',
      description: 'Performance Optimization',
    },
    {
      text: 'Batch Analysis',
      icon: <Assessment />,
      path: '/batch',
      description: 'Multiple File Analysis',
    },
    {
      text: 'Analytics',
      icon: <Analytics />,
      path: '/analytics',
      description: 'Performance Metrics & Insights',
    },
    {
      text: 'Languages',
      icon: <Language />,
      path: '/languages',
      description: 'Multi-Language Support',
    },
    {
      text: 'Health Check',
      icon: <HealthAndSafety />,
      path: '/health',
      description: 'System Status & Monitoring',
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', p: 2 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Navigation
          </Typography>
          <Chip
            label="AI-Powered Platform"
            color="primary"
            size="small"
            icon={<AutoAwesome />}
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                mb: 1,
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                secondary={item.description}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  lineHeight: 1.2,
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
            Preferences
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightMode sx={{ fontSize: 20 }} />
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="primary"
            />
            <DarkMode sx={{ fontSize: 20 }} />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState(3);
  const { user, isAuthenticated, logout } = useAuth();

  // Theme is now handled in the App component

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  return (
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
                  {user ? `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}` : <AccountCircle />}
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
            {isAuthenticated ? (
              <>
                <MenuItem onClick={handleProfileMenuClose} component={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={handleProfileMenuClose}>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleProfileMenuClose}>
                  Upgrade to Pro
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleProfileMenuClose} component={Link} to="/login">
                  Login
                </MenuItem>
                <MenuItem onClick={handleProfileMenuClose} component={Link} to="/register">
                  Register
                </MenuItem>
              </>
            )}
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/profile" element={<ProfilePage />} />
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
  );
}

function App() {
  return (
    <ThemeProvider theme={createAppTheme('light')}>
      <Router>
        <ErrorBoundary>
          <NotificationProvider>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </NotificationProvider>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;

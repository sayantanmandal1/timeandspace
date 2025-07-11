import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
  Divider
} from '@mui/material';
import { 
  Home,
  Code,
  PlayArrow,
  TrendingUp,
  Language,
  HealthAndSafety,
  Assessment
} from '@mui/icons-material';
import AnalyzePage from './pages/AnalyzePage';
import BatchPage from './pages/BatchPage';
import ExecutePage from './pages/ExecutePage';
import OptimizationPage from './pages/OptimizationPage';
import LanguagesPage from './pages/LanguagesPage';
import HealthPage from './pages/HealthPage';
import HomePage from './pages/HomePage';

const drawerWidth = 240;

// Create monochrome theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#333333',
      light: '#555555',
      dark: '#111111',
    },
    secondary: {
      main: '#666666',
      light: '#888888',
      dark: '#444444',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          '&.Mui-selected': {
            backgroundColor: '#e8e8e8',
            borderRight: '3px solid #333333',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #e0e0e0',
        },
      },
    },
  },
});

const navItems = [
  { text: 'Home', path: '/', icon: <Home /> },
  { text: 'Analyze Code', path: '/analyze', icon: <Code /> },
  { text: 'Batch Analysis', path: '/batch', icon: <Assessment /> },
  { text: 'Execute Code', path: '/execute', icon: <PlayArrow /> },
  { text: 'Optimization', path: '/optimization', icon: <TrendingUp /> },
  { text: 'Languages', path: '/languages', icon: <Language /> },
  { text: 'Health Check', path: '/health', icon: <HealthAndSafety /> },
];

function NavigationDrawer() {
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
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {navItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem 
                button 
                component={Link} 
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? '#333' : '#666' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      color: location.pathname === item.path ? '#333' : '#666',
                    }
                  }}
                />
              </ListItem>
              {index < navItems.length - 1 && <Divider sx={{ mx: 2, my: 1 }} />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', backgroundColor: '#fafafa', minHeight: '100vh' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: 1201 }}>
            <Toolbar>
              <Box display="flex" alignItems="center" gap={2}>
                <Code sx={{ fontSize: 28, color: '#fff' }} />
                <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
                  DSA Code Visualizer
                </Typography>
                <Box 
                  sx={{ 
                    px: 2, 
                    py: 0.5, 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }}
                >
                  Ready to Analyze?
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          
          <NavigationDrawer />
          
          <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
            <Toolbar />
            <Box sx={{ p: 3 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/analyze" element={<AnalyzePage />} />
                <Route path="/batch" element={<BatchPage />} />
                <Route path="/execute" element={<ExecutePage />} />
                <Route path="/optimization" element={<OptimizationPage />} />
                <Route path="/languages" element={<LanguagesPage />} />
                <Route path="/health" element={<HealthPage />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

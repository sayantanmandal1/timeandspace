import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar
} from '@mui/material';
import {
  Language as LanguageIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  BugReport as BugReportIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayArrowIcon,
  Assessment as AssessmentIcon,
  Info as InfoIcon,
  Star as StarIcon
} from '@mui/icons-material';

const languages = [
  {
    name: 'Python',
    icon: '🐍',
    description: 'High-level, interpreted programming language known for its simplicity and readability.',
    features: {
      execution: true,
      analysis: true,
      optimization: true,
      visualization: true,
      input_detection: true,
      step_by_step: true
    },
    complexity: 'Easy to Learn',
    performance: 'Good',
    memory: 'Moderate',
    use_cases: ['Data Science', 'Web Development', 'Automation', 'AI/ML']
  },
  {
    name: 'Java',
    icon: '☕',
    description: 'Object-oriented programming language designed for portability and performance.',
    features: {
      execution: true,
      analysis: true,
      optimization: true,
      visualization: true,
      input_detection: true,
      step_by_step: true
    },
    complexity: 'Moderate',
    performance: 'Excellent',
    memory: 'High',
    use_cases: ['Enterprise Software', 'Android Development', 'Web Applications', 'Big Data']
  },
  {
    name: 'JavaScript',
    icon: '🟨',
    description: 'Dynamic programming language primarily used for web development and browser scripting.',
    features: {
      execution: true,
      analysis: true,
      optimization: true,
      visualization: true,
      input_detection: false,
      step_by_step: false
    },
    complexity: 'Easy to Learn',
    performance: 'Good',
    memory: 'Moderate',
    use_cases: ['Web Development', 'Frontend', 'Backend (Node.js)', 'Mobile Apps']
  },
  {
    name: 'C++',
    icon: '🔷',
    description: 'High-performance programming language with low-level memory manipulation capabilities.',
    features: {
      execution: true,
      analysis: true,
      optimization: true,
      visualization: false,
      input_detection: false,
      step_by_step: false
    },
    complexity: 'Advanced',
    performance: 'Excellent',
    memory: 'Low',
    use_cases: ['System Programming', 'Game Development', 'Embedded Systems', 'High-Performance Computing']
  },
  {
    name: 'C',
    icon: '🔵',
    description: 'General-purpose programming language with direct hardware access and minimal abstraction.',
    features: {
      execution: true,
      analysis: true,
      optimization: true,
      visualization: false,
      input_detection: false,
      step_by_step: false
    },
    complexity: 'Advanced',
    performance: 'Excellent',
    memory: 'Very Low',
    use_cases: ['System Programming', 'Embedded Systems', 'Operating Systems', 'Device Drivers']
  },
  {
    name: 'C#',
    icon: '💜',
    description: 'Modern object-oriented language developed by Microsoft for the .NET framework.',
    features: {
      execution: false,
      analysis: false,
      optimization: false,
      visualization: false,
      input_detection: false,
      step_by_step: false
    },
    complexity: 'Moderate',
    performance: 'Good',
    memory: 'Moderate',
    use_cases: ['Windows Applications', 'Game Development', 'Web Development', 'Mobile Apps']
  },
  {
    name: 'Go',
    icon: '🔵',
    description: 'Statically typed, compiled language designed for simplicity and concurrent programming.',
    features: {
      execution: false,
      analysis: false,
      optimization: false,
      visualization: false,
      input_detection: false,
      step_by_step: false
    },
    complexity: 'Easy to Learn',
    performance: 'Excellent',
    memory: 'Low',
    use_cases: ['Web Services', 'Cloud Computing', 'DevOps Tools', 'Microservices']
  },
  {
    name: 'Rust',
    icon: '🦀',
    description: 'Systems programming language focused on safety, speed, and concurrency.',
    features: {
      execution: false,
      analysis: false,
      optimization: false,
      visualization: false,
      input_detection: false,
      step_by_step: false
    },
    complexity: 'Advanced',
    performance: 'Excellent',
    memory: 'Very Low',
    use_cases: ['System Programming', 'WebAssembly', 'Embedded Systems', 'Performance-Critical Applications']
  }
];

const features = [
  { key: 'execution', name: 'Code Execution', description: 'Run code and see output' },
  { key: 'analysis', name: 'Code Analysis', description: 'AST analysis and complexity calculation' },
  { key: 'optimization', name: 'Optimization', description: 'Get optimization suggestions' },
  { key: 'visualization', name: 'Visualization', description: 'Step-by-step execution visualization' },
  { key: 'input_detection', name: 'Input Detection', description: 'Automatic input requirement detection' },
  { key: 'step_by_step', name: 'Step-by-Step', description: 'Detailed execution tracing' }
];

export default function LanguagesPage() {
  const getFeatureIcon = (supported) => {
    return supported ? <CheckCircleIcon color="success" /> : <CheckCircleIcon color="disabled" />;
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Easy to Learn': return 'success';
      case 'Moderate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent': return 'success';
      case 'Good': return 'primary';
      case 'Moderate': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Supported Programming Languages
      </Typography>
      {/* Page Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#333" gutterBottom>
          Supported Languages
        </Typography>
        <Typography variant="body1" color="#666">
          Explore the programming languages supported by our platform and their available features.
        </Typography>
      </Box>

      {/* Add an info Alert at the top */}
      <Alert severity="info" sx={{ mb: 2 }}>
        Explore supported languages and their features below.
      </Alert>

      {/* Feature Legend */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fff' }}>
        <Typography variant="h6" fontWeight="bold" color="#333" gutterBottom>
          Feature Legend
        </Typography>
        <Grid container spacing={2}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={4} key={feature.key}>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {feature.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Add a CardActions section with a Button (dummy) */}
      <CardActions>
        <Button size="small" variant="outlined">Learn More</Button>
      </CardActions>

      {/* Add a Tooltip and IconButton for favorite */}
      <Tooltip title="Mark as favorite">
        <IconButton color="warning"><StarIcon /></IconButton>
      </Tooltip>

      {/* Add an Accordion for extra info */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>More Language Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" gap={1}>
            <LanguageIcon color="primary" />
            <CodeIcon color="secondary" />
            <SpeedIcon color="success" />
            <MemoryIcon color="info" />
            <BugReportIcon color="error" />
            <TrendingUpIcon color="success" />
            <PlayArrowIcon color="primary" />
            <AssessmentIcon color="info" />
            <InfoIcon color="info" />
            <StarIcon color="warning" />
          </Box>
          <Typography variant="body2">Icons representing language features.</Typography>
        </AccordionDetails>
      </Accordion>

      {/* Languages Grid */}
      <Grid container spacing={3}>
        {languages.map((language) => (
          <Grid item xs={12} md={6} lg={4} key={language.name}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Language Header */}
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{
                    width: 48,
                    height: 48,
                    fontSize: '24px',
                    backgroundColor: '#f5f5f5'
                  }}>
                    {language.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="#333">
                      {language.name}
                    </Typography>
                    <Box display="flex" gap={1}>
                      <Chip
                        label={language.complexity}
                        size="small"
                        color={getComplexityColor(language.complexity)}
                        variant="outlined"
                      />
                      <Chip
                        label={language.performance}
                        size="small"
                        color={getPerformanceColor(language.performance)}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Description */}
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {language.description}
                </Typography>

                {/* Features */}
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Supported Features:
                </Typography>
                <List dense>
                  {features.map((feature) => (
                    <ListItem key={feature.key} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {getFeatureIcon(language.features[feature.key])}
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.name}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Use Cases */}
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Common Use Cases:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={0.5}>
                  {language.use_cases.map((useCase, index) => (
                    <Chip
                      key={index}
                      label={useCase}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>

                {/* Performance Info */}
                <Box mt={2} p={1} sx={{ backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                  <Typography variant="caption" color="textSecondary">
                    Memory Usage: {language.memory}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Coming Soon Section */}
      <Paper sx={{ p: 3, mt: 3, backgroundColor: '#fff' }}>
        <Typography variant="h6" fontWeight="bold" color="#333" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          We're actively working on expanding language support. The following languages are planned for future releases:
        </Typography>

        <Grid container spacing={2}>
          {languages.filter(lang => !lang.features.execution).map((language) => (
            <Grid item xs={12} sm={6} md={3} key={language.name}>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{
                  width: 32,
                  height: 32,
                  fontSize: '16px',
                  backgroundColor: '#f5f5f5'
                }}>
                  {language.icon}
                </Avatar>
                <Typography variant="body2" fontWeight="bold">
                  {language.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Platform Stats */}
      <Paper sx={{ p: 3, mt: 3, backgroundColor: '#fff' }}>
        <Typography variant="h6" fontWeight="bold" color="#333" gutterBottom>
          Platform Statistics
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h4" color="primary" fontWeight="bold">
                {languages.filter(lang => lang.features.execution).length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Fully Supported Languages
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h4" color="success" fontWeight="bold">
                {features.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Available Features
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h4" color="warning" fontWeight="bold">
                {languages.length - languages.filter(lang => lang.features.execution).length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Languages in Development
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h4" color="info" fontWeight="bold">
                {languages.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Languages
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Container,
  Stack,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import {
  Analytics,
  TrendingUp,
  TrendingDown,
  Psychology,
  Code,
  School,
  EmojiEvents,
  Star,
  CheckCircle,
  Timeline,
  BarChart,
  ShowChart,
  Download,
  Refresh,
  AutoAwesome,
  Add,
} from '@mui/icons-material';

const performanceData = {
  overall: {
    rating: 1250,
    change: 45,
    problemsSolved: 67,
    accuracy: 78.5,
    averageTime: '12.3 min',
    contestsWon: 8,
  },
  weekly: {
    problemsSolved: 12,
    timeSpent: '8.5 hours',
    accuracy: 82.3,
    ratingChange: 25,
  },
  monthly: {
    problemsSolved: 45,
    timeSpent: '32.1 hours',
    accuracy: 79.8,
    ratingChange: 120,
  },
};

const topicPerformance = [
  {
    topic: 'Arrays',
    problemsSolved: 15,
    accuracy: 85.2,
    averageTime: '8.5 min',
    strength: 'Strong',
  },
  {
    topic: 'Strings',
    problemsSolved: 12,
    accuracy: 78.9,
    averageTime: '10.2 min',
    strength: 'Good',
  },
  {
    topic: 'Trees',
    problemsSolved: 8,
    accuracy: 65.4,
    averageTime: '15.8 min',
    strength: 'Needs Work',
  },
  {
    topic: 'Graphs',
    problemsSolved: 6,
    accuracy: 58.7,
    averageTime: '18.3 min',
    strength: 'Weak',
  },
  {
    topic: 'Dynamic Programming',
    problemsSolved: 4,
    accuracy: 45.2,
    averageTime: '22.1 min',
    strength: 'Very Weak',
  },
];

const learningInsights = [
  {
    type: 'Strength',
    insight: 'You excel at array manipulation problems',
    recommendation:
      'Focus on more complex array problems to maintain this strength',
    icon: <TrendingUp />,
    color: 'success',
  },
  {
    type: 'Weakness',
    insight: 'Dynamic Programming is your biggest challenge',
    recommendation:
      'Start with basic DP problems and gradually increase difficulty',
    icon: <TrendingDown />,
    color: 'error',
  },
  {
    type: 'Opportunity',
    insight: 'You show potential in graph algorithms',
    recommendation: 'Practice more graph problems to improve your skills',
    icon: <Star />,
    color: 'warning',
  },
];

const recentActivity = [
  {
    date: '2024-01-15',
    activity: 'Solved "Array Rotation" problem',
    difficulty: 'Easy',
    time: '5 min',
    accuracy: '100%',
  },
  {
    date: '2024-01-14',
    activity: 'Attempted "Binary Tree Traversal"',
    difficulty: 'Medium',
    time: '18 min',
    accuracy: '75%',
  },
  {
    date: '2024-01-13',
    activity: 'Participated in Weekly Contest',
    difficulty: 'Mixed',
    time: '2 hours',
    accuracy: '60%',
  },
  {
    date: '2024-01-12',
    activity: 'Completed "Strings" tutorial',
    difficulty: 'Beginner',
    time: '45 min',
    accuracy: 'N/A',
  },
];

const goals = [
  {
    title: 'Solve 100 Problems',
    current: 67,
    target: 100,
    deadline: '2024-03-01',
    progress: 67,
  },
  {
    title: 'Reach 1500 Rating',
    current: 1250,
    target: 1500,
    deadline: '2024-04-01',
    progress: 83,
  },
  {
    title: 'Master Dynamic Programming',
    current: 4,
    target: 20,
    deadline: '2024-02-15',
    progress: 20,
  },
  {
    title: 'Win 10 Contests',
    current: 8,
    target: 10,
    deadline: '2024-05-01',
    progress: 80,
  },
];

export default function AnalyticsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('month');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Strong':
        return 'success';
      case 'Good':
        return 'primary';
      case 'Needs Work':
        return 'warning';
      case 'Weak':
        return 'error';
      case 'Very Weak':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Hard':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Analytics Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track your progress, analyze performance, and optimize your learning
        </Typography>
      </Box>

      {/* Time Range Selector */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            label="Time Range"
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="quarter">This Quarter</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Button startIcon={<Download />} sx={{ mr: 1 }}>
            Export Report
          </Button>
          <Button startIcon={<Refresh />}>Refresh Data</Button>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h4" fontWeight={700} color="primary.main">
                {performanceData.overall.rating}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Current Rating
            </Typography>
            <Chip
              label={`+${performanceData.overall.change}`}
              size="small"
              color="success"
              icon={<TrendingUp />}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <Code sx={{ color: 'success.main', mr: 1 }} />
              <Typography variant="h4" fontWeight={700} color="success.main">
                {performanceData.overall.problemsSolved}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Problems Solved
            </Typography>
            <Typography variant="caption" color="text.secondary">
              This month: {performanceData.monthly.problemsSolved}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <CheckCircle sx={{ color: 'warning.main', mr: 1 }} />
              <Typography variant="h4" fontWeight={700} color="warning.main">
                {performanceData.overall.accuracy}%
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Accuracy Rate
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Avg time: {performanceData.overall.averageTime}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <EmojiEvents sx={{ color: 'error.main', mr: 1 }} />
              <Typography variant="h4" fontWeight={700} color="error.main">
                {performanceData.overall.contestsWon}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Contests Won
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Win rate: 67%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Overview" icon={<Analytics />} iconPosition="start" />
          <Tab
            label="Topic Analysis"
            icon={<BarChart />}
            iconPosition="start"
          />
          <Tab
            label="Learning Insights"
            icon={<Psychology />}
            iconPosition="start"
          />
          <Tab
            label="Goals & Progress"
            icon={<Timeline />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Performance Chart */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Performance Over Time
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 300,
                  backgroundColor: 'grey.50',
                  borderRadius: 1,
                }}
              >
                <ShowChart sx={{ fontSize: 64, color: 'grey.400' }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 2 }}
                >
                  Interactive chart will be displayed here
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Recent Activity
              </Typography>
              <List dense>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle
                          sx={{ fontSize: 16, color: 'success.main' }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.activity}
                        secondary={
                          <Box>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {activity.date} • {activity.time}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                              <Chip
                                label={activity.difficulty}
                                size="small"
                                color={getDifficultyColor(activity.difficulty)}
                              />
                              {activity.accuracy !== 'N/A' && (
                                <Chip
                                  label={`${activity.accuracy} accuracy`}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Weekly vs Monthly Comparison */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Weekly vs Monthly Performance
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 2,
                      backgroundColor: 'primary.light',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="h4" fontWeight={700} color="white">
                      {performanceData.weekly.problemsSolved}
                    </Typography>
                    <Typography variant="body2" color="white">
                      This Week
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 2,
                      backgroundColor: 'secondary.light',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="h4" fontWeight={700} color="white">
                      {performanceData.monthly.problemsSolved}
                    </Typography>
                    <Typography variant="body2" color="white">
                      This Month
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Time Spent Analysis */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Time Spent Learning
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">This Week</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {performanceData.weekly.timeSpent}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">This Month</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {performanceData.monthly.timeSpent}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Topic</TableCell>
                  <TableCell align="center">Problems Solved</TableCell>
                  <TableCell align="center">Accuracy</TableCell>
                  <TableCell align="center">Avg Time</TableCell>
                  <TableCell align="center">Strength Level</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topicPerformance.map((topic) => (
                  <TableRow key={topic.topic} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {topic.topic}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {topic.problemsSolved}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={600}>
                        {topic.accuracy}%
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {topic.averageTime}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={topic.strength}
                        color={getStrengthColor(topic.strength)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined">
                        Practice More
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          {learningInsights.map((insight, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: `${insight.color}.light`,
                      color: `${insight.color}.main`,
                      mr: 2,
                    }}
                  >
                    {insight.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    {insight.type}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {insight.insight}
                </Typography>

                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="primary.main"
                >
                  Recommendation:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {insight.recommendation}
                </Typography>
              </Paper>
            </Grid>
          ))}

          {/* AI Recommendations */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    AI-Powered Recommendations
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                    Based on your performance analysis, here are personalized
                    recommendations to improve your skills
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      startIcon={<Psychology />}
                      sx={{
                        backgroundColor: 'white',
                        color: 'primary.main',
                        '&:hover': { backgroundColor: '#f5f5f5' },
                      }}
                    >
                      Get Personalized Plan
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<School />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                      }}
                    >
                      View Study Path
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                  <AutoAwesome sx={{ fontSize: 64, color: '#FFD700' }} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          {goals.map((goal, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {goal.title}
                  </Typography>
                  <Chip
                    label={`${goal.progress}%`}
                    color={
                      goal.progress >= 80
                        ? 'success'
                        : goal.progress >= 50
                          ? 'warning'
                          : 'error'
                    }
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {goal.current}/{goal.target}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={goal.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Deadline: {goal.deadline}
                </Typography>
              </Paper>
            </Grid>
          ))}

          {/* Goal Setting */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Set New Goals
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Add />}
                    sx={{ height: 100 }}
                  >
                    Add Problem Goal
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Add />}
                    sx={{ height: 100 }}
                  >
                    Add Rating Goal
                  </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Add />}
                    sx={{ height: 100 }}
                  >
                    Add Topic Goal
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

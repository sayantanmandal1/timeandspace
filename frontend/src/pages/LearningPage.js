import React, { useState } from 'react';
import { useNotification } from '../components/NotificationToast';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Container,
  Stack,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import {
  School,
  Psychology,
  Code,
  EmojiEvents,
  Star,
  CheckCircle,
  Timeline,
  AutoAwesome,
  Refresh,
} from '@mui/icons-material';

const courses = [
  {
    id: 1,
    title: 'Data Structures Fundamentals',
    description:
      'Master arrays, linked lists, stacks, and queues with hands-on practice',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 24,
    rating: 4.8,
    students: 15420,
    progress: 0,
    isPremium: false,
    topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Basic Algorithms'],
    instructor: 'Dr. Sarah Chen',
    instructorAvatar: 'SC',
    color: 'success',
  },
  {
    id: 2,
    title: 'Advanced Algorithms',
    description:
      'Learn dynamic programming, graph algorithms, and optimization techniques',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 36,
    rating: 4.9,
    students: 8920,
    progress: 0,
    isPremium: true,
    topics: [
      'Dynamic Programming',
      'Graph Algorithms',
      'Greedy Algorithms',
      'Backtracking',
    ],
    instructor: 'Prof. Alex Rodriguez',
    instructorAvatar: 'AR',
    color: 'warning',
  },
  {
    id: 3,
    title: 'Competitive Programming Mastery',
    description:
      'Prepare for coding interviews and competitive programming contests',
    level: 'Advanced',
    duration: '8 weeks',
    lessons: 48,
    rating: 4.7,
    students: 5670,
    progress: 0,
    isPremium: true,
    topics: [
      'Advanced DSA',
      'Problem Solving',
      'Interview Prep',
      'Contest Strategies',
    ],
    instructor: 'Priya Patel',
    instructorAvatar: 'PP',
    color: 'error',
  },
  {
    id: 4,
    title: 'System Design & Scalability',
    description:
      'Learn to design scalable systems and optimize for performance',
    level: 'Advanced',
    duration: '5 weeks',
    lessons: 30,
    rating: 4.6,
    students: 4230,
    progress: 0,
    isPremium: true,
    topics: [
      'System Architecture',
      'Database Design',
      'Caching',
      'Load Balancing',
    ],
    instructor: 'Mike Johnson',
    instructorAvatar: 'MJ',
    color: 'info',
  },
];

const learningPaths = [
  {
    title: 'Complete Beginner',
    description: 'Start from scratch with no prior programming experience',
    courses: [1, 5, 9],
    estimatedTime: '12 weeks',
    difficulty: 'Beginner',
    color: 'success',
  },
  {
    title: 'Career Accelerator',
    description: 'Fast-track your software engineering career',
    courses: [2, 3, 6, 7],
    estimatedTime: '16 weeks',
    difficulty: 'Intermediate',
    color: 'warning',
  },
  {
    title: 'FAANG Preparation',
    description: 'Comprehensive preparation for top tech companies',
    courses: [3, 4, 8, 10],
    estimatedTime: '20 weeks',
    difficulty: 'Advanced',
    color: 'error',
  },
];

const achievements = [
  {
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: <School />,
    progress: 0,
    maxProgress: 1,
    color: 'success',
  },
  {
    title: 'Problem Solver',
    description: 'Solve 50 coding problems',
    icon: <Code />,
    progress: 12,
    maxProgress: 50,
    color: 'primary',
  },
  {
    title: 'Speed Demon',
    description: 'Complete 10 problems in under 30 minutes',
    icon: <Refresh />,
    progress: 3,
    maxProgress: 10,
    color: 'warning',
  },
  {
    title: 'Algorithm Master',
    description: 'Master all basic algorithms',
    icon: <Psychology />,
    progress: 0,
    maxProgress: 20,
    color: 'error',
  },
];

const challenges = [
  {
    title: 'Weekly Challenge: Array Manipulation',
    description: 'Solve complex array problems with optimal solutions',
    difficulty: 'Medium',
    participants: 1240,
    timeLeft: '2 days',
    reward: '50 XP',
    color: 'primary',
  },
  {
    title: 'Monthly Contest: Graph Algorithms',
    description: 'Compete in our monthly coding contest',
    difficulty: 'Hard',
    participants: 890,
    timeLeft: '1 week',
    reward: '200 XP + Badge',
    color: 'error',
  },
];

export default function LearningPage() {
  const [tabValue, setTabValue] = useState(0);
  const { success, info } = useNotification();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCourseSelect = (course) => {
    success(`Starting course: ${course.title}`);
    // Handle course selection
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Learning Hub
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Master Data Structures & Algorithms with interactive courses and
          AI-powered insights
        </Typography>
      </Box>

      {/* Progress Overview */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Your Learning Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                label="35% complete"
                color="success"
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Typography variant="body2" fontWeight={600}>
                7 of 20 courses completed • 1,240 XP earned
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              7 of 20 courses completed • 1,240 XP earned
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                1,240
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total XP
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Courses" icon={<School />} iconPosition="start" />
          <Tab
            label="Learning Paths"
            icon={<Timeline />}
            iconPosition="start"
          />
          <Tab label="Challenges" icon={<EmojiEvents />} iconPosition="start" />
          <Tab label="Achievements" icon={<Star />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={course.level}
                      color={course.color}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    {course.isPremium && (
                      <Chip
                        label="Premium"
                        color="warning"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>

                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {course.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {course.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    {course.topics.slice(0, 3).map((topic, index) => (
                      <Chip
                        key={index}
                        label={topic}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                    {course.topics.length > 3 && (
                      <Chip
                        label={`+${course.topics.length - 3} more`}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}
                    >
                      {course.instructorAvatar}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {course.instructor}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        label={`${course.rating} (1500)`}
                        size="small"
                        icon={<Star />}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {course.students.toLocaleString()} students
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {course.duration} • {course.lessons} lessons
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {course.progress}% complete
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                  {course.isPremium ? (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Star />}
                      color="warning"
                    >
                      Upgrade to Access
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<School />}
                      onClick={() => handleCourseSelect(course)}
                    >
                      Start Learning
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {learningPaths.map((path, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': { transform: 'scale(1.02)' },
                  transition: 'transform 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: `${path.color}.main`,
                  }}
                />

                <Typography variant="h5" gutterBottom fontWeight={600}>
                  {path.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {path.description}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    What you'll learn:
                  </Typography>
                  <List dense>
                    {path.courses.map((courseId, idx) => {
                      const course = courses.find((c) => c.id === courseId);
                      return course ? (
                        <ListItem key={idx} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle
                              sx={{ fontSize: 16, color: 'success.main' }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={course.title}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ) : null;
                    })}
                  </List>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Chip
                    label={path.difficulty}
                    color={path.color}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {path.estimatedTime}
                  </Typography>
                </Box>

                <Button variant="contained" fullWidth startIcon={<Timeline />}>
                  Start Path
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          {challenges.map((challenge, index) => (
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
                  <Chip
                    label={challenge.difficulty}
                    color={challenge.color}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {challenge.timeLeft} left
                  </Typography>
                </Box>

                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {challenge.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {challenge.description}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {challenge.participants.toLocaleString()} participants
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    color="success.main"
                  >
                    {challenge.reward}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<EmojiEvents />}
                >
                  Join Challenge
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: `${achievement.color}.light`,
                    color: `${achievement.color}.main`,
                    mb: 2,
                  }}
                >
                  {achievement.icon}
                </Box>

                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {achievement.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {achievement.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {achievement.progress}/{achievement.maxProgress}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (achievement.progress / achievement.maxProgress) * 100
                    }
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                {achievement.progress >= achievement.maxProgress && (
                  <Chip
                    label="Achieved!"
                    color="success"
                    size="small"
                    icon={<Star />}
                  />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* AI Learning Assistant */}
      <Paper
        sx={{
          p: 4,
          mt: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              AI Learning Assistant
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
              Get personalized learning recommendations, instant help with
              problems, and adaptive difficulty adjustment
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
                Ask AI Assistant
              </Button>
              <Button
                variant="outlined"
                startIcon={<AutoAwesome />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Get Recommendations
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <AutoAwesome sx={{ fontSize: 64, color: '#FFD700' }} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

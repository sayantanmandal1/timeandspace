import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Tabs,
  Tab,
  Container,
  Stack,
  LinearProgress,
  IconButton,
  Tooltip,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Countdown,
} from '@mui/material';
import {
  EmojiEvents,
  Timer,
  TrendingUp,
  Group,
  Star,
  PlayArrow,
  CheckCircle,
  Error,
  Schedule,
  Leaderboard,
  Assignment,
  Code,
  Speed,
  Psychology,
  AutoAwesome,
  WorkspacePremium,
  Notifications,
  Share,
  Visibility,
} from '@mui/icons-material';

const contests = [
  {
    id: 1,
    title: 'Weekly DSA Challenge',
    description: 'Solve 5 algorithmic problems in 2 hours',
    difficulty: 'Medium',
    duration: '2 hours',
    startTime: '2024-01-15T10:00:00Z',
    endTime: '2024-01-15T12:00:00Z',
    participants: 1240,
    maxParticipants: 2000,
    problems: 5,
    isLive: true,
    isRegistered: true,
    prize: '$500',
    color: 'primary',
  },
  {
    id: 2,
    title: 'Monthly Algorithm Contest',
    description: 'Advanced algorithms and data structures',
    difficulty: 'Hard',
    duration: '4 hours',
    startTime: '2024-01-20T14:00:00Z',
    endTime: '2024-01-20T18:00:00Z',
    participants: 890,
    maxParticipants: 1500,
    problems: 8,
    isLive: false,
    isRegistered: false,
    prize: '$1000',
    color: 'error',
  },
  {
    id: 3,
    title: 'Beginner Friendly Contest',
    description: 'Perfect for newcomers to competitive programming',
    difficulty: 'Easy',
    duration: '1.5 hours',
    startTime: '2024-01-18T16:00:00Z',
    endTime: '2024-01-18T17:30:00Z',
    participants: 2100,
    maxParticipants: 3000,
    problems: 4,
    isLive: false,
    isRegistered: false,
    prize: '$200',
    color: 'success',
  },
];

const leaderboard = [
  {
    rank: 1,
    username: 'algo_master',
    name: 'Alex Chen',
    avatar: 'AC',
    score: 2850,
    problemsSolved: 156,
    rating: 2100,
    country: 'USA',
    streak: 15,
  },
  {
    rank: 2,
    username: 'code_ninja',
    name: 'Sarah Rodriguez',
    avatar: 'SR',
    score: 2780,
    problemsSolved: 142,
    rating: 2050,
    country: 'Canada',
    streak: 12,
  },
  {
    rank: 3,
    username: 'dsa_pro',
    name: 'Priya Patel',
    avatar: 'PP',
    score: 2650,
    problemsSolved: 128,
    rating: 1950,
    country: 'India',
    streak: 8,
  },
  {
    rank: 4,
    username: 'algorithm_wizard',
    name: 'Mike Johnson',
    avatar: 'MJ',
    score: 2520,
    problemsSolved: 115,
    rating: 1850,
    country: 'UK',
    streak: 6,
  },
  {
    rank: 5,
    username: 'coding_champion',
    name: 'David Kim',
    avatar: 'DK',
    score: 2380,
    problemsSolved: 98,
    rating: 1750,
    country: 'South Korea',
    streak: 10,
  },
];

const problems = [
  {
    id: 1,
    title: 'Array Rotation',
    difficulty: 'Easy',
    points: 100,
    solvedBy: 890,
    totalAttempts: 1200,
    timeLimit: '1s',
    memoryLimit: '256MB',
    tags: ['Arrays', 'Two Pointers'],
    status: 'solved',
  },
  {
    id: 2,
    title: 'Binary Tree Traversal',
    difficulty: 'Medium',
    points: 200,
    solvedBy: 456,
    totalAttempts: 890,
    timeLimit: '2s',
    memoryLimit: '512MB',
    tags: ['Trees', 'DFS', 'BFS'],
    status: 'attempted',
  },
  {
    id: 3,
    title: 'Dynamic Programming Challenge',
    difficulty: 'Hard',
    points: 300,
    solvedBy: 123,
    totalAttempts: 567,
    timeLimit: '3s',
    memoryLimit: '1GB',
    tags: ['Dynamic Programming', 'Optimization'],
    status: 'unsolved',
  },
];

const achievements = [
  {
    title: 'First Victory',
    description: 'Win your first contest',
    icon: <EmojiEvents />,
    achieved: true,
    date: '2024-01-10',
    color: 'success',
  },
  {
    title: 'Speed Demon',
    description: 'Solve 5 problems in under 30 minutes',
    icon: <Speed />,
    achieved: true,
    date: '2024-01-08',
    color: 'warning',
  },
  {
    title: 'Consistency King',
    description: 'Participate in 10 consecutive contests',
    icon: <TrendingUp />,
    achieved: false,
    progress: 7,
    maxProgress: 10,
    color: 'primary',
  },
  {
    title: 'Problem Master',
    description: 'Solve 100 problems',
    icon: <Code />,
    achieved: false,
    progress: 67,
    maxProgress: 100,
    color: 'error',
  },
];

export default function CompetitionPage() {
  const [tabValue, setTabValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getTimeUntil = (targetTime) => {
    const target = new Date(targetTime);
    const diff = target - currentTime;

    if (diff <= 0) return 'Started';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'solved':
        return 'success';
      case 'attempted':
        return 'warning';
      case 'unsolved':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'solved':
        return <CheckCircle />;
      case 'attempted':
        return <Error />;
      case 'unsolved':
        return <Assignment />;
      default:
        return <Assignment />;
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Competitive Programming
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Challenge yourself with algorithmic contests and climb the leaderboard
        </Typography>
      </Box>

      {/* Live Contest Alert */}
      {contests.find((c) => c.isLive) && (
        <Alert
          severity="info"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" startIcon={<PlayArrow />}>
              Join Now
            </Button>
          }
        >
          <Typography variant="body1" fontWeight={600}>
            Live Contest: {contests.find((c) => c.isLive)?.title}
          </Typography>
          <Typography variant="body2">
            {contests.find((c) => c.isLive)?.participants} participants •{' '}
            {getTimeUntil(contests.find((c) => c.isLive)?.endTime)} remaining
          </Typography>
        </Alert>
      )}

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              67
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Problems Solved
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="success.main">
              1,250
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating Points
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="warning.main">
              12
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contests Won
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="error.main">
              #156
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Global Rank
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Contests" icon={<EmojiEvents />} iconPosition="start" />
          <Tab
            label="Leaderboard"
            icon={<Leaderboard />}
            iconPosition="start"
          />
          <Tab label="Problems" icon={<Assignment />} iconPosition="start" />
          <Tab label="Achievements" icon={<Star />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {contests.map((contest) => (
            <Grid item xs={12} md={6} lg={4} key={contest.id}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
              >
                {contest.isLive && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      backgroundColor: 'success.main',
                      zIndex: 1,
                    }}
                  />
                )}

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
                      label={contest.difficulty}
                      color={contest.color}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    {contest.isLive && (
                      <Chip
                        label="LIVE"
                        color="success"
                        size="small"
                        icon={<PlayArrow />}
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Box>

                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {contest.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {contest.description}
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
                        Duration
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {contest.duration}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Problems
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {contest.problems}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Participants
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {contest.participants}/{contest.maxParticipants}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Prize Pool
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color="success.main"
                      >
                        {contest.prize}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      {contest.isLive ? 'Time Remaining' : 'Starts In'}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color={contest.isLive ? 'success.main' : 'primary.main'}
                    >
                      {getTimeUntil(
                        contest.isLive ? contest.endTime : contest.startTime
                      )}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                  {contest.isRegistered ? (
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PlayArrow />}
                      color="success"
                    >
                      Enter Contest
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Schedule />}
                    >
                      Register
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="center">Problems</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Streak</TableCell>
                  <TableCell align="center">Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((user) => (
                  <TableRow key={user.rank} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ mr: 1 }}
                        >
                          #{user.rank}
                        </Typography>
                        {user.rank <= 3 && (
                          <EmojiEvents
                            sx={{
                              color:
                                user.rank === 1
                                  ? '#FFD700'
                                  : user.rank === 2
                                    ? '#C0C0C0'
                                    : '#CD7F32',
                              fontSize: 20,
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                          {user.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            @{user.username}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="primary.main"
                      >
                        {user.rating}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {user.problemsSolved}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={600}>
                        {user.score}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={user.streak}
                        size="small"
                        color="warning"
                        icon={<TrendingUp />}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="text.secondary">
                        {user.country}
                      </Typography>
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
          {problems.map((problem) => (
            <Grid item xs={12} md={6} lg={4} key={problem.id}>
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
                    label={problem.difficulty}
                    color={
                      problem.difficulty === 'Easy'
                        ? 'success'
                        : problem.difficulty === 'Medium'
                          ? 'warning'
                          : 'error'
                    }
                    size="small"
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusIcon(problem.status)}
                    <Typography variant="caption" color="text.secondary">
                      {problem.points} pts
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {problem.title}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {problem.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Success Rate
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {Math.round(
                        (problem.solvedBy / problem.totalAttempts) * 100
                      )}
                      %
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(problem.solvedBy / problem.totalAttempts) * 100}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {problem.solvedBy} solved
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {problem.timeLimit} • {problem.memoryLimit}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Code />}
                  color={getStatusColor(problem.status)}
                >
                  {problem.status === 'solved'
                    ? 'View Solution'
                    : 'Solve Problem'}
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
                    backgroundColor: achievement.achieved
                      ? `${achievement.color}.light`
                      : 'grey.100',
                    color: achievement.achieved
                      ? `${achievement.color}.main`
                      : 'grey.500',
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

                {achievement.achieved ? (
                  <Box>
                    <Chip
                      label="Achieved!"
                      color="success"
                      size="small"
                      icon={<Star />}
                      sx={{ mb: 1 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {achievement.date}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
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
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* AI Competition Assistant */}
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
              AI Competition Assistant
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
              Get real-time hints, performance analysis, and personalized
              contest recommendations
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
                Get AI Hints
              </Button>
              <Button
                variant="outlined"
                startIcon={<TrendingUp />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Performance Analysis
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

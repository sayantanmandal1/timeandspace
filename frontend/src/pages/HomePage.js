import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  Rating,
  LinearProgress,
  IconButton,
  Tooltip,
  Container,
  Stack,
  Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  Code,
  Speed,
  Psychology,
  School,
  EmojiEvents,
  Group,
  Analytics,
  AutoAwesome,
  RocketLaunch,
  Star,
  TrendingUp,
  Security,
  Cloud,
  Support,
  PlayArrow,
  ArrowForward,
  CheckCircle,
  Timeline,
  Lightbulb,
  WorkspacePremium,
} from '@mui/icons-material';

const features = [
  {
    icon: <Psychology sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'AI-Powered Analysis',
    description:
      'Advanced machine learning algorithms provide intelligent code insights and optimization suggestions',
    color: 'primary',
  },
  {
    icon: <Speed sx={{ fontSize: 40, color: 'success.main' }} />,
    title: 'Real-time Execution',
    description:
      'Execute code instantly with step-by-step visualization and performance metrics',
    color: 'success',
  },
  {
    icon: <School sx={{ fontSize: 40, color: 'warning.main' }} />,
    title: 'Interactive Learning',
    description:
      'Learn DSA concepts through interactive tutorials and hands-on coding challenges',
    color: 'warning',
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 40, color: 'error.main' }} />,
    title: 'Competitive Programming',
    description:
      'Participate in coding contests and compete with developers worldwide',
    color: 'error',
  },
  {
    icon: <Group sx={{ fontSize: 40, color: 'info.main' }} />,
    title: 'Community Features',
    description:
      'Connect with fellow developers, share solutions, and collaborate on projects',
    color: 'info',
  },
  {
    icon: <Analytics sx={{ fontSize: 40, color: 'secondary.main' }} />,
    title: 'Advanced Analytics',
    description:
      'Track your progress, analyze performance patterns, and optimize your learning',
    color: 'secondary',
  },
];

const stats = [
  { label: 'Active Users', value: '50K+', icon: <Group /> },
  { label: 'Problems Solved', value: '1M+', icon: <CheckCircle /> },
  { label: 'Countries', value: '150+', icon: <Cloud /> },
  { label: 'Success Rate', value: '95%', icon: <TrendingUp /> },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Software Engineer',
    company: 'Google',
    avatar: 'SC',
    rating: 5,
    text: 'This platform revolutionized how I approach DSA problems. The AI insights are incredibly accurate!',
    color: 'primary',
  },
  {
    name: 'Alex Rodriguez',
    role: 'Software Developer',
    company: 'Microsoft',
    avatar: 'AR',
    rating: 5,
    text: 'The step-by-step visualization helped me understand complex algorithms in ways I never thought possible.',
    color: 'success',
  },
  {
    name: 'Priya Patel',
    role: 'Data Scientist',
    company: 'Amazon',
    avatar: 'PP',
    rating: 5,
    text: 'Perfect for interview preparation. The competitive programming features are top-notch!',
    color: 'warning',
  },
];

const learningPaths = [
  {
    title: 'Beginner',
    description: 'Start your DSA journey',
    topics: ['Basic Data Structures', 'Simple Algorithms', 'Problem Solving'],
    progress: 0,
    color: 'success',
  },
  {
    title: 'Intermediate',
    description: 'Master advanced concepts',
    topics: [
      'Graph Algorithms',
      'Dynamic Programming',
      'Advanced Data Structures',
    ],
    progress: 0,
    color: 'warning',
  },
  {
    title: 'Advanced',
    description: 'Become a DSA expert',
    topics: [
      'Competitive Programming',
      'System Design',
      'Algorithm Optimization',
    ],
    progress: 0,
    color: 'error',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" gutterBottom sx={{ fontWeight: 800 }}>
                Master DSA with
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    ml: 1,
                  }}
                >
                  AI-Powered
                </Box>
                Insights
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}
              >
                The most advanced platform for learning Data Structures &
                Algorithms. Visualize, analyze, and optimize your code with
                cutting-edge AI technology.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={() => navigate('/analyze')}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  Start Analyzing
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<School />}
                  onClick={() => navigate('/learning')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Explore Learning
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Paper
                  sx={{
                    p: 4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.2)',
                    maxWidth: 400,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <RocketLaunch
                      sx={{ fontSize: 32, mr: 2, color: '#FFD700' }}
                    />
                    <Typography variant="h6" fontWeight={600}>
                      Live Code Analysis
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                    Experience real-time code execution with step-by-step
                    visualization
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label="Python"
                      size="small"
                      sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    />
                    <Chip
                      label="Java"
                      size="small"
                      sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    />
                    <Chip
                      label="C++"
                      size="small"
                      sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    />
                    <Chip
                      label="JavaScript"
                      size="small"
                      sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 1 }}>{stat.icon}</Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" gutterBottom fontWeight={700}>
            Why Choose DSA Visualizer Pro?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Built with cutting-edge technology to provide the most comprehensive
            DSA learning experience
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Chip
                    label={
                      feature.color === 'primary'
                        ? 'AI'
                        : feature.color === 'success'
                          ? 'Fast'
                          : feature.color === 'warning'
                            ? 'Learn'
                            : feature.color === 'error'
                              ? 'Compete'
                              : feature.color === 'info'
                                ? 'Connect'
                                : 'Analyze'
                    }
                    color={feature.color}
                    size="small"
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Learning Paths Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Choose Your Learning Path
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Structured learning paths designed for every skill level
          </Typography>
        </Box>

        <Grid container spacing={4}>
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
                  {path.topics.map((topic, idx) => (
                    <Box
                      key={idx}
                      sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                    >
                      <CheckCircle
                        sx={{ fontSize: 16, color: 'success.main', mr: 1 }}
                      />
                      <Typography variant="body2">{topic}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/learning')}
                >
                  Start Learning
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom fontWeight={700}>
            What Our Users Say
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Join thousands of satisfied developers worldwide
          </Typography>
        </Box>

        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                backgroundColor: `${testimonials[currentTestimonial].color}.main`,
                fontSize: '1.5rem',
                fontWeight: 600,
              }}
            >
              {testimonials[currentTestimonial].avatar}
            </Avatar>
            <Rating
              value={testimonials[currentTestimonial].rating}
              readOnly
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" gutterBottom fontWeight={600}>
              {testimonials[currentTestimonial].name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {testimonials[currentTestimonial].role} at{' '}
              {testimonials[currentTestimonial].company}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontStyle: 'italic', maxWidth: 600, mx: 'auto' }}
            >
              "{testimonials[currentTestimonial].text}"
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            {testimonials.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    index === currentTestimonial ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </Box>
        </Paper>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <AutoAwesome sx={{ fontSize: 48, mb: 2, color: '#FFD700' }} />
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Ready to Master DSA?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join the most advanced DSA learning platform and accelerate your
            career
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<RocketLaunch />}
              onClick={() => navigate('/analyze')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<WorkspacePremium />}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Upgrade to Pro
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

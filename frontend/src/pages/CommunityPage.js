import React, { useState } from 'react';
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
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Group,
  Forum,
  Psychology,
  School,
  EmojiEvents,
  Star,
  AutoAwesome,
  Bookmark,
  Share,
  Comment,
  Visibility,
  ThumbUp,
} from '@mui/icons-material';

const forumTopics = [
  {
    id: 1,
    title: 'How to approach Dynamic Programming problems?',
    author: {
      name: 'Sarah Chen',
      avatar: 'SC',
      reputation: 1250,
      level: 'Expert',
    },
    category: 'Algorithms',
    tags: ['Dynamic Programming', 'Problem Solving', 'Beginner'],
    replies: 24,
    views: 1560,
    likes: 89,
    isSolved: true,
    lastActivity: '2 hours ago',
    isPinned: true,
  },
  {
    id: 2,
    title: 'Best practices for optimizing time complexity',
    author: {
      name: 'Alex Rodriguez',
      avatar: 'AR',
      reputation: 890,
      level: 'Advanced',
    },
    category: 'Optimization',
    tags: ['Time Complexity', 'Performance', 'Tips'],
    replies: 18,
    views: 890,
    likes: 45,
    isSolved: false,
    lastActivity: '5 hours ago',
    isPinned: false,
  },
  {
    id: 3,
    title: 'Graph algorithms for competitive programming',
    author: {
      name: 'Priya Patel',
      avatar: 'PP',
      reputation: 2100,
      level: 'Master',
    },
    category: 'Graph Theory',
    tags: ['Graphs', 'Competitive Programming', 'Advanced'],
    replies: 32,
    views: 2100,
    likes: 120,
    isSolved: true,
    lastActivity: '1 day ago',
    isPinned: false,
  },
];

const communityMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    username: 'sarah_chen',
    avatar: 'SC',
    reputation: 1250,
    level: 'Expert',
    problemsSolved: 156,
    contestsWon: 12,
    joinDate: '2023-01-15',
    badges: ['Problem Solver', 'Contest Winner', 'Helpful Member'],
    isOnline: true,
    specialty: 'Dynamic Programming',
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    username: 'alex_rodriguez',
    avatar: 'AR',
    reputation: 890,
    level: 'Advanced',
    problemsSolved: 98,
    contestsWon: 5,
    joinDate: '2023-03-20',
    badges: ['Quick Learner', 'Team Player'],
    isOnline: false,
    specialty: 'Graph Algorithms',
  },
  {
    id: 3,
    name: 'Priya Patel',
    username: 'priya_patel',
    avatar: 'PP',
    reputation: 2100,
    level: 'Master',
    problemsSolved: 234,
    contestsWon: 18,
    joinDate: '2022-11-10',
    badges: ['Algorithm Master', 'Mentor', 'Contest Champion'],
    isOnline: true,
    specialty: 'Competitive Programming',
  },
];

const studyGroups = [
  {
    id: 1,
    name: 'DSA Study Group',
    description: 'Weekly study sessions for Data Structures and Algorithms',
    members: 45,
    maxMembers: 50,
    level: 'Intermediate',
    topics: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming'],
    nextMeeting: '2024-01-16T18:00:00Z',
    isPublic: true,
    creator: 'Sarah Chen',
  },
  {
    id: 2,
    name: 'Competitive Programming Team',
    description: 'Prepare for coding contests together',
    members: 12,
    maxMembers: 15,
    level: 'Advanced',
    topics: ['Advanced Algorithms', 'Contest Strategies', 'Problem Solving'],
    nextMeeting: '2024-01-18T20:00:00Z',
    isPublic: false,
    creator: 'Priya Patel',
  },
  {
    id: 3,
    name: 'Beginner Friendly Group',
    description: 'Perfect for newcomers to DSA',
    members: 78,
    maxMembers: 100,
    level: 'Beginner',
    topics: ['Basic Concepts', 'Simple Algorithms', 'Problem Solving'],
    nextMeeting: '2024-01-15T16:00:00Z',
    isPublic: true,
    creator: 'Alex Rodriguez',
  },
];

const events = [
  {
    id: 1,
    title: 'DSA Workshop: Advanced Graph Algorithms',
    description: 'Learn advanced graph algorithms with hands-on practice',
    date: '2024-01-20T14:00:00Z',
    duration: '3 hours',
    attendees: 120,
    maxAttendees: 150,
    host: 'Dr. Sarah Chen',
    type: 'Workshop',
    isFree: true,
  },
  {
    id: 2,
    title: 'Competitive Programming Contest',
    description: 'Monthly coding contest with prizes',
    date: '2024-01-25T10:00:00Z',
    duration: '4 hours',
    attendees: 89,
    maxAttendees: 200,
    host: 'Priya Patel',
    type: 'Contest',
    isFree: false,
    price: '$10',
  },
  {
    id: 3,
    title: 'Interview Preparation Session',
    description: 'Mock interviews and problem-solving strategies',
    date: '2024-01-22T19:00:00Z',
    duration: '2 hours',
    attendees: 45,
    maxAttendees: 50,
    host: 'Alex Rodriguez',
    type: 'Interview Prep',
    isFree: false,
    price: '$15',
  },
];

export default function CommunityPage() {
  const [tabValue, setTabValue] = useState(0);
  const [showNewTopicDialog, setShowNewTopicDialog] = useState(false);
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      case 'Expert':
        return 'primary';
      case 'Master':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Workshop':
        return 'primary';
      case 'Contest':
        return 'error';
      case 'Interview Prep':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Community Hub
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Connect with fellow developers, share knowledge, and grow together
        </Typography>
      </Box>

      {/* Community Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              15.2K
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Members
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="success.main">
              2.8K
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Topics Discussed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="warning.main">
              156
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Study Groups
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="error.main">
              89
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Events This Month
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Forum" icon={<Forum />} iconPosition="start" />
          <Tab label="Members" icon={<Group />} iconPosition="start" />
          <Tab label="Study Groups" icon={<School />} iconPosition="start" />
          <Tab label="Events" icon={<EmojiEvents />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Box>
          {/* Forum Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {/* Removed Search and Category Select */}
              <Button
                variant="contained"
                startIcon={<Forum />} // Changed from Add to Forum
                onClick={() => setShowNewTopicDialog(true)}
              >
                New Topic
              </Button>
            </Box>
            {/* Removed New Topic Button */}
          </Box>

          {/* Forum Topics */}
          <Stack spacing={2}>
            {forumTopics.map((topic) => (
              <Paper key={topic.id} sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {topic.author.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {topic.title}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          by {topic.author.name}
                        </Typography>
                        <Chip
                          label={topic.author.level}
                          size="small"
                          color={getLevelColor(topic.author.level)}
                        />
                        {topic.isPinned && (
                          <Chip
                            label="Pinned"
                            size="small"
                            color="warning"
                            icon={<Star />}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <Bookmark />
                    </IconButton>
                    <IconButton size="small">
                      <Share />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  {topic.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <Comment sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {topic.replies} replies
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <Visibility
                        sx={{ fontSize: 16, color: 'text.secondary' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {topic.views} views
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <ThumbUp sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {topic.likes} likes
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {topic.lastActivity}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {communityMembers.map((member) => (
            <Grid item xs={12} md={6} lg={4} key={member.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: member.isOnline
                              ? 'success.main'
                              : 'grey.400',
                            border: '2px solid white',
                          }}
                        />
                      }
                    >
                      <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                        {member.avatar}
                      </Avatar>
                    </Badge>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{member.username}
                      </Typography>
                      <Chip
                        label={member.level}
                        size="small"
                        color={getLevelColor(member.level)}
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Reputation: {member.reputation}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Problems Solved: {member.problemsSolved}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Contests Won: {member.contestsWon}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Specialty: {member.specialty}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Badges:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {member.badges.map((badge, index) => (
                        <Chip
                          key={index}
                          label={badge}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button variant="outlined" fullWidth>
                    View Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 2 && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Study Groups
            </Typography>
            <Button
              variant="contained"
              startIcon={<Forum />} // Changed from Add to Forum
              onClick={() => setShowNewGroupDialog(true)}
            >
              Create Group
            </Button>
          </Box>

          <Grid container spacing={3}>
            {studyGroups.map((group) => (
              <Grid item xs={12} md={6} lg={4} key={group.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        {group.name}
                      </Typography>
                      <Chip
                        label={group.isPublic ? 'Public' : 'Private'}
                        size="small"
                        color={group.isPublic ? 'success' : 'warning'}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {group.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" fontWeight={600} gutterBottom>
                        Topics:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {group.topics.map((topic, index) => (
                          <Chip
                            key={index}
                            label={topic}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {group.members}/{group.maxMembers} members
                      </Typography>
                      <Chip
                        label={group.level}
                        size="small"
                        color={getLevelColor(group.level)}
                      />
                    </Box>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Next meeting:{' '}
                      {new Date(group.nextMeeting).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button variant="contained" fullWidth>
                      Join Group
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card sx={{ height: '100%' }}>
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
                      label={event.type}
                      color={getEventTypeColor(event.type)}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(event.date).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {event.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {event.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Host: {event.host}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Duration: {event.duration}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Attendees: {event.attendees}/{event.maxAttendees}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      color={event.isFree ? 'success.main' : 'primary.main'}
                    >
                      {event.isFree ? 'Free' : event.price}
                    </Typography>
                    <Button variant="contained" size="small">
                      Register
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* AI Community Assistant */}
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
              AI Community Assistant
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
              Get personalized study recommendations, find study partners, and
              connect with mentors
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
                Find Study Partner
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
                Get Recommendations
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <AutoAwesome sx={{ fontSize: 64, color: '#FFD700' }} />
          </Grid>
        </Grid>
      </Paper>

      {/* Dialogs */}
      <Dialog
        open={showNewTopicDialog}
        onClose={() => setShowNewTopicDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Topic</DialogTitle>
        <DialogContent>
          {/* Removed TextField for Topic Title */}
          {/* Removed TextField for Description */}
          {/* Removed FormControl for Category */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewTopicDialog(false)}>Cancel</Button>
          <Button variant="contained">Create Topic</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showNewGroupDialog}
        onClose={() => setShowNewGroupDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Study Group</DialogTitle>
        <DialogContent>
          {/* Removed TextField for Group Name */}
          {/* Removed TextField for Description */}
          {/* Removed FormControl for Level */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewGroupDialog(false)}>Cancel</Button>
          <Button variant="contained">Create Group</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

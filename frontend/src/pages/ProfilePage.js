import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Container,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Badge,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  School,
  EmojiEvents,
  TrendingUp,
  Code,
  Psychology,
  Settings,
  Security,
  Notifications,
  Visibility,
  VisibilityOff,
  Star,
  CheckCircle,
  Timeline,
  Assessment,
  Group,
  AutoAwesome,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../components/NotificationToast';

export default function ProfilePage() {
  const { user, updateProfile, changePassword, loading } = useAuth();
  const { success, error: showError } = useNotification();
  
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    bio: user?.bio || '',
    experience: user?.experience || 'beginner',
    interests: user?.interests || [],
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    publicProfile: true,
  });

  const [errors, setErrors] = useState({});

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3+ years)' },
  ];

  const interests = [
    'Algorithms', 'Data Structures', 'Dynamic Programming', 'Graph Theory',
    'Competitive Programming', 'System Design', 'Machine Learning', 'Web Development'
  ];

  const achievements = [
    { id: 1, title: 'First Problem Solved', description: 'Solved your first coding problem', icon: '🎯', earned: true },
    { id: 2, title: 'Algorithm Master', description: 'Completed 50 algorithm problems', icon: '🧠', earned: true },
    { id: 3, title: 'Speed Demon', description: 'Solved 10 problems in under 30 minutes', icon: '⚡', earned: false },
    { id: 4, title: 'Community Helper', description: 'Helped 25 other users', icon: '🤝', earned: false },
    { id: 5, title: 'Perfect Score', description: 'Achieved 100% on a competition', icon: '🏆', earned: false },
  ];

  const stats = {
    problemsSolved: 156,
    competitionsWon: 12,
    streakDays: 45,
    totalXP: 1240,
    rank: 'Expert',
    accuracy: 87,
  };

  const recentActivity = [
    { type: 'problem_solved', title: 'Two Sum', difficulty: 'Easy', time: '2 hours ago' },
    { type: 'competition_joined', title: 'Weekly Challenge', time: '1 day ago' },
    { type: 'achievement_earned', title: 'Algorithm Master', time: '3 days ago' },
    { type: 'course_completed', title: 'Dynamic Programming Basics', time: '1 week ago' },
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const result = await updateProfile(profileData);
      if (result.success) {
        setIsEditing(false);
      }
    } catch (err) {
      showError('Failed to update profile');
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showError('Password must be at least 8 characters');
      return;
    }

    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (result.success) {
        setShowPasswordDialog(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      showError('Failed to change password');
    }
  };

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'problem_solved': return <Code color="success" />;
      case 'competition_joined': return <EmojiEvents color="primary" />;
      case 'achievement_earned': return <Star color="warning" />;
      case 'course_completed': return <School color="info" />;
      default: return <Timeline color="action" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'problem_solved': return 'success';
      case 'competition_joined': return 'primary';
      case 'achievement_earned': return 'warning';
      case 'course_completed': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Avatar sx={{ width: 20, height: 20, bgcolor: 'success.main' }}>
                <CheckCircle sx={{ fontSize: 12 }} />
              </Avatar>
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, fontSize: '2rem', bgcolor: 'primary.main' }}
            >
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </Avatar>
          </Badge>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              @{user?.username}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label={stats.rank} color="primary" size="small" />
              <Chip label={`${stats.streakDays} day streak`} color="success" size="small" />
              <Chip label={`${stats.totalXP} XP`} color="warning" size="small" />
            </Box>
          </Box>
          
          <Button
            variant={isEditing ? "contained" : "outlined"}
            startIcon={isEditing ? <Save /> : <Edit />}
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            disabled={loading}
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </Button>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {user?.bio || "Passionate about algorithms and data structures. Always learning and improving!"}
        </Typography>

        {/* Stats Grid */}
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="primary" fontWeight={700}>
                {stats.problemsSolved}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Problems Solved
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="success" fontWeight={700}>
                {stats.competitionsWon}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Competitions Won
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="warning" fontWeight={700}>
                {stats.streakDays}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Day Streak
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="info" fontWeight={700}>
                {stats.accuracy}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accuracy
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Profile" icon={<School />} iconPosition="start" />
          <Tab label="Achievements" icon={<EmojiEvents />} iconPosition="start" />
          <Tab label="Activity" icon={<Timeline />} iconPosition="start" />
          <Tab label="Settings" icon={<Settings />} iconPosition="start" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Personal Information
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={profileData.username}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  multiline
                  rows={3}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  select
                  label="Experience Level"
                  name="experience"
                  value={profileData.experience}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  sx={{ mb: 2 }}
                >
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Areas of Interest
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {interests.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      onClick={isEditing ? () => handleInterestToggle(interest) : undefined}
                      color={profileData.interests.includes(interest) ? 'primary' : 'default'}
                      variant={profileData.interests.includes(interest) ? 'filled' : 'outlined'}
                      clickable={isEditing}
                    />
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Account Security
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Security />}
                  onClick={() => setShowPasswordDialog(true)}
                  sx={{ mb: 2 }}
                >
                  Change Password
                </Button>

                <Typography variant="body2" color="text.secondary">
                  Last login: {new Date().toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Your Achievements
              </Typography>
              <Grid container spacing={2}>
                {achievements.map((achievement) => (
                  <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                    <Card sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      opacity: achievement.earned ? 1 : 0.6,
                      position: 'relative'
                    }}>
                      <Typography variant="h2" sx={{ mb: 1 }}>
                        {achievement.icon}
                      </Typography>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {achievement.description}
                      </Typography>
                      <Chip
                        label={achievement.earned ? 'Earned' : 'Locked'}
                        color={achievement.earned ? 'success' : 'default'}
                        size="small"
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      {getActivityIcon(activity.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.title}
                      secondary={activity.time}
                    />
                    <Chip
                      label={activity.difficulty || activity.type.replace('_', ' ')}
                      color={getActivityColor(activity.type)}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Notifications
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Email Notifications"
                      secondary="Receive updates via email"
                    />
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={() => handleSettingChange('emailNotifications')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Push Notifications"
                      secondary="Receive browser notifications"
                    />
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={() => handleSettingChange('pushNotifications')}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Preferences
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Dark Mode"
                      secondary="Use dark theme"
                    />
                    <Switch
                      checked={settings.darkMode}
                      onChange={() => handleSettingChange('darkMode')}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Public Profile"
                      secondary="Allow others to view your profile"
                    />
                    <Switch
                      checked={settings.publicProfile}
                      onChange={() => handleSettingChange('publicProfile')}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Current Password"
            type={showPassword ? 'text' : 'password'}
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            name="currentPassword"
            sx={{ mb: 2, mt: 1 }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <TextField
            fullWidth
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            name="newPassword"
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            name="confirmPassword"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} variant="contained" disabled={loading}>
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 
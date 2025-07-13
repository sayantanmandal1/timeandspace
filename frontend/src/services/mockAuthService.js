// Mock authentication service for development
// This simulates backend API calls and stores data in localStorage

const MOCK_USERS_KEY = 'mock_users';
const MOCK_TOKENS_KEY = 'mock_tokens';

// Initialize mock data if not exists
if (!localStorage.getItem(MOCK_USERS_KEY)) {
  const mockUsers = [
    {
      id: 1,
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@dsavisualizer.com',
      username: 'demo_user',
      password: 'demo123', // In real app, this would be hashed
      experience: 'intermediate',
      interests: ['Algorithms', 'Data Structures', 'Dynamic Programming'],
      bio: 'Passionate about algorithms and data structures. Always learning and improving!',
      createdAt: new Date().toISOString(),
    }
  ];
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(mockUsers));
}

if (!localStorage.getItem(MOCK_TOKENS_KEY)) {
  localStorage.setItem(MOCK_TOKENS_KEY, JSON.stringify({}));
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateToken = () => {
  return 'mock_token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

const hashPassword = (password) => {
  // Simple hash for demo - in real app use bcrypt or similar
  return btoa(password);
};

const verifyPassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};

export const mockAuthService = {
  // Register new user
  async register(userData) {
    await delay(1000); // Simulate network delay
    
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    
    // Check if email already exists
    if (users.find(user => user.email === userData.email)) {
      throw new Error('Email already registered');
    }
    
    // Check if username already exists
    if (users.find(user => user.username === userData.username)) {
      throw new Error('Username already taken');
    }
    
    const newUser = {
      id: users.length + 1,
      ...userData,
      password: hashPassword(userData.password),
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    
    // Generate token
    const token = generateToken();
    const tokens = JSON.parse(localStorage.getItem(MOCK_TOKENS_KEY) || '{}');
    tokens[token] = newUser.id;
    localStorage.setItem(MOCK_TOKENS_KEY, JSON.stringify(tokens));
    
    // Return user data without password
    const { password, ...userWithoutPassword } = newUser;
    
    return {
      success: true,
      token,
      user: userWithoutPassword,
    };
  },

  // Login user
  async login(email, password) {
    await delay(1000); // Simulate network delay
    
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user || !verifyPassword(password, user.password)) {
      throw new Error('Invalid email or password');
    }
    
    // Generate token
    const token = generateToken();
    const tokens = JSON.parse(localStorage.getItem(MOCK_TOKENS_KEY) || '{}');
    tokens[token] = user.id;
    localStorage.setItem(MOCK_TOKENS_KEY, JSON.stringify(tokens));
    
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      token,
      user: userWithoutPassword,
    };
  },

  // Get user by token
  async getUserByToken(token) {
    await delay(500); // Simulate network delay
    
    const tokens = JSON.parse(localStorage.getItem(MOCK_TOKENS_KEY) || '{}');
    const userId = tokens[token];
    
    if (!userId) {
      throw new Error('Invalid token');
    }
    
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Return user data without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Update user profile
  async updateProfile(token, profileData) {
    await delay(1000); // Simulate network delay
    
    const tokens = JSON.parse(localStorage.getItem(MOCK_TOKENS_KEY) || '{}');
    const userId = tokens[token];
    
    if (!userId) {
      throw new Error('Invalid token');
    }
    
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update user data (don't allow password change here)
    const { password, ...updateData } = profileData;
    users[userIndex] = { ...users[userIndex], ...updateData };
    
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    
    // Return updated user data without password
    const { password: _, ...userWithoutPassword } = users[userIndex];
    
    return {
      success: true,
      user: userWithoutPassword,
    };
  },

  // Change password
  async changePassword(token, currentPassword, newPassword) {
    await delay(1000); // Simulate network delay
    
    const tokens = JSON.parse(localStorage.getItem(MOCK_TOKENS_KEY) || '{}');
    const userId = tokens[token];
    
    if (!userId) {
      throw new Error('Invalid token');
    }
    
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const user = users[userIndex];
    
    // Verify current password
    if (!verifyPassword(currentPassword, user.password)) {
      throw new Error('Current password is incorrect');
    }
    
    // Update password
    users[userIndex].password = hashPassword(newPassword);
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    
    return {
      success: true,
      message: 'Password changed successfully',
    };
  },

  // Forgot password (mock implementation)
  async forgotPassword(email) {
    await delay(1000); // Simulate network delay
    
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Email not found');
    }
    
    // In a real app, this would send an email
    console.log(`Password reset email would be sent to ${email}`);
    
    return {
      success: true,
      message: 'Password reset email sent',
    };
  },

  // Reset password (mock implementation)
  async resetPassword(token, newPassword) {
    await delay(1000); // Simulate network delay
    
    // In a real app, this would verify the reset token
    console.log(`Password would be reset with token: ${token}`);
    
    return {
      success: true,
      message: 'Password reset successfully',
    };
  },

  // Logout (remove token)
  async logout(token) {
    await delay(500); // Simulate network delay
    
    const tokens = JSON.parse(localStorage.getItem(MOCK_TOKENS_KEY) || '{}');
    delete tokens[token];
    localStorage.setItem(MOCK_TOKENS_KEY, JSON.stringify(tokens));
    
    return {
      success: true,
      message: 'Logged out successfully',
    };
  },
}; 
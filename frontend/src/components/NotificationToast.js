import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { createPortal } from 'react-dom';

export const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const addNotification = useCallback(
    (notification) => {
      const id = Date.now() + Math.random();
      const newNotification = {
        id,
        severity: 'info',
        title: '',
        message: '',
        duration: 6000,
        action: null,
        ...notification,
      };

      setNotifications((prev) => [...prev, newNotification]);

      // Auto remove after duration
      if (newNotification.duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, newNotification.duration);
      }

      return id;
    },
    [removeNotification]
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback(
    (message, title = 'Success', options = {}) => {
      return addNotification({
        severity: 'success',
        message,
        title,
        ...options,
      });
    },
    [addNotification]
  );

  const error = useCallback(
    (message, title = 'Error', options = {}) => {
      return addNotification({ severity: 'error', message, title, ...options });
    },
    [addNotification]
  );

  const warning = useCallback(
    (message, title = 'Warning', options = {}) => {
      return addNotification({
        severity: 'warning',
        message,
        title,
        ...options,
      });
    },
    [addNotification]
  );

  const info = useCallback(
    (message, title = 'Info', options = {}) => {
      return addNotification({ severity: 'info', message, title, ...options });
    },
    [addNotification]
  );

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      case 'info':
        return '#2196F3';
      default:
        return '#2196F3';
    }
  };

  return createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxWidth: 400,
        width: '100%',
      }}
    >
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          severity={notification.severity}
          onClose={() => removeNotification(notification.id)}
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => removeNotification(notification.id)}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: 2,
            border: `1px solid ${getSeverityColor(notification.severity)}20`,
            '& .MuiAlert-icon': {
              color: getSeverityColor(notification.severity),
            },
          }}
        >
          {notification.title && (
            <AlertTitle sx={{ fontWeight: 600 }}>
              {notification.title}
            </AlertTitle>
          )}
          <Typography variant="body2">{notification.message}</Typography>
          {notification.action && (
            <Box sx={{ mt: 1 }}>{notification.action}</Box>
          )}
        </Alert>
      ))}
    </Box>,
    document.body
  );
};

// Toast notification component for simple messages
export const Toast = ({
  open,
  message,
  severity = 'info',
  onClose,
  duration = 6000,
  position = 'bottom-right',
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{
        vertical: position.includes('top') ? 'top' : 'bottom',
        horizontal: position.includes('left')
          ? 'left'
          : position.includes('right')
            ? 'right'
            : 'center',
      }}
      sx={{
        '& .MuiSnackbarContent-root': {
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationProvider;

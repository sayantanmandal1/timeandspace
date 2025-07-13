import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const LoadingSpinner = ({
  size = 'medium',
  variant = 'circular',
  message = 'Loading...',
  fullScreen = false,
  progress,
  showMessage = true,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 64;
      case 'medium':
      default:
        return 40;
    }
  };

  const getContainerStyles = () => {
    if (fullScreen) {
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      };
    }

    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      py: 4,
    };
  };

  if (variant === 'linear') {
    return (
      <Box sx={getContainerStyles()}>
        {progress !== undefined ? (
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 4 }}
            />
            {showMessage && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {message}{' '}
                {progress !== undefined && `(${Math.round(progress)}%)`}
              </Typography>
            )}
          </Box>
        ) : (
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <LinearProgress sx={{ height: 8, borderRadius: 4 }} />
            {showMessage && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: 'center' }}
              >
                {message}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={getContainerStyles()}>
      <CircularProgress size={getSize()} />
      {showMessage && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

// Skeleton loader component
export const SkeletonLoader = ({
  variant = 'rectangular',
  width = '100%',
  height = 20,
  animation = 'wave',
  count = 1,
}) => {
  const Skeleton = React.lazy(() => import('@mui/material/Skeleton'));

  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={width}
          height={height}
          animation={animation}
          sx={{ mb: index < count - 1 ? 1 : 0 }}
        />
      ))}
    </Box>
  );
};

export { LoadingButton };
export default LoadingSpinner;

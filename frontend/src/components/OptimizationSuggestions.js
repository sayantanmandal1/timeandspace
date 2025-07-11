import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';

export default function OptimizationSuggestions({ suggestions }) {
  if (!suggestions || suggestions.length === 0) {
    return <Typography>No optimization suggestions available.</Typography>;
  }
  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>Optimization Suggestions</Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {suggestions.map((s, idx) => (
          <Chip key={idx} label={s} color="primary" variant="outlined" sx={{ mb: 1 }} />
        ))}
      </Stack>
    </Box>
  );
} 
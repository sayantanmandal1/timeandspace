import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

export default function ComplexityChart({ complexity }) {
  if (!complexity) return <Typography>No complexity data available.</Typography>;
  const timeData = complexity.time_complexity
    ? Object.entries(complexity.time_complexity).map(([k, v]) => ({ name: k, value: v }))
    : [];
  const spaceData = complexity.space_complexity
    ? Object.entries(complexity.space_complexity).map(([k, v]) => ({ name: k, value: v }))
    : [];
  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>Time Complexity</Typography>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={timeData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="h6" gutterBottom mt={3}>Space Complexity</Typography>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={spaceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d">
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
} 
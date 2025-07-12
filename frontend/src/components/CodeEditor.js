import React from 'react';
import { TextField, Box } from '@mui/material';

const languageMap = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
};

export default function CodeEditor({ 
  value, 
  onChange, 
  language = 'python', 
  theme = 'monokai', 
  height = '600px',
  width = '100%',
  readOnly = false,
  ...props 
}) {
  const getLanguageColor = (lang) => {
    switch (lang) {
      case 'python': return '#3776ab';
      case 'javascript': return '#f7df1e';
      case 'java': return '#007396';
      case 'cpp': return '#00599c';
      case 'c': return '#a8b9cc';
      default: return '#3776ab';
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        multiline
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        disabled={readOnly}
        sx={{
          '& .MuiOutlinedInput-root': {
            fontFamily: "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontSize: '14px',
            backgroundColor: theme === 'monokai' ? '#272822' : '#f8f9fa',
            color: theme === 'monokai' ? '#f8f8f2' : '#333',
            minHeight: height,
            '& fieldset': {
              borderColor: getLanguageColor(language),
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: getLanguageColor(language),
            },
            '&.Mui-focused fieldset': {
              borderColor: getLanguageColor(language),
            },
          },
          '& .MuiInputBase-input': {
            padding: '16px',
            lineHeight: '1.5',
            tabSize: 2,
          },
        }}
        InputProps={{
          style: {
            fontFamily: "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontSize: '14px',
            lineHeight: '1.5',
          }
        }}
        {...props}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '8px',
          right: '12px',
          backgroundColor: getLanguageColor(language),
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        {language}
      </Box>
    </Box>
  );
} 
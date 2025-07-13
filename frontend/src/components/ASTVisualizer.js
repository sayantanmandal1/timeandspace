import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function ASTNodeTree({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth === 0);
  if (!node) return null;
  const hasChildren = node.children && node.children.length > 0;
  return (
    <Box ml={depth * 2}>
      <Box display="flex" alignItems="center">
        {hasChildren && (
          <IconButton size="small" onClick={() => setOpen((o) => !o)}>
            {open ? (
              <ExpandMoreIcon fontSize="small" />
            ) : (
              <ChevronRightIcon fontSize="small" />
            )}
          </IconButton>
        )}
        <Typography
          variant="body2"
          component="span"
          sx={{ fontWeight: depth === 0 ? 'bold' : 'normal' }}
        >
          {node.node_type || node.type} (line{' '}
          {node.line_number ?? node.start_point?.[0] ?? '-'}, col{' '}
          {node.column ?? node.start_point?.[1] ?? '-'})
        </Typography>
        {node.value && (
          <Typography variant="caption" color="text.secondary" ml={1}>
            {String(node.value).slice(0, 40)}
          </Typography>
        )}
      </Box>
      {hasChildren && open && (
        <Box>
          {node.children.map((child, idx) => (
            <ASTNodeTree key={idx} node={child} depth={depth + 1} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default function ASTVisualizer({ ast }) {
  if (!ast) return <Typography>No AST available.</Typography>;
  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        AST Visualization
      </Typography>
      <ASTNodeTree node={ast} />
    </Box>
  );
}

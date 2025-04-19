import React from 'react';
import { Typography, Box } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" color="error">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        Sorry, the page you're looking for doesn't exist.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;

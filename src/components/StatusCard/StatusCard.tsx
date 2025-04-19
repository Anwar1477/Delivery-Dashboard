import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { DeliveryStatus } from '../../types';

interface StatusCardProps {
  status: DeliveryStatus;
  count: number;
}

const statusColors = {
  Pending: '#ff9800',
  'In Transit': '#2196f3',
  Delivered: '#4caf50',
  'Not Delivered': '#f44336',
};

const StatusCard: React.FC<StatusCardProps> = ({ status, count }) => {
  return (
    <Card sx={{ minWidth: 200, backgroundColor: statusColors[status] }}>
      <CardContent>
        <Typography variant="h5" component="div" color="white">
          {status}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" color="white">
            {count}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
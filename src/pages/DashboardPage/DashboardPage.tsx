import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import StatusCard from '../../components/StatusCard/StatusCard';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadDeliveries } from '../../features/deliveries/deliveriesThunks';

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { deliveries, loading } = useAppSelector((state) => state.deliveries);

  useEffect(() => {
    dispatch(loadDeliveries());
  }, [dispatch]);

  const statusCounts = deliveries.reduce(
    (acc, delivery) => {
      acc[delivery.status] = (acc[delivery.status] || 0) + 1;
      return acc;
    },
    {
      Pending: 0,
      'In Transit': 0,
      Delivered: 0,
      'Not Delivered': 0,
    }
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Delivery Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
          <StatusCard status="Pending" count={statusCounts.Pending} />
          <StatusCard status="In Transit" count={statusCounts['In Transit']} />
          <StatusCard status="Delivered" count={statusCounts.Delivered} />
          <StatusCard status="Not Delivered" count={statusCounts['Not Delivered']} />
      </Grid>
    </Box>
  );
};

export default DashboardPage;
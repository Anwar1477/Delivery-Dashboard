import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import DeliveryTable from '../../components/DeliveryTable/DeliveryTable';
import DeliveryForm from '../../components/DeliveryForm/DeliveryForm';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadDeliveries } from '../../features/deliveries/deliveriesThunks';

const DeliveriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { deliveries, loading } = useAppSelector((state) => state.deliveries);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    dispatch(loadDeliveries());
  }, [dispatch]);

  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Deliveries</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddDialog(true)}
        >
          Add Delivery
        </Button>
      </Box>

      <TextField
        label="Search by recipient or address"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <DeliveryTable deliveries={filteredDeliveries} loading={loading} />

      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Delivery</DialogTitle>
        <DialogContent>
          <DeliveryForm onClose={() => setOpenAddDialog(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DeliveriesPage;
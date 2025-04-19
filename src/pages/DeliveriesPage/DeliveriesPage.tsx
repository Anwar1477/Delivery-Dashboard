import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
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

  const handleClearSearch = () => {
    setSearchTerm('');
  };

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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <TextField
          label="Search by recipient or address"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '50%', 
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
          InputProps={{
            startAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

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

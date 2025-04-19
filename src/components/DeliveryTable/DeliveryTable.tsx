import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridToolbar,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Delivery } from '../../types';
import { useAppDispatch } from '../../store';
import { deleteExistingDelivery } from '../../features/deliveries/deliveriesThunks';
import DeliveryForm from '../DeliveryForm/DeliveryForm';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface DeliveryTableProps {
  deliveries: Delivery[];
  loading: boolean;
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ deliveries, loading }) => {
  const dispatch = useAppDispatch();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEditClick = (id: GridRowId) => {
    const delivery = deliveries.find((d) => d.id === id);
    if (delivery) {
      setSelectedDelivery(delivery);
      setOpenEditDialog(true);
    }
  };

  const handleDeleteClick = (id: GridRowId) => {
    setSelectedId(id as string);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedId) {
      await dispatch(deleteExistingDelivery(selectedId));
      setOpenDeleteDialog(false);
      setSelectedId(null);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'serial',
      headerName: 'ID',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<any, any, any>) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'recipient', headerName: 'Recipient', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      type: 'singleSelect',
      valueOptions: ['Pending', 'In Transit', 'Delivered', 'Not Delivered'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditClick(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={deliveries}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        slots={{ toolbar: GridToolbar }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Delivery</DialogTitle>
        <DialogContent>
          {selectedDelivery && (
            <DeliveryForm
              delivery={selectedDelivery}
              onClose={() => setOpenEditDialog(false)}
              isEdit
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this delivery?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} color="error">
            Yes
          </Button>
          <Button onClick={() => setOpenDeleteDialog(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeliveryTable;

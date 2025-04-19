import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Delivery } from '../../types';

interface DeliveriesState {
  deliveries: Delivery[];
  loading: boolean;
  error: string | null;
}

const initialState: DeliveriesState = {
  deliveries: [],
  loading: false,
  error: null,
};

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    setDeliveries: (state, action: PayloadAction<Delivery[]>) => {
      state.deliveries = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addDelivery: (state, action: PayloadAction<Delivery>) => {
      state.deliveries.push(action.payload);
    },
    updateDelivery: (state, action: PayloadAction<Delivery>) => {
      const index = state.deliveries.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.deliveries[index] = action.payload;
      }
    },
    removeDelivery: (state, action: PayloadAction<string>) => {
      state.deliveries = state.deliveries.filter(d => d.id !== action.payload);
    },
  },
});

export const {
  setDeliveries,
  setLoading,
  setError,
  addDelivery,
  updateDelivery,
  removeDelivery,
} = deliveriesSlice.actions;

export default deliveriesSlice.reducer;
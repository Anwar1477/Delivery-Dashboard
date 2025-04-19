import { configureStore } from '@reduxjs/toolkit';
import deliveriesReducer from './features/deliveries/deliveriesSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    deliveries: deliveriesReducer,
  },
});

// 👇 Add these exports for typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

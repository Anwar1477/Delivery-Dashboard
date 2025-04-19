import { AppDispatch } from '../../store';
import {
  fetchDeliveries,
  fetchDeliveryById,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from '../../api/deliveryApi';
import {
  setDeliveries,
  setLoading,
  setError,
  addDelivery,
  updateDelivery as updateDeliveryAction,
  removeDelivery,
} from './deliveriesSlice';
import { Delivery } from '../../types';

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

// Helper function to get error message
function getErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) return error.message;
  return 'An unknown error occurred';
}

export const loadDeliveries = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const deliveries = await fetchDeliveries();
    dispatch(setDeliveries(deliveries));
  } catch (error) {
    dispatch(setError(getErrorMessage(error)));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addNewDelivery = (deliveryData: Omit<Delivery, 'id'>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const newDelivery = await createDelivery(deliveryData);
    dispatch(addDelivery(newDelivery));
    return newDelivery;
  } catch (error) {
    dispatch(setError(getErrorMessage(error)));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const editDelivery = (id: string, deliveryData: Partial<Delivery>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const updatedDelivery = await updateDelivery(id, deliveryData);
    dispatch(updateDeliveryAction(updatedDelivery));
  } catch (error) {
    dispatch(setError(getErrorMessage(error)));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteExistingDelivery = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await deleteDelivery(id);
    dispatch(removeDelivery(id));
  } catch (error) {
    dispatch(setError(getErrorMessage(error)));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};
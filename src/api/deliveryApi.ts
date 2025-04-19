import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchDeliveries = async () => {
  const response = await axios.get(`${API_BASE_URL}/deliveries`);
  return response.data;
};

export const fetchDeliveryById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/deliveries/${id}`);
  return response.data;
};

export const createDelivery = async (delivery: any) => {
  const response = await axios.post(`${API_BASE_URL}/deliveries`, delivery);
  return response.data;
};

export const updateDelivery = async (id: string, delivery: any) => {
  const response = await axios.put(`${API_BASE_URL}/deliveries/${id}`, delivery);
  return response.data;
};

export const deleteDelivery = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/deliveries/${id}`);
  return response.data;
};
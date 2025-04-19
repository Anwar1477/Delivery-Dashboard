export type DeliveryStatus = 'Pending' | 'In Transit' | 'Delivered' | 'Not Delivered';

export interface Delivery {
  id: string;
  date: string;
  recipient: string;
  address: string;
  status: DeliveryStatus;
}
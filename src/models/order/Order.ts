import KeyedItem from "../base/Item";

export type Order = KeyedItem & {
  companyId: string;
  userId: string;
  locationId: string;

  status: OrderStatus;
  type: string;
  description: string;

  orderItems: OrderItem[];
};

export enum OrderStatus {
  Pending = "Pending",
  InProgress = "InProgress",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export type OrderItem = {
  id: string; // Assuming BaseModel includes an `id`
  orderId: string;
  price: number;
  quantity: number;
  title: string;
};

import { CreateLocationRequestModel } from "@/models/location/Requests/CreateLocationRequest";
import { CreateUserRequestModel } from "@/models/user/request/CreateUseRequest";
import { Order, OrderItem, OrderType } from "../Order";

export type CreateOrderModel = Partial<Order> & {
  companyId: string;
  user?: CreateUserRequestModel;
  location: CreateLocationRequestModel;
  type: OrderType;
  description: string;
  orderItems: OrderItem[];
};

import { CrudServiceType, crudService } from "./crudService";
import { RestClient } from "./restClient";
import { Order } from "@/models/order/Order";

export type OrderServiceType = CrudServiceType<Order>;

export const OrderServices = (
  client: RestClient,
  path: string
): OrderServiceType => ({
  ...crudService<Order>(client, path),
});

export default OrderServices;

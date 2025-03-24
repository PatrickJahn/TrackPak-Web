import { PATH_KEYS } from "../services/appServices";
import { useItemsCrud } from "./common/useItemsCrud";
import { useItemService } from "./common/useServices";
import { Order } from "@/models/order/Order";

const useOrders = () => {
  /**** Services ****/
  const orderService = useItemService((services) => services.orderService);

  const ordersCrud = useItemsCrud<Order>(
    [PATH_KEYS.orders],
    (services) => services.orderService
  );

  /**** Queries & Mutations ****/

  /**** Value ****/
  return {
    ...ordersCrud,
    orderService,
  };
};

export default useOrders;

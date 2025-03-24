import useOrders from "@/hooks/useOrders";
import { OrderStatus, OrderType } from "@/models/order/Order";
import { useParams } from "react-router-dom";
import UserInformationBox from "./components/UserInformationBox";
import OrderTrackingBox from "./components/OrderTrackingBox";

const OrdersView = () => {
  const { useQuerySingle } = useOrders();
  const { id } = useParams();

  const { data: order } = useQuerySingle(id ?? "");

  const getTotalAmount = () => {
    return (
      order?.orderItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ) ?? 0
    );
  };
  return (
    <div className="flex gap-4">
      <div className="w-1/2 flex flex-col gap-4">
        <div className="w-full rounded p-4 min-h-44 bg-white">
          <h1 className="text-xl font-semibold">Order Overview</h1>

          {order ? (
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Order ID</div>
                <div className="text-md font-medium">{order.id}</div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div
                    className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                      order.type === OrderType.Service
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.type}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div
                    className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                      order.status === OrderStatus.Cancelled
                        ? "bg-red-100 text-red-800"
                        : order.status === OrderStatus.Shipped
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Description</div>
                <div className="text-md">{order.description || "—"}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Items</div>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted text-left">
                      <tr>
                        <th className="p-3">Title</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3">Price</th>
                        <th className="p-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems?.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="p-3">{item.title}</td>
                          <td className="p-3">{item.quantity}</td>
                          <td className="p-3">${item.price.toFixed(2)}</td>
                          <td className="p-3 text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end text-lg font-semibold">
                Total: ${getTotalAmount().toFixed(2)}
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">Loading order...</div>
          )}
        </div>

        <div>
          <UserInformationBox userId={order?.userId ?? ""} />
        </div>
      </div>

      <div className="w-1/2 ">
        <OrderTrackingBox
          id={order?.locationId ?? ""}
          locations={[
            { lat: 55.6761, lon: 12.5683, label: "Warehouse" },
            { lat: 55.685, lon: 12.579, label: "Checkpoint" },
            { lat: 55.69, lon: 12.59, label: "Destination" },
          ]}
        />
      </div>
    </div>
  );
};

export default OrdersView;

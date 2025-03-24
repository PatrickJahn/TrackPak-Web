import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNotifications } from "../../providers/NotificationProvider";
import { FiPlus } from "react-icons/fi";
import CreateOrderDialog from "./components/Dialogs/CreateOrderDialog";
import { useState } from "react";
import useOrders from "@/hooks/useOrders";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/constants/appRoutes/appRoutes";

const OrdersView = () => {
  const { useQueryMany } = useOrders();

  const navigate = useNavigate();

  const { data: orders } = useQueryMany();

  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <CreateOrderDialog isOpen={open} onClose={() => setOpen(false)} />
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white p-2 flex gap-2 items-center rounded"
        >
          <FiPlus size={18} />
          Create New order
        </button>
      </div>
      <div className="w-full rounded mt-12 min-h-44 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[60px]">Order Id</TableHead>
              <TableHead className="min-w-[200px]">Description</TableHead>

              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => {
              const totalAmount = order.orderItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              const totalItems = order.orderItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              );
              return (
                <TableRow
                  key={order.id}
                  onClick={() => navigate(AppRoutes.order(order.id))}
                  className="hover:bg-primary/10 cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {order.id.slice(0, 6).toUpperCase()}
                  </TableCell>

                  <TableCell>
                    <p className="truncate">{order.description}</p>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-white px-3 py-1 rounded bg-blue-500 `}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-white px-3 py-1 rounded bg-gray-600 `}
                    >
                      {order.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {totalItems.toString()}
                  </TableCell>
                </TableRow>
              );
            })}
            {orders?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersView;

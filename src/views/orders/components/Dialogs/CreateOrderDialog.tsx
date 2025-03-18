import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import Select from "@/components/inputs/Select";
import Textarea from "@/components/inputs/TextArea";
import Dialog from "@/components/overlays/Dialog";

import { Order, OrderItem } from "@/models/order/Order";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PackagePlus } from "lucide-react";

type FormData = Order & {
  firstName: string;
  lastName: string;

  email: string;
  deliveryLocation: "company" | "custom";
  address?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateOrderDialog: FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Omit<Order, "id" | "status">>();

  const deliveryLocation = watch("locationId");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleAddItem = () => {
    setOrderItems([
      ...orderItems,
      {
        id: crypto.randomUUID(),
        orderId: "",
        title: "",
        price: 0,
        quantity: 1,
      },
    ]);
  };

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setOrderItems(updatedItems);
    setValue("orderItems", updatedItems);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Add new Order"
      size="large" // Change size to "small", "medium", or "large"
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button icon={PackagePlus} iconPosition="right">
            Create Order
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(() => {})} className="space-y-4">
        {/* Order Type */}
        <div>
          <Select
            label="Order Type"
            {...register("type", { required: "Order type is required" })}
            error={errors.type?.message}
            required
            options={[
              { label: "Standard", value: "standard" },
              { label: "Express", value: "express" },
            ]}
          />
        </div>

        {/* Order Description */}
        <div>
          <Textarea
            label="Order Description"
            placeholder="Enter order details"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>

        {/* Delivery Location Selection */}
        <div>
          <Select
            label="Delivery Location"
            {...register("locationId", {
              required: "Please select a location",
            })}
            error={errors.locationId?.message}
            required
            options={[
              { label: "Company Location", value: "company" },
              { label: "Custom Location", value: "custom" },
            ]}
          />
        </div>

        {/* Show Address Field if "custom" is selected */}
        {deliveryLocation === "custom" && (
          <Input
            label="Custom Address"
            placeholder="Enter custom address"
            {...register("description", {
              required: "Address is required when using a custom location",
            })}
            error={errors.description?.message}
          />
        )}

        {/* Order Items */}
        <div>
          <h3 className="text-lg  font-semibold">Order Items</h3>
          {orderItems.map((item, index) => (
            <div key={item.id} className="flex gap-2 mt-2 items-center">
              <Input
                label="Title"
                placeholder="Item Title"
                {...register(`orderItems.${index}.title`)}
                value={item.title}
                onChange={(e) =>
                  handleItemChange(index, "title", e.target.value)
                }
              />
              <Input
                label="Price"
                type="number"
                placeholder="Price"
                {...register(`orderItems.${index}.price`)}
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", parseFloat(e.target.value))
                }
              />
              <Input
                label="Quantity"
                type="number"
                placeholder="Quantity"
                {...register(`orderItems.${index}.quantity`)}
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "quantity",
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </div>
          ))}
          <Button type="button" onClick={handleAddItem} variant="secondary">
            + Add Item
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateOrderDialog;

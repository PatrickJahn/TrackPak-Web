import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import Select from "@/components/inputs/Select";
import Textarea from "@/components/inputs/TextArea";
import Dialog from "@/components/overlays/Dialog";

import { OrderItem, OrderType } from "@/models/order/Order";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  PackagePlus,
  User,
  Mail,
  Phone,
  MapPin,
  MapPinHouse,
  Flag,
  Building2,
} from "lucide-react";
import { CreateOrderModel } from "@/models/order/requests/CreateOrderRequest";
import useOrders from "@/hooks/useOrders";
import { useNotifications } from "@/providers/NotificationProvider";
import useCompanies from "@/hooks/useCompanies";

type FormData = CreateOrderModel;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateOrderDialog: FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors },
  } = useForm<FormData>();

  const { create } = useOrders();
  const { useQueryMyCompany } = useCompanies();

  const { data: company } = useQueryMyCompany();
  const { notification } = useNotifications();
  const [showOrderItems, setShowOrderItems] = useState(false);
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

  async function onSubmit(data: FormData) {
    const request: CreateOrderModel = {
      ...data,
      ...(orderItems ?? []),
      companyId: company!.id,
    };

    console.log(request);
    await create
      .mutateAsync(request)
      .then(() => {
        notification.success("Order Created!");
        onClose();
      })
      .catch((err) => {
        notification.error("Could not create order! " + err);
      });
  }

  useEffect(() => {
    reset();
    setOrderItems([]);
  }, []);

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
          <Button
            onClick={handleSubmit(onSubmit)}
            icon={PackagePlus}
            iconPosition="right"
          >
            Create Order
          </Button>
        </>
      }
    >
      <form className="space-y-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg  font-semibold">Order information</h3>
          <div>
            <Select
              label="Order Type"
              {...register("type", { required: "Order type is required" })}
              error={errors.type?.message}
              onChange={(x) =>
                setShowOrderItems(x.target.value == OrderType.Package)
              }
              required
              options={Object.keys(OrderType).map((x) => ({
                label: x,
                value: x,
              }))}
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
          {showOrderItems && (
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
                      handleItemChange(
                        index,
                        "price",
                        parseFloat(e.target.value)
                      )
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
              <Button
                type="button"
                className="mt-4"
                onClick={handleAddItem}
                variant="secondary"
              >
                + Add Item
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg  font-semibold">Customer information</h3>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="text"
              label="First name"
              icon={User}
              placeholder="First Name"
              {...register("user.firstName", {
                required: "First name is required",
              })}
              required
            />
            <Input
              type="text"
              placeholder="Last Name"
              label="Last name"
              icon={User}
              {...register("user.lastName", {
                required: "Last name is required",
              })}
              required
            />
            <Input
              type="text"
              label="Email address"
              placeholder="Email"
              icon={Mail}
              {...register("user.email", {
                required: "Email is required",
              })}
              required
            />
            <Input
              type="tel"
              label="Phone number"
              placeholder="Phone number"
              icon={Phone}
              {...register("user.phoneNumber", {})}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Location information</h3>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="text"
              label="Address"
              placeholder="Street address"
              icon={MapPinHouse}
              {...register("location.addressLine", {
                required: "Address is required",
              })}
              required
            />
            <Input
              type="text"
              label="City"
              placeholder="City"
              icon={Building2}
              {...register("location.city", {
                required: "City is required",
              })}
              required
            />
            <Input
              type="text"
              label="Zip code"
              placeholder="Zip code"
              icon={MapPin}
              {...register("location.postalCode", {
                required: "Zip code is required",
              })}
              required
            />
            <Input
              type="text"
              label="Country"
              placeholder="Country"
              icon={Flag}
              {...register("location.country", {
                required: "Country is required",
              })}
              required
            />
          </div>
        </div>{" "}
      </form>
    </Dialog>
  );
};

export default CreateOrderDialog;

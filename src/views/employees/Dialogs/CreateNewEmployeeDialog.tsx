import Button from "@/components/buttons/Button";
import AddressAutocompleteInput from "@/components/inputs/AddressAutoCompleteInput";
import Input from "@/components/inputs/Input";
import Select from "@/components/inputs/Select";
import Dialog from "@/components/overlays/Dialog";
import useCompanies from "@/hooks/useCompanies";
import useEmployees from "@/hooks/useEmployees";
import { Employee } from "@/models/employee/Employee";
import { CreateEmployeeModel } from "@/models/employee/Requests/CreateEmployeeRequest";
import { useNotifications } from "@/providers/NotificationProvider";
import {
  User,
  UserCheck,
  Mail,
  Eye,
  MapPin,
  UserRoundPlus,
} from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
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

const CreateNewEmployeeDialog: FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const deliveryLocation = watch("deliveryLocation"); // ⬅️ Get current value
  const { notification } = useNotifications();
  const { useQueryMyCompany } = useCompanies();
  const { create } = useEmployees();

  const { data: company } = useQueryMyCompany();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    //TODO: Move to handler
    const req: CreateEmployeeModel = {
      ...data,
      companyId: company?.id ?? "",
      role: 2,
      phoneNumber: "",
      location: {
        address: "Njalsgade 31",
        city: "Copenhagen",
        zipCode: "2300",
        country: "Denmark",
      },
    };
    await create
      .mutateAsync(req)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        notification.error("Failed to create employee! " + err);
      });

    console.log(req);
  };

  useEffect(() => {
    if (isOpen) {
      reset(); // Clear all input fields and validation errors
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Add new Employee"
      size="large" // Change size to "small", "medium", or "large"
      actions={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            icon={UserRoundPlus}
            iconPosition="right"
            onClick={handleSubmit(onSubmit)}
          >
            Create Employee
          </Button>
        </>
      }
    >
      <form className="space-y-4">
        <div className="flex gap-4">
          <Input
            label="First Name"
            placeholder="Enter employees first name"
            {...register("firstName", { required: "First Name is required" })}
            error={errors.firstName?.message}
            type="text"
            icon={User}
            iconPosition="left"
          />

          <Input
            label="Last Name"
            placeholder="Enter employees last name"
            {...register("lastName", { required: "Last Name is required" })}
            error={errors.lastName?.message}
            type="text"
            icon={User}
            iconPosition="left"
          />
        </div>
        <div>
          <Input
            label="Email"
            placeholder="Enter employees email"
            required
            {...register("email", { required: "email is required" })}
            error={errors.email?.message}
            type="email"
            icon={Mail}
            iconPosition="left"
          />
        </div>
        {/* Delivery Location Selection */}
        <div>
          <Select
            label="            Starting Delivery Location
"
            {...register("deliveryLocation", {
              required: "Please select a location",
            })}
            error={errors.deliveryLocation?.message}
            required
            options={[
              { label: "Company Location", value: "company" },
              { label: "Custom Location", value: "custom" },
            ]}
          />
        </div>

        {/* Show Address Field if "custom" is selected */}
        {deliveryLocation === "custom" && (
          <AddressAutocompleteInput
            onSelectAddress={() => {}}
            label="Custom Address"
            placeholder="Enter custom address"
            {...register("address", {
              required: "Address is required when using a custom location",
            })}
          />
        )}
      </form>
    </Dialog>
  );
};

export default CreateNewEmployeeDialog;

import { CreateLocationRequestModel } from "@/models/location/Requests/CreateLocationRequest";
import { UserRole } from "@/models/user/User";
import { Employee } from "../Employee";

export type CreateEmployeeModel = Partial<Employee> & {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyId: string; // C# Guid → TS string
  role: UserRole;
  location: CreateLocationRequestModel;
};

import KeyedItem from "../base/Item";
import { UserRole } from "../user/User";

export type Employee = KeyedItem & {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  checkedIn: boolean;
  role: UserRole;
  companyId: string; // Guid is represented as a string
  locationId?: string | null; // Nullable Guid
  displayName?: string; // Computed field, optional
};

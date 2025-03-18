import KeyedItem from "../base/Item";

type User = KeyedItem & {
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  locationId?: string | null;
  displayName?: string; // NotMapped, so it's computed on the backend
};

export enum UserRole {
  none = 0,
  Customer = 1,
  Driver = 2,
  CompanyAdmin = 10,
  SystemAdmin = 11,
}

export default User;

// Mapping user roles to colors and titles
export const userRoleMap: Record<UserRole, { title: string; color: string }> = {
  [UserRole.Customer]: { title: "Customer", color: "bg-blue-500" },
  [UserRole.Driver]: { title: "Driver", color: "bg-green-500" },
  [UserRole.CompanyAdmin]: { title: "Company Admin", color: "bg-yellow-500" },
  [UserRole.SystemAdmin]: { title: "System Admin", color: "bg-gray-500" },
  [UserRole.none]: { title: "System Admin", color: "bg-gray-500" },
};

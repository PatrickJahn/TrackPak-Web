import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import CreateNewEmployeeDialog from "./Dialogs/CreateNewEmployeeDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useEmployees from "@/hooks/useEmployees";
import { userRoleMap } from "@/models/user/User";

const EmployeesView = () => {
  const [open, setOpen] = useState(false);

  const { useQueryMany } = useEmployees();
  const { data: employees, isLoading, error } = useQueryMany();

  return (
    <div className="">
      <CreateNewEmployeeDialog isOpen={open} onClose={() => setOpen(false)} />

      <div className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white p-2 flex gap-2 items-center rounded"
        >
          <FiPlus size={18} />
          Create New Employee
        </button>
      </div>
      {/* Employee Table */}
      <div className="bg-white shadow-md rounded-md mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>

              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-4">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-4 text-red-500">
                  Failed to load employees.
                </TableCell>
              </TableRow>
            )}
            {employees?.length == 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-4 ">
                  There is no employees
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              employees?.map((employee) => (
                <TableRow
                  key={employee.email}
                  className="hover:bg-primary/10 cursor-pointer"
                >
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    {" "}
                    <span
                      className={`text-white px-3 py-1 rounded bg-blue-500 `}
                    >
                      {employee.checkedIn ? "In Route" : "Ready for Order"}
                    </span>
                  </TableCell>

                  <TableCell>
                    {" "}
                    <span
                      className={`text-white px-3 py-1 rounded ${
                        userRoleMap[employee.role].color
                      }`}
                    >
                      {userRoleMap[employee.role].title}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeesView;

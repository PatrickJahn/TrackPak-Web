import { PATH_KEYS } from "../services/appServices";
import { useItemsCrud } from "./common/useItemsCrud";
import { useItemService } from "./common/useServices";
import { useQuery } from "@tanstack/react-query";
import { Employee } from "@/models/employee/Employee";

const useEmployees = () => {
  /**** Services ****/
  const EmployeeService = useItemService((services) => services.companies);

  const EmployeeCrud = useItemsCrud<Employee>(
    [PATH_KEYS.employees],
    (services) => services.employeeService
  );

  /**** Queries & Mutations ****/

  const useQueryMyEmployee = () =>
    useQuery({
      queryKey: ["employee", "me"],
      queryFn: async () => await EmployeeService.me(),
    });

  /**** Value ****/
  return {
    ...EmployeeCrud,
    EmployeeService,
    useQueryMyEmployee,
  };
};

export default useEmployees;

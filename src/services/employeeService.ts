import { Employee } from "@/models/employee/Employee";
import { PATHS } from "./appServices";
import { CrudServiceType, crudService } from "./crudService";
import { RestClient } from "./restClient";

export type EmployeeServiceType = CrudServiceType<Employee> & {
  me: () => Promise<Employee>;
};

export const EmployeeServices = (
  client: RestClient,
  path: string
): EmployeeServiceType => ({
  ...crudService<Employee>(client, path),

  me: async () => {
    return await client
      .get<Employee>(PATHS.companies + "/me")
      .then((res) => {
        if (res.data) return res.data;
        else throw "No data";
      })
      .catch((err) => {
        throw err;
      });
  },
});

export default EmployeeServices;

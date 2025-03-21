import { Company } from "../models/company/Company";
import { PATHS } from "./appServices";
import { CrudServiceType, crudService } from "./crudService";
import { RestClient } from "./restClient";

export type CompanyServiceType = CrudServiceType<Company> & {
  me: () => Promise<Company>;
};

export const CompanyServices = (
  client: RestClient,
  path: string
): CompanyServiceType => ({
  ...crudService<Company>(client, path),

  me: async () => {
    return await client
      .get<Company>(PATHS.companies + "/me")
      .then((res) => {
        if (res.data) return res.data;
        else throw "No data";
      })
      .catch((err) => {
        throw err;
      });
  },
});

export default CompanyServices;

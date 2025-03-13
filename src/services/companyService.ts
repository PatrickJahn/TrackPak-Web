import { Company } from "../models/company/Company";
import { CrudServiceType, crudService } from "./crudService";
import { RestClient } from "./restClient";

export type CompanyServiceType = CrudServiceType<Company>;

export const CompanyServices = (
  client: RestClient,
  path: string
): CompanyServiceType => ({
  ...crudService<Company>(client, path),
});

export default CompanyServices;

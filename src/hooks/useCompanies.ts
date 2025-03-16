import { Company } from "@/models/company/Company";
import { PATH_KEYS } from "../services/appServices";
import { useItemsCrud } from "./common/useItemsCrud";
import { useItemService } from "./common/useServices";

const useCompanies = () => {
  /**** Services ****/
  const companyService = useItemService((services) => services.companies);

  const companyCrud = useItemsCrud<Company>(
    [PATH_KEYS.companies],
    (services) => services.companies
  );

  /**** Queries & Mutations ****/

  /**** Value ****/
  return {
    ...companyCrud,
    companyService,
  };
};

export default useCompanies;

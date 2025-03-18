import { Company } from "@/models/company/Company";
import { PATH_KEYS } from "../services/appServices";
import { useItemsCrud } from "./common/useItemsCrud";
import { useItemService } from "./common/useServices";
import { useQuery } from "@tanstack/react-query";

const useCompanies = () => {
  /**** Services ****/
  const companyService = useItemService((services) => services.companies);

  const companyCrud = useItemsCrud<Company>(
    [PATH_KEYS.companies],
    (services) => services.companies
  );

  /**** Queries & Mutations ****/

  const useQueryMyCompany = () =>
    useQuery({
      queryKey: ["company", "me"],
      queryFn: async () => await companyService.me(),
    });

  /**** Value ****/
  return {
    ...companyCrud,
    companyService,
    useQueryMyCompany,
  };
};

export default useCompanies;

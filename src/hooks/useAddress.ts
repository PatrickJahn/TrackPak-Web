import { useItemService } from "./common/useServices";
import { useQuery } from "@tanstack/react-query";

const useAddress = () => {
  /**** Services ****/
  const service = useItemService((services) => services.geoApiService);

  /**** Queries & Mutations ****/

  const useQueryAddress = (search: string) =>
    useQuery({
      queryKey: ["Address", search],
      queryFn: async () => {
        console.log(search);
        if (search.length < 3) return []; // Prevent execution when input is too short
        return await service.searchForAddress(search);
      },
      enabled: search.length >= 3, // Still keep enabled, but we also prevent execution above
    });
  /**** Value ****/
  return {
    useQueryAddress,
  };
};

export default useAddress;

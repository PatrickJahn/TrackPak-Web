import { PATH_KEYS } from "../services/appServices";
import { useItemsCrud } from "./common/useItemsCrud";
import { useItemService } from "./common/useServices";
import { Location } from "@/models/location/Location";

const useLocations = () => {
  /**** Services ****/
  const locationService = useItemService(
    (services) => services.locationService
  );

  const ordersCrud = useItemsCrud<Location>(
    [PATH_KEYS.orders],
    (services) => services.locationService
  );

  /**** Queries & Mutations ****/

  /**** Value ****/
  return {
    ...ordersCrud,
    locationService,
  };
};

export default useLocations;

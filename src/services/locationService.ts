import { PATHS } from "./appServices";
import { CrudServiceType, crudService } from "./crudService";
import { RestClient } from "./restClient";
import { Location } from "@/models/location/Location";

export type LocationServiceType = CrudServiceType<Location>;

export const LocationServices = (
  client: RestClient,
  path: string
): LocationServiceType => ({
  ...crudService<Location>(client, path),
});

export default LocationServices;

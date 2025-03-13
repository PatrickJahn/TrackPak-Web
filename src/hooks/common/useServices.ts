import {
  AppItemRestServicesType,
  AppRestServicesType,
} from "../../services/appServices";
import { useServices } from "@/providers/ServicesProvider";

export const useService = <T>(
  selector: (services: AppRestServicesType) => T
): T => {
  const services = useServices();
  return selector(services);
};

export const useItemService = <T>(
  selector: (services: AppItemRestServicesType) => T
): T => {
  const services = useService((services) => services.items);
  return selector(services);
};

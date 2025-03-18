import CompanyServices, { CompanyServiceType } from "./companyService";
import EmployeeServices, { EmployeeServiceType } from "./employeeService";
import GeoApiService, { GeoApiServiceType } from "./geoApiService";
import OrderServices, { OrderServiceType } from "./orderSerivces";
import createRestClient, { RestClient } from "./restClient";
import UserServices, { UserServiceType } from "./userService";

export const API_ENV: string | undefined =
  import.meta.env.VITE_APP_ENV || "development";

export const isLocalhostMode = API_ENV === "localhost" || API_ENV === "local";
export const isDevelopmentMode = API_ENV === "development" || API_ENV === "dev";
export const isTestingMode = API_ENV === "testing" || API_ENV === "test";
export const isProdMode =
  API_ENV === "prod" || API_ENV === "production" || API_ENV === undefined;

const LOCAL_HOST = "localhost:5056";

const HOST = LOCAL_HOST;

const REST_PROTOCOL = isLocalhostMode ? "http" : "https";
const WEBSOCKET_PROTOCOL = isLocalhostMode ? "ws" : "wss";

export const REST_API_BASE = `${REST_PROTOCOL}://${HOST}`;
export const WS_API_BASE = `${WEBSOCKET_PROTOCOL}://${HOST}`;

export type AppItemRestServicesType = {
  companies: CompanyServiceType;
  users: UserServiceType;
  employeeService: EmployeeServiceType;
  geoApiService: GeoApiServiceType;
  orderService: OrderServiceType;
};

export type AppRestServicesType = {
  readonly client: RestClient;
  readonly items: AppItemRestServicesType;
};

export const API_BASE_V1 = "/api";

export const PATH_KEYS = {
  orders: `orders`,
  locations: `locations`,
  user: `user`,
  employees: `employee`,
  companies: `company`,
};

export const PATHS = {
  users: `${API_BASE_V1}/${PATH_KEYS.user}`,
  orders: `${API_BASE_V1}/${PATH_KEYS.orders}`,
  companies: `${API_BASE_V1}/${PATH_KEYS.companies}`,
  employee: `${API_BASE_V1}/${PATH_KEYS.employees}/`,
};

export const appItemServices = (
  client: RestClient
): AppItemRestServicesType => {
  const companies = CompanyServices(client, PATHS.companies);
  const geoApiService = GeoApiService(client);
  const users = UserServices(client, PATHS.users);
  const employeeService = EmployeeServices(client, PATHS.employee);
  const orderService = OrderServices(client, PATHS.orders);

  return {
    companies,
    geoApiService,
    users,
    employeeService,
    orderService,
  };
};

export const appServices = (): AppRestServicesType => {
  const client = createRestClient(REST_API_BASE);

  const items = appItemServices(client);
  return {
    client,
    items,
  };
};

import CompanyServices, { CompanyServiceType } from "./companyService";
import createRestClient, { RestClient } from "./restClient";

export const API_ENV: string | undefined =
  import.meta.env.VITE_APP_ENV || "development";

export const isLocalhostMode = API_ENV === "localhost" || API_ENV === "local";
export const isDevelopmentMode = API_ENV === "development" || API_ENV === "dev";
export const isTestingMode = API_ENV === "testing" || API_ENV === "test";
export const isProdMode =
  API_ENV === "prod" || API_ENV === "production" || API_ENV === undefined;

const LOCAL_HOST = "localhost:8000";

const HOST = LOCAL_HOST;

const REST_PROTOCOL = isLocalhostMode ? "http" : "https";
const WEBSOCKET_PROTOCOL = isLocalhostMode ? "ws" : "wss";

export const REST_API_BASE = `${REST_PROTOCOL}://${HOST}`;
export const WS_API_BASE = `${WEBSOCKET_PROTOCOL}://${HOST}`;

export type AppItemRestServicesType = {
  companies: CompanyServiceType;
};

export type AppRestServicesType = {
  readonly client: RestClient;
  readonly items: AppItemRestServicesType;
};

export const API_BASE_V1 = "/api/v1";

export const PATH_KEYS = {
  orders: `orders`,
  locations: `locations`,
  users: `users`,
  employees: `employees`,
  companies: `companies`,
};

export const PATHS = {
  users: `${API_BASE_V1}/${PATH_KEYS.users}`,
  orders: `${API_BASE_V1}/${PATH_KEYS.orders}`,
  companies: `${API_BASE_V1}/${PATH_KEYS.companies}`,
};

export const appItemServices = (
  client: RestClient
): AppItemRestServicesType => {
  const companies = CompanyServices(client, PATHS.companies);

  return {
    companies,
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

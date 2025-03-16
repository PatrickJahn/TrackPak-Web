import { AppState, Auth0ProviderOptions, User } from "@auth0/auth0-react";
import { AppRoutes } from "@/constants/appRoutes/appRoutes.ts";

// Environment variables
const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN || "COULDNOTFINDDOMAIN";
const AUTH0_ADMIN_CLIENT_ID =
  import.meta.env.VITE_AUTH0_CLIENT || "COULDNOTFINDCLIENTID";

const AUTH0_AUDIENCE =
  import.meta.env.VITE_AUTH0_AUDIENCE || "COUDNOTFINDAUDIENCE";
const AUTH0_NAMESPACE =
  import.meta.env.VITE_AUTH0_NAMESPACE || "COULDNOTFINDNAMESPACE";

// Validate environment variables
if (!AUTH0_DOMAIN || !AUTH0_ADMIN_CLIENT_ID || !AUTH0_AUDIENCE) {
  throw new Error("Missing required Auth0 environment variables");
}

// User validation
const isAdminUser = (user: User | undefined): boolean => {
  // Adjust this check based on your Auth0 user metadata/roles structure
  const userRole = user?.[`${AUTH0_NAMESPACE}/role`] || undefined;

  return userRole === Role.Admin || userRole === Role.SystemAdmin || false;
};

const onRedirectCallback = (
  appState: AppState | undefined,
  user: User | undefined
) => {
  const isAdmin = isAdminSite();
  const hasAdminAccess = isAdminUser(user);
  console.log(appState, user, isAdmin, hasAdminAccess);

  if (hasAdminAccess)
    window.location.replace(appState?.returnTo ?? AppRoutes.dashboard);
};

const isAdminSite = (): boolean => {
  return window.location.origin.includes("admin");
};

const getClientId = (): string => {
  return AUTH0_ADMIN_CLIENT_ID;
};

// Create the Auth0 configuration
const createAuth0Config = (): Auth0ProviderOptions => ({
  domain: AUTH0_DOMAIN,
  clientId: getClientId(),
  useRefreshTokens: true,
  cacheLocation: "localstorage",
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: `http://admin.localhost:${window.location.port}${AppRoutes.dashboard}`,
    ...(AUTH0_AUDIENCE ? { audience: AUTH0_AUDIENCE } : null),
  },
  useRefreshTokensFallback: true,
});

// Export the dynamic configuration
const Auth0ProviderConfig = createAuth0Config();

export default Auth0ProviderConfig;

export enum Role {
  User = "User",
  Admin = "CompanyAdmin",
  SystemAdmin = "SystemAdmin",
}

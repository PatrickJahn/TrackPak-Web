import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import NotificationProvider from "./NotificationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ServicesProvider from "./ServicesProvider";
import DarkModeProvider from "./DarkModeProvider";
import { Auth0Provider } from "@auth0/auth0-react";
import Auth0ProviderConfig from "../../authConfig.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
});

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <Auth0Provider {...Auth0ProviderConfig}>
        <ServicesProvider>
          <QueryClientProvider client={queryClient}>
            <DarkModeProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </DarkModeProvider>
          </QueryClientProvider>
        </ServicesProvider>
      </Auth0Provider>
    </BrowserRouter>
  );
};

export default AppProvider;

import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import NotificationProvider from "./NotificationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ServicesProvider from "./ServicesProvider";
import DarkModeProvider from "./DarkModeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
});

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <ServicesProvider>
        <QueryClientProvider client={queryClient}>
          <DarkModeProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </DarkModeProvider>
        </QueryClientProvider>
      </ServicesProvider>
    </BrowserRouter>
  );
};

export default AppProvider;

import { ComponentType, FC } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingView from "@/views/loadiing/LoadingView";
import ServiceUnavailableBlock from "@/components/errors/ServiceUnavailableBlock";

type AuthenticationGuardProps = {
  component: ComponentType<object>;
};

export const AuthenticationGuard: FC<AuthenticationGuardProps> = ({
  component,
}) => {
  const { isLoading, error, logout } = useAuth0();
  if (isLoading) return <LoadingView />;
  function handleLogout() {
    logout({
      logoutParams: {
        returnTo: window.location.origin.replace("https://", "http://admin."),
      },
    });
  }
  if (error) return <ServiceUnavailableBlock />;

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LoadingView />,
    loginOptions: {
      appState: { company_id: "companyId" },
      authorizationParams: { company_id: "Test" },
    },
  });
  return <Component />;
};
export default AuthenticationGuard;

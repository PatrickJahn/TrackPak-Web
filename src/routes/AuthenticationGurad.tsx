import { ComponentType, FC } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingView from "@/views/loadiing/LoadingView";

type AuthenticationGuardProps = {
  component: ComponentType<object>;
};

export const AuthenticationGuard: FC<AuthenticationGuardProps> = ({
  component,
}) => {
  const { isLoading } = useAuth0();
  if (isLoading) return <LoadingView />;

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

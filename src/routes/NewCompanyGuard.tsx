import { FC, PropsWithChildren } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingView from "@/views/loadiing/LoadingView";

export const NewCompanyGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useAuth0();
  if (isLoading) return <LoadingView />;

  return <>{children}</>;
};
export default NewCompanyGuard;

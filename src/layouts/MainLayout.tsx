import SidebarNavigationProvider from "@/providers/SideBarNavigationProvider";
import { Outlet } from "react-router-dom";

import Topbar from "@/components/sidebars/TopBar";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingView from "@/views/loadiing/LoadingView";
import useCompanies from "@/hooks/useCompanies";
import ServiceUnavailableBlock from "@/components/errors/ServiceUnavailableBlock";
import useEmployees from "@/hooks/useEmployees";
const MainLayout = () => {
  const { useQueryMyEmployee } = useEmployees();
  const { useQueryMyCompany } = useCompanies();

  const { getAccessTokenSilently } = useAuth0();
  const { error, isLoading } = useQueryMyEmployee();
  const { error: companyError, isLoading: isLoadingCompany } =
    useQueryMyCompany();

  const storeTokenManually = async () => {
    try {
      const token = await getAccessTokenSilently();
      localStorage.setItem("token", token); // Store with a custom key
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  useEffect(() => {
    storeTokenManually();
  }, []);

  if (isLoading || isLoadingCompany) return <LoadingView />;

  if (error || companyError) {
    return <ServiceUnavailableBlock />;
  }

  return (
    <SidebarNavigationProvider>
      <div
        id="main-layout"
        className="w-full z-0 fixed top-0 left-0 h-screen overflow-hidden"
      ></div>

      <div className="flex flex-col h-screen w-full z-10 overflow-hidden">
        <Topbar />
        <div className="p-6 w-full h-full  overflow-auto ">
          <Outlet />
        </div>
      </div>
    </SidebarNavigationProvider>
  );
};

export default MainLayout;

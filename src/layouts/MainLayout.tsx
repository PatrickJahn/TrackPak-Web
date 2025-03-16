import SidebarNavigationProvider from "@/providers/SideBarNavigationProvider";
import { Outlet } from "react-router-dom";

import Topbar from "@/components/sidebars/TopBar";
const MainLayout = () => {
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

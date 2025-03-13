import LeftSidebar from "@/components/sidebars/LeftSidebar";
import Topbar from "@/components/sidebars/TopBar";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
export type SidebarNavigationType = {
  leftSidebarOpen: boolean;
  toggleLeftSidebar: () => void;
};

export const SideBarNavigationContext =
  createContext<SidebarNavigationType | null>(null);

const SidebarNavigationProvider: FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  /**** States ****/

  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false);

  /**** Functions ****/
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
    localStorage.setItem("leftSidebarOpen", (!leftSidebarOpen).toString());
  };

  return (
    <SideBarNavigationContext.Provider
      {...props}
      value={{
        leftSidebarOpen,
        toggleLeftSidebar,
      }}
    >
      <div className="flex overflow-hidden">
        <LeftSidebar />
        {children}
      </div>
    </SideBarNavigationContext.Provider>
  );
};

export const useSideBar = () => {
  const sidebar = useContext(SideBarNavigationContext);
  if (!sidebar)
    throw new Error(
      "useSideBar must be used within a SideBarNavigationProvider"
    );
  return sidebar;
};

export default SidebarNavigationProvider;

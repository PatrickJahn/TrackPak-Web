import { JSX, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiMoreHorizontal,
  FiUsers,
  FiTruck,
} from "react-icons/fi";
import { FaRoute } from "react-icons/fa";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import TrackPakFull from "@/assets/TrackPakLogoBigLight.svg";
import TrackPakSmall from "@/assets/TrackPakLogoSmallLight.svg";
import TrackPakFullDark from "@/assets/TrackPakLogoBigDark.svg";
import TrackPakSmallDark from "@/assets/TrackPakLogoSmallDark.svg";
import { classNames } from "@/utils/tailwindHelpers";
import Popover from "../overlays/Popover";
import ProfilePopoverContent from "./components/ProfilePopoverContent";
import UseDarkMode, { useDarkMode } from "@/providers/DarkModeProvider";
const LeftSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { darkMode } = useDarkMode();

  const logoSrc = useMemo(() => {
    if (isCollapsed) {
      return darkMode ? TrackPakSmallDark : TrackPakSmall;
    } else {
      return darkMode ? TrackPakFullDark : TrackPakFull;
    }
  }, [darkMode, isCollapsed]);

  return (
    <div className="flex z-40">
      {/* Sidebar */}
      <div
        className={`h-screen p-3 overflow-hidden bg-white dark:bg-dark-paper text-slate-800 shadow-md transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-72"
        }  top-0 left-0 flex flex-col gap-8`}
      >
        <div className="flex justify-between align-middle  ">
          <div>
            <img
              key={`${logoSrc}`} // ✅ this forces React to recreate the img element
              src={logoSrc}
              className="w-32 h-12 cursor-pointer"
            />
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className=" flex-1">
          <ul className="flex flex-col gap-2">
            <SidebarItem
              icon={<FiHome size={20} />}
              label="Dashboard"
              to="/dashboard"
              collapsed={isCollapsed}
            />
            <SidebarItem
              icon={<FiTruck size={20} />}
              label="Orders"
              to="/orders"
              collapsed={isCollapsed}
            />

            <SidebarItem
              icon={<FaRoute size={20} />}
              label="Routes"
              to="/routes"
              collapsed={isCollapsed}
            />
            <SidebarItem
              icon={<FiUsers size={20} />}
              label="Employees"
              to="/employees"
              collapsed={isCollapsed}
            />
            <SidebarItem
              icon={<FiSettings size={20} />}
              label="Settings"
              to="/settings"
              collapsed={isCollapsed}
            />
          </ul>
        </nav>

        <div className="flex flex-col gap-2">
          <Popover content={<ProfilePopoverContent />}>
            {isCollapsed ? (
              <div className="flex  gap-2 items-center  rounded w-full hover:shadow-md cursor-pointer px-1 pb-2">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs items-center flex ">
                  <p className="mx-auto">MP</p>
                </span>
              </div>
            ) : (
              <div className="flex ">
                <div className="flex  gap-2 items-center  rounded w-full hover:shadow-md cursor-pointer p-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs items-center flex ">
                    <p className="mx-auto">MP</p>
                  </span>
                  <div className="flex flex-col text-left gap-0 h-8 ">
                    <p className=" truncate text-dark-paper dark:text-white overflow-clip p-0 m-0">
                      Mads Pakvan
                    </p>
                    <p className="text-[10px] text-slate-400 -mt-1 p-0 m-0">
                      Free Plan
                    </p>
                  </div>
                  <FiMoreHorizontal className="ml-auto dark:text-white" />
                </div>
              </div>
            )}
          </Popover>
          <span className="w-full h-[1px] bg-slate-300  "></span>

          <div className=" p-2 ">
            {isCollapsed ? (
              <TbLayoutSidebarLeftExpand
                onClick={() => setIsCollapsed(false)}
                className="my-auto text-gray-400 cursor-pointer hover:text-primary"
                size={22}
              />
            ) : (
              <TbLayoutSidebarLeftCollapse
                onClick={() => setIsCollapsed(true)}
                className="my-auto text-gray-400 cursor-pointer hover:text-primary"
                size={22}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({
  icon,
  label,
  to,
  collapsed,
}: {
  icon: JSX.Element;
  label: string;
  to: string;
  collapsed: boolean;
}) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);
  return (
    <li className="relative   ">
      <Link
        to={to}
        className={classNames(
          "flex items-center p-2 py-3 h-12 rounded transition-all duration-200",
          "hover:text-primary",
          isActive
            ? "bg-primary/[0.1] text-primary "
            : "bg-transparent text-gray-500 dark:text-white/85"
        )}
      >
        <div>{icon}</div>
        {!collapsed && <span className="ml-3">{label}</span>}
      </Link>

      {/* Tooltip (Only shows when sidebar is collapsed) */}
      {collapsed && (
        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </span>
      )}
    </li>
  );
};

export default LeftSidebar;

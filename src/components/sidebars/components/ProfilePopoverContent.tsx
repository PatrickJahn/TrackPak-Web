import App from "@/App";
import ToggleSwitch from "@/components/inputs/ToggleSwith";
import { AppRoutes } from "@/constants/appRoutes/appRoutes";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { CiLogout } from "react-icons/ci";
const ProfilePopoverContent = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { logout } = useAuth0();

  function handleToggle() {
    toggleDarkMode();
  }

  function handeLogout() {
    logout({
      logoutParams: {
        returnTo: window.location.origin.replace("https://", "http://admin."),
      },
    });
  }

  return (
    <div className="flex flex-col gap-2 p-1">
      <div className="flex gap-2 hover:text-primary p-2 rounded">
        <ToggleSwitch
          size="small"
          initialChecked={darkMode}
          onChange={handleToggle}
        />
        <p> {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</p>
      </div>
      <span className="w-full h-[1px] bg-slate-400 rounded "></span>
      <div className="flex gap-2 items-center p-2" onClick={handeLogout}>
        <CiLogout />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default ProfilePopoverContent;

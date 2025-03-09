import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      {/* Main Content */}

      <Outlet />
    </div>
  );
};

export default MainLayout;

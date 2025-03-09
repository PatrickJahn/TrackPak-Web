import { FC, JSX } from "react";
import MainLayout from "../layouts/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardView from "../views/dashboard/DashboardView";
import { AppRoutes } from "../constants/appRoutes/appRoutes";

type PrivateRouteProps = {
  element: JSX.Element;
  isPublic?: boolean;
};

//Allows the user to access only specific routes based on logged in status
const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
  // const { isLoggedIn } = useAuth();

  // if (isPublic) return isLoggedIn() ? <Navigate to={AppRoutes.home} /> : element;
  // else return isLoggedIn() ? element : <Navigate to={AppRoutes.auth} />;
  return element;
};

const AppRouter: FC = () => {
  /**** DOM ****/
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path={AppRoutes.dashboard} element={<DashboardView />} />
      </Route>

      <Route path="*" element={<Navigate to={AppRoutes.dashboard} />} />
    </Routes>
  );
};

export default AppRouter;

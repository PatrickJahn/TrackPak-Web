import { FC, JSX } from "react";
import MainLayout from "../layouts/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardView from "../views/dashboard/DashboardView";
import { AppRoutes } from "../constants/appRoutes/appRoutes";
import EmployeesView from "@/views/employees/EmployeesView";
import OrdersView from "@/views/orders/OrdersView";
import Landing from "@/views/landing/Landing";

const AppRouter: FC = () => {
  /**** DOM ****/
  return (
    <Routes>
      <Route index path={AppRoutes.index} element={<Landing />} />

      <Route path="*" element={<Navigate to={AppRoutes.index} />} />
    </Routes>
  );
};

export default AppRouter;

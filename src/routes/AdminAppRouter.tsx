import { FC, JSX } from "react";
import MainLayout from "../layouts/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardView from "../views/dashboard/DashboardView";
import { AppRoutes } from "../constants/appRoutes/appRoutes";
import EmployeesView from "@/views/employees/EmployeesView";
import OrdersView from "@/views/orders/OrdersView";
import AuthenticationGuard from "./AuthenticationGurad";

const AdminAppRouter: FC = () => {
  /**** DOM ****/
  return (
    <Routes>
      <Route element={<AuthenticationGuard component={MainLayout} />}>
        <Route index path={AppRoutes.dashboard} element={<DashboardView />} />
        <Route index path={AppRoutes.employees} element={<EmployeesView />} />
        <Route index path={AppRoutes.orders} element={<OrdersView />} />
      </Route>

      <Route path="*" element={<Navigate to={AppRoutes.dashboard} />} />
    </Routes>
  );
};

export default AdminAppRouter;

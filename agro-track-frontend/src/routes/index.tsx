import { useRoutes, Navigate } from "react-router-dom"
import DashboardPage from "@/features/dashboard/DashboardPage"
import EmployeesList from "@/features/employees/pages/List"
import EmployeeDetail from "@/features/employees/pages/Detail"
import EmployeeEdit from "@/features/employees/pages/Edit"
import FarmListPage from "@/features/farms/pages/List"

export function AppRoutes() {
  return useRoutes([
    { path: "/", element: <DashboardPage /> },
    { path: "/employees", element: <EmployeesList /> },
    { path: "/employees/:id", element: <EmployeeDetail /> },
    { path: "/employees/:id/edit", element: <EmployeeEdit /> },
    { path: "/farms", element: <FarmListPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ])
}

export default AppRoutes

import { Outlet, Navigate } from "react-router-dom";

const AdminPrivateRoutes = () => {
  const token = localStorage.getItem('token')
  return token ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminPrivateRoutes;

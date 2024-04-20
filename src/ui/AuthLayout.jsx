import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

function AuthLayout() {
  const { user } = useUser();

  if (user) return <Navigate to="/dashboard" />;

  return <Outlet />;
}

export default AuthLayout;

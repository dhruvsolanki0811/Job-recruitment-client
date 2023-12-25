import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUserAuthStore } from "../../../store/AuthStore";
function RequireAuth() {
  const { user } = useUserAuthStore();
  const location = useLocation();
  return user.userId ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export { RequireAuth };

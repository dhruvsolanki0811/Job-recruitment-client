import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useUserAuthStore} from "../../../store/AuthStore"
const RestrictAuth = () => {
  const { user} = useUserAuthStore();
  const location = useLocation();
  return user.userId ? (
    <Navigate to={`/${user.userType}/us`} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export { RestrictAuth };
import { Navigate } from "react-router-dom";
import Nav from "../layouts/Nav";

import { useAppSelector } from "../store/hooks";
import { isSessionExpired} from "../store/modules/auth";

const ProtectedRoutes = () => {
  const isSessionExpiredData = useAppSelector(isSessionExpired);
  // TODO: Use authentication token

  return isSessionExpiredData ? <Navigate to="/login" replace /> : <Nav /> 
};

export default ProtectedRoutes;

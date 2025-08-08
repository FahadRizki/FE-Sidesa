import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

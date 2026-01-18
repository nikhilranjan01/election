import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { token, role: userRole } = useAuth();

  if (!token) return <Navigate to="/login" />;

  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;

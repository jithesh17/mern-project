import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = sessionStorage.getItem("token");
  // No token: redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Basic JWT structure check
  const tokenParts = token.split(".");

  if (tokenParts.length !== 3) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("currentStudent");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

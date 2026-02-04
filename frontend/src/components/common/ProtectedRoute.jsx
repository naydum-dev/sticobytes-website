import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // TODO: Replace this with real authentication check later
  // For now, we'll use localStorage to simulate authentication
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    // Redirect to home if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

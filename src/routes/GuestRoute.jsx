import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <p>Yüklənir...</p>;

  return !isAuthenticated ? children : <Navigate to="/" replace />;
}
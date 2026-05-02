import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function GuestRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  return !token ? children : <Navigate to="/" replace />;
}

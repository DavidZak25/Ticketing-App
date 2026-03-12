import { Outlet, Navigate } from "react-router";
import { useApp } from "../hooks/useAppContext";

export function AuthLayout() {
  const { isAuthenticated } = useApp();
  if (isAuthenticated) return <Navigate to="/events" replace />;
  return <Outlet />;
}

export function ProtectedLayout() {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

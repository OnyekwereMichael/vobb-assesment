import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "@/components/Firebase/firebase";

interface ProtectedRouteProps {
  element: JSX.Element; // ✅ This is the element to render if authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;

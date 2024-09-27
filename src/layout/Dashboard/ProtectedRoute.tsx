import { verifyToken } from "@/lib/verifyToken";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {  useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  

  if (role !== undefined && role !== (user as { role: string })?.role) {
    return <Navigate to="/" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;

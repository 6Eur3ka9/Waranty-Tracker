
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../service/context.provider';
import { jwtDecode } from "jwt-decode";

export default function PublicRoute({ children }) {
  const { connectedUserToken } = useUser();

  if (connectedUserToken) {
    try {
      const { exp } = jwtDecode(connectedUserToken);
      if (exp * 1000 > Date.now()) {
        return <Navigate to="/home" replace />;
      }
    } catch {
      // silent
    }
  }
  return <>{children}</>;
}

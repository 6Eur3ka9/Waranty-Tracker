import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './context.provider';

export default function PublicRoute() {
  const { connectedUserToken } = useUser();


  if (connectedUserToken) {
    return <Navigate to="/home" replace />;
  }

 
  return <Outlet />;
}

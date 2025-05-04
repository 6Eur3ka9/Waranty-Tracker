import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../service/context.provider';

function parseJwt(token) {
  if (!token) return null;
  const [ , payload ] = token.split('.');
  try {
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function CheckAuth() {
  const {
    connectedUserToken,
    setConnectedUserToken,
    setConnectedUserId,
    setConnectedUserPassword
  } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!connectedUserToken) {
      navigate('/login', { replace: true });
      return;
    }
    const decoded = parseJwt(connectedUserToken);
    if (!decoded?.exp) {
      logout();
      return;
    }
    const now = Date.now();
    const expiresAt = decoded.exp * 1000;
    if (expiresAt <= now) {
      logout();
      return;
    }
    const timer = setTimeout(logout, expiresAt - now);
    return () => clearTimeout(timer);

    function logout() {
      setConnectedUserToken(null);
      setConnectedUserId(null);
      setConnectedUserPassword(null);
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userPassword');
      navigate('/login', { replace: true });
    }
  }, [
    connectedUserToken,
    navigate,
    setConnectedUserToken,
    setConnectedUserId,
    setConnectedUserPassword
  ]);

 
  if (!connectedUserToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

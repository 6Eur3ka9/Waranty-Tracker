// src/components/CheckAuth.js
import React, { useEffect } from 'react';
import { useUser } from '../service/context.provider';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function CheckAuth({ children }) {
  const { connectedUserToken, setConnectedUserId, setConnectedUserToken } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!connectedUserToken) {
      navigate('/login');
      return;
    }
    try {
      const { exp, id } = jwt_decode(connectedUserToken);
      if (exp * 1000 < Date.now()) {
        // token expiré
        setConnectedUserId(null);
        setConnectedUserToken(null);
        localStorage.clear();
        navigate('/login');
      }
    } catch {
      navigate('/login');
    }
  }, [connectedUserToken, setConnectedUserId, setConnectedUserToken, navigate]);

  return <>{children}</>;
}

// src/components/CheckAuth.jsx
import React, { useEffect } from 'react';
import { useUser } from '../service/context.provider';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function CheckAuth({ children }) {
  const {
    connectedUserToken,
    setConnectedUserId,
    setConnectedUserToken
  } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    let logoutTimer;

    const doLogout = () => {
      setConnectedUserId(null);
      setConnectedUserToken(null);
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
      navigate('/login', { replace: true });
    };

    if (connectedUserToken) {
      try {
        const { exp } = jwt_decode(connectedUserToken);
        const expiresAt = exp * 1000;
        const now = Date.now();

        if (now >= expiresAt) {
          
          doLogout();
        } else {
          
          const delay = expiresAt - now;
          logoutTimer = setTimeout(doLogout, delay);
        }
      } catch (err) {
        console.error('Échec décodage du token', err);
        doLogout();
      }
    } else {
      // Pas de token : on force la connexion
      navigate('/login', { replace: true });
    }

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [
    connectedUserToken,
    setConnectedUserId,
    setConnectedUserToken,
    navigate
  ]);

  return <>{children}</>;
}

import React, { useEffect } from 'react';
import { useUser } from '../service/context.provider';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const CheckAuth = ({ children }) => {
  const {
    connectedUserId,
    connectedUserToken,
    connectedUserPassword,
    setConnectedUserId,
    setConnectedUserToken,
    setConnectedUserPassword
  } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (connectedUserToken) {
      try {
        const decoded = jwt_decode(connectedUserToken);
   
        if (decoded.exp * 1000 < Date.now()) {
          
          setConnectedUserId(null);
          setConnectedUserToken(null);
          setConnectedUserPassword(null);
          localStorage.removeItem("userId");
          localStorage.removeItem("userToken");
          localStorage.removeItem("userPassword");
          navigate('/login');
         
          
        }
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
      }
    }
  }, [connectedUserToken, setConnectedUserId, setConnectedUserToken, setConnectedUserPassword, navigate]);

  return children;
};

export default CheckAuth;

// PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../service/context.provider';
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ children }) => {
    const { connectedUserToken } = useUser();
    console.log("connectedUserToken", connectedUserToken);
  
    if (connectedUserToken) {
      try {
        const decoded = jwtDecode(connectedUserToken);
        console.log("Decoded token:", decoded);
        if (!decoded || !decoded.exp) {
          console.warn("Le token ne contient pas de champ exp");
        } else {
          const tokenExpiryMs = decoded.exp * 1000;
          console.log("Token expiry (ms):", tokenExpiryMs, "Current time (ms):", Date.now());
          if (tokenExpiryMs > Date.now()) {
           
            
            return  <Navigate to="/mainpage" replace />;
            
            
             
          } else {
            console.warn("Token expiré");
          }
        }
      } catch (error) {
        console.error("Erreur lors du décodage du token", error);
      }
    }
    return children;
  };
  
  export default PublicRoute;
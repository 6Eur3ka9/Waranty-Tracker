// src/components/PublicRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './context.provider';
import * as jwt_decode from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { connectedUserToken } = useUser();

  if (connectedUserToken) {
    try {
      // on appelle la fonction par le biais de `.default`
      const decoded = jwt_decode.default<DecodedToken>(connectedUserToken);

      if (decoded.exp * 1000 > Date.now()) {
        return <Navigate to="/mainpage" replace />;
      }
    } catch (err) {
      console.error('Erreur lors du décodage du token :', err);
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default PublicRoute;

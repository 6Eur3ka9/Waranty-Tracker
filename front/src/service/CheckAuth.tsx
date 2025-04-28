// components/CheckAuth.tsx
import React, { ReactNode, useEffect } from 'react';
import { useUser } from './context.provider';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


interface DecodedToken {
  exp: number;         
  [key: string]: unknown;   
}

interface CheckAuthProps {
  children: ReactNode;
}

const CheckAuth: React.FC<CheckAuthProps> = ({ children }) => {
  const {
    connectedUserToken,
    setConnectedUserId,
    setConnectedUserToken,
    setConnectedUserPassword,
  } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!connectedUserToken) return;

    try {
     
      const decoded = jwt_decode<DecodedToken>(connectedUserToken);
      // if (typeof decoded.exp !== 'number') {
      //   throw new Error('Invalid token: exp is not a number');
      // }

     
      if (decoded.exp * 1000 < Date.now()) {
      
        setConnectedUserId(null);
        setConnectedUserToken(null);
        setConnectedUserPassword(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userPassword');
        navigate('/login');
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
     
      navigate('/login');
    }
  }, [
    connectedUserToken,
    setConnectedUserId,
    setConnectedUserToken,
    setConnectedUserPassword,
    navigate,
  ]);

  return <>{children}</>;
};

export default CheckAuth;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './context.provider';

export default function PublicRoute() {
  const { connectedUserToken } = useUser();

  // Si déjà connecté, on redirige vers la page protégée (ici "/home")
  if (connectedUserToken) {
    return <Navigate to="/home" replace />;
  }

  // Sinon on affiche l’Outlet, c’est-à-dire les routes enfants imbriquées
  return <Outlet />;
}

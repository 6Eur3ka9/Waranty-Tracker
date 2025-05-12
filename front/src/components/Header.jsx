import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { useUser } from '../service/context.provider';

export default function Header({ onMenuClick }) {
  const { connectedUserToken, setConnectedUserId, setConnectedUserToken } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setConnectedUserId(null);
    setConnectedUserToken(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md md:px-8">
      <div className="flex items-center">
        <button className="lg:hidden mr-4" onClick={onMenuClick}>
          <HiMenu size={24} />
        </button>
        <Link to="/" className="text-xl font-bold text-blue-800">
          Warranty Tracker
        </Link>
      </div>
      <nav className="hidden md:flex space-x-4">
        {!connectedUserToken ? (
          <>
            <Link to="/login" className="text-blue-800 hover:text-blue-600 mt-2">
              Se connecter
            </Link>
            <Link to="/register" className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              S’inscrire
            </Link>
          </>
        ) : (
          <>
            
          </>
        )}
      </nav>
    </header>
  );
}

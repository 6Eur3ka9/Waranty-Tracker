// src/components/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HiX,
  HiHome,
  HiPlus,
  HiCollection,
  HiUser,
  HiStar
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../service/context.provider';
import { UserService } from '../service/user.service';

export default function Sidebar({ isOpen, onClose }) {
  const {
    connectedUserId,
    setConnectedUserId,
    connectedUserToken,
    setConnectedUserToken
  } = useUser();

  const [userPlan, setUserPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (connectedUserToken && connectedUserId) {
      UserService.getUserById(connectedUserId)
        .then(res => {
          setUserPlan(res.data.plan);
        })
        .catch(console.error)
        .finally(() => {
          setLoadingPlan(false);
        });
    } else {
    
      setLoadingPlan(false);
    }
  }, [connectedUserToken, connectedUserId]);

  const handleLogout = () => {
    setConnectedUserId(null);
    setConnectedUserToken(null);
    localStorage.clear();
    navigate('/login');
  };

  const links = [
    { name: 'Tableau de bord', to: '/home', icon: <HiHome className="inline mr-2" /> },
    { name: 'Ajouter garantie', to: '/add-warranty', icon: <HiPlus className="inline mr-2" /> },
    { name: 'Mes garanties', to: '/warranty', icon: <HiCollection className="inline mr-2" /> },
    { name: 'Mon profil', to: '/profile', icon: <HiUser className="inline mr-2" /> },
  ];

  const linkClass = path => {
    const base = "flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition";
    return location.pathname === path
      ? `${base} border-l-4 border-blue-500 bg-gray-100`
      : base;
  };

  return (
    <>
     
      <div className="hidden lg:flex lg:flex-col w-64 bg-white shadow-lg h-screen">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-blue-800">WT</Link>
        </div>

      
        {connectedUserToken && !loadingPlan && userPlan !== 'pro' && (
          <button
            onClick={() => navigate('/subscribe')}
            className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded mb-4 mx-4 cursor-pointer"
          >
            <HiStar className="inline mr-2" /> Tracker Pro
          </button>
        )}

        <ul className="flex-1 space-y-2 px-2">
          {links.map((link, i) => (
            <li key={i}>
              <Link to={link.to} className={linkClass(link.to)}>
                {link.icon}{link.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md transition"
            >
              <HiX className="inline mr-2" /> Déconnexion
            </button>
          </li>
        </ul>

        <div className="px-4 py-4 border-t">
          <Link to="/contact-us" className="block text-sm text-gray-600 hover:underline mb-2">Nous contacter</Link>
          <Link to="/legalmentions" className="block text-sm text-gray-600 hover:underline mb-2">Mentions légales</Link>
          <Link to="/aboutus" className="block text-sm text-gray-600 hover:underline">Qui sommes nous</Link>
        </div>
      </div>

  
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed inset-0 z-50 flex bg-black bg-opacity-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full bg-white shadow-lg flex flex-col"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <Link to="/" className="text-xl font-bold text-blue-800">WT</Link>
                <button onClick={onClose}><HiX size={24} /></button>
              </div>

             
              {connectedUserToken && !loadingPlan && userPlan !== 'pro' && (
                <button
                  onClick={() => { onClose(); navigate('/subscribe'); }}
                  className="mt-4 mx-6 mb-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded"
                >
                  <HiStar className="inline mr-2" /> Tracker Pro
                </button>
              )}

              <ul className="flex-col space-y-2 p-6">
                {links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className={linkClass(link.to)}
                    >
                      {link.icon}{link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => { onClose(); handleLogout(); }}
                    className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    <HiX className="inline mr-2" /> Déconnexion
                  </button>
                </li>
              </ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

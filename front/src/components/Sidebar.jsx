// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { useUser } from '../service/context.provider';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setConnectedUserId, setConnectedUserToken } = useUser();

  const handleLogout = () => {
    setConnectedUserId(null);
    setConnectedUserToken(null);
    localStorage.clear();
    navigate('/login');
  };

  const links = [
    { name: 'Tableau de bord', to: '/home' },
    { name: 'Ajouter une garantie', to: '/add-warranty' },
    { name: 'Mes garanties', to: '/warranties' },
    { name: 'Mon profil', to: '/profile' },
  ];

  const linkClass = (path) => {
    const base = "block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition";
    return location.pathname === path
      ? `${base} border-l-4 border-blue-500 bg-gray-100`
      : base;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col w-64 bg-white shadow-lg h-screen">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-blue-800">
            WT
          </Link>
        </div>

        <ul className="flex-1 space-y-2 px-2">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.to}
                className={linkClass(link.to)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md transition"
            >
              Déconnexion
            </button>
          </li>
        </ul>

        {/* Footer links at bottom */}
        <div className="px-4 py-4 border-t">
          <Link
            to="/contact-us"
            className="block text-sm text-gray-600 hover:underline mb-2"
          >
            Nous contacter
          </Link>
          <Link
            to="/legalmentions"
            className="block text-sm text-gray-600 hover:underline mb-2"
          >
            Mentions légales
          </Link>
          <Link
            to="/aboutus"
            className="block text-sm text-gray-600 hover:underline"
          >
            Qui sommes nous
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed inset-0 z-50 flex bg-black bg-opacity-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-64 bg-white shadow-lg flex flex-col h-full"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'tween' }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <span className="text-xl font-bold text-blue-800">WT</span>
                <button onClick={onClose}>
                  <HiX size={24} />
                </button>
              </div>

              <ul className="flex-1 space-y-2 p-4 overflow-auto">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className={linkClass(link.to)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => { onClose(); handleLogout(); }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md transition"
                  >
                    Déconnexion
                  </button>
                </li>
              </ul>

              {/* Footer links in mobile drawer */}
              <div className="px-4 py-4 border-t">
                <Link
                  to="/contact-us"
                  onClick={onClose}
                  className="block text-sm text-gray-600 hover:underline mb-2"
                >
                  Nous contacter
                </Link>
                <Link
                  to="/legalmentions"
                  onClick={onClose}
                  className="block text-sm text-gray-600 hover:underline mb-2"
                >
                  Mentions légales
                </Link>
                <Link
                  to="/aboutus"
                  onClick={onClose}
                  className="block text-sm text-gray-600 hover:underline"
                >
                  Qui sommes nous
                </Link>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

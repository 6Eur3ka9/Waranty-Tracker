import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-gray-800 border-b border-gray-200 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="text-2xl font-bold">Waranty Tracker</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <motion.a
              href="/login"
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-800"
            >
              Se connecter
            </motion.a>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
            >
              S’inscrire
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-b border-gray-200 shadow-md"
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-800"
            >
              Se connecter
            </motion.a>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
            >
              S’inscrire
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Header;

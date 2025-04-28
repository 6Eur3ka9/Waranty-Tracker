import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => (
  <motion.nav
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white text-gray-800 border-b border-gray-200 shadow-md"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="text-2xl font-bold">Waranty Tracker</div>
        <div className="flex space-x-4">
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
      </div>
    </div>
  </motion.nav>
);

export default Header;
// src/pages/PaymentCancelPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function PaymentCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={false} onClose={() => {}} />
      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500">
        {/* Header mobile/tablette */}
        <div className="lg:hidden">
          <Header onMenuClick={() => {}} />
        </div>

        <motion.div
          className="flex-1 flex items-center justify-center p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-xl p-10 max-w-sm w-full text-center space-y-6">
            {/* Icône d’erreur */}
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.902-1.07 1.655-2.11l-2.516-8.478A1.993 1.993 0 0016.44 6H7.558a1.993 1.993 0 00-1.917 1.412l-2.516 8.478A2.003 2.003 0 005.144 19z"
              />
            </svg>

            <h1 className="text-2xl font-bold text-gray-800">Paiement annulé</h1>
            <p className="text-gray-600">
              Votre paiement n’a pas pu être traité. Vous pouvez réessayer ou nous contacter pour assistance.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              Retour à l’accueil
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

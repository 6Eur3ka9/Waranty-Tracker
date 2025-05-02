// src/pages/PaymentSuccessPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function PaymentSuccessPage() {
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
            {/* Icône de succès */}
            <svg
              className="mx-auto h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2l4 -4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
              />
            </svg>

            <h1 className="text-2xl font-bold text-gray-800">Paiement réussi !</h1>
            <p className="text-gray-600">
              Merci pour votre souscription Pro. Votre transaction a été validée avec succès.
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

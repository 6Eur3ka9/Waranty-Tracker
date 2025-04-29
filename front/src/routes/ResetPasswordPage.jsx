// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserService } from '../service/user.service';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleReset = async e => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      await UserService.resetPasswordFinalize({ token, password: newPassword });
      setMessage({ type: 'success', text: 'Mot de passe réinitialisé avec succès. Vous allez être redirigé.' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Échec de la réinitialisation. Veuillez réessayer.' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-blue-500">
      <Header />
      <motion.main
        className="flex-1 flex items-center justify-center px-6 lg:px-20 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.form
          onSubmit={handleReset}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Réinitialiser le mot de passe</h2>
          <label className="block mb-4">
            <span className="text-gray-700">Nouveau mot de passe</span>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Valider
          </button>
          {message.text && (
            <p
              className={`text-sm mt-4 ${
                message.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message.text}
            </p>
          )}
        </motion.form>
      </motion.main>
      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implémenter la logique d'inscription
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 font-sans">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        {/* Illustration */}
        <motion.div
          className="hidden lg:block lg:w-1/2 h-64 lg:h-auto"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-full h-full border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Image Placeholder</span>
          </div>
        </motion.div>
        {/* Formulaire */}
        <motion.form
          onSubmit={handleRegister}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-10 w-full max-w-md mx-auto space-y-6"
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Inscription</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className="text-sm text-right">
            <a href="/login" className="text-blue-600 hover:underline">
              Déjà un compte ?
            </a>
          </p>
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
          >
            S'inscrire
          </button>
        </motion.form>
      </motion.main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
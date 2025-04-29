import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../service/context.provider';
import { UserService } from '../service/user.service';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setConnectedUserId, setConnectedUserToken } = useUser();
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
   
      const data = {username: username, email: email, password: password}
      console.log(data);
      
      UserService.register(data)
      .then((data) => {
        console.log(data.data);
        
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userId', data.userId);
        setConnectedUserToken(data.token);
        setConnectedUserId(data.userId);
        navigate('/home');
      })
      .catch((err) => {
        console.error(err);
      });



  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-blue-500">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-16">
        {/* Illustration desktop */}
        <motion.div
          className="hidden lg:flex flex-1 justify-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="border border-gray-300 border-dashed rounded-lg h-80 w-80 flex items-center justify-center bg-white">
            <span className="text-gray-500">Image Placeholder</span>
          </div>
        </motion.div>

        {/* Formulaire */}
        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-2xl font-semibold mb-6">Inscription</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d’utilisateur
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre pseudo"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse mail
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="adresse@mail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end mb-6">
              <a href="/login" className="text-sm text-blue-600 hover:underline">
                Déjà un compte ?
              </a>
            </div>
            <motion.button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              S’inscrire
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

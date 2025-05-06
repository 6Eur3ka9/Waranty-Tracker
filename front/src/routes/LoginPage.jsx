
import React, { useState } from 'react';
import { useNavigate }   from 'react-router-dom';
import { motion }        from 'framer-motion';
import { useUser }       from '../service/context.provider';
import { UserService }   from '../service/user.service';
import Header            from '../components/Header';
import Footer            from '../components/Footer';
import Regex             from '../assets/regex.png';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { setConnectedUserId, setConnectedUserToken } = useUser();
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setError(''); 
    try {
      const { data } = await UserService.login({ email, password });
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data.userId);
      setConnectedUserToken(data.token);
      setConnectedUserId(data.userId);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Adresse mail ou mot de passe invalide.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-blue-500">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-16">
      
        <motion.div
          className="hidden lg:flex flex-1 justify-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-120 w-150 flex items-center justify-center">
            <img src={Regex} alt="Regex" className="h-full w-full rounded-lg" />
          </div>
        </motion.div>

       
        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-2xl font-semibold mb-6">Connexion</h2>
          <form onSubmit={handleLogin} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse mail
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                id="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center mb-6 text-sm">
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Mot de passe oublié ?
              </a>
              <a href="/register" className="text-blue-600 hover:underline">
                Pas de compte ? Créer un compte
              </a>
            </div>

            <motion.button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md
                         hover:bg-blue-700 transition"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Se connecter
            </motion.button>

           
            {error && (
              <p className="mt-4 text-center text-red-500 text-sm">
                {error}
              </p>
            )}
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

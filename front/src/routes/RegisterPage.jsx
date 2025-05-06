// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate }       from 'react-router-dom';
import { motion }            from 'framer-motion';
import zxcvbn                from 'zxcvbn';
import { HiCheckCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { useUser }           from '../service/context.provider';
import { UserService }       from '../service/user.service';
import Header                from '../components/Header';
import Footer                from '../components/Footer';
import Regex                 from '../assets/regex.png';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export default function RegisterPage() {
  const [username, setUsername]    = useState('');
  const [email, setEmail]          = useState('');
  const [password, setPassword]    = useState('');
  const [error, setError]          = useState('');
  const [pwdValid, setPwdValid]    = useState(false);
  const [strength, setStrength]    = useState(0);
  const { setConnectedUserId, setConnectedUserToken } = useUser();
  const navigate = useNavigate();


  useEffect(() => {
    const { score } = zxcvbn(password);
    setStrength(score); 
    setPwdValid(PASSWORD_REGEX.test(password));
  }, [password]);

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    if (!pwdValid) {
      setError('Le mot de passe ne remplit pas tous les critères.');
      return;
    }
    try {
      const { data } = await UserService.register({ username, email, password });
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data.userId);
      setConnectedUserToken(data.token);
      setConnectedUserId(data.userId);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Erreur lors de l’inscription.');
    }
  };


  const checks = [
    { label: 'Au moins 8 caractères', valid: password.length >= 8 },
    { label: 'Une lettre minuscule',  valid: /[a-z]/.test(password) },
    { label: 'Une lettre majuscule',  valid: /[A-Z]/.test(password) },
    { label: 'Un chiffre',            valid: /[0-9]/.test(password) },
    { label: 'Un caractère spécial (!@#$%^&*)', valid: /[!@#\$%\^&\*]/.test(password) },
  ];


  const barWidth = `${(strength / 4) * 100}%`;
  const barColor =
    strength <= 1 ? 'bg-red-500' :
    strength === 2 ? 'bg-yellow-500' :
    'bg-green-500';

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
          <img src={Regex} alt="Regex illustration" className="h-120 w-150 rounded-lg" />
        </motion.div>

     
        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-2xl font-semibold mb-6">Inscription</h2>
          <form onSubmit={handleRegister} noValidate>
 
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d’utilisateur
              </label>
              <input
                id="username"
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="adresse@mail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
      
            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
       
            {password.length > 0 && (
              <div className="mb-4">
                <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
                  <div
                    className={`h-full ${barColor} transition-all duration-200`}
                    style={{ width: barWidth }}
                  />
                </div>
              </div>
            )}
      
            {password.length > 0 && (
              <ul className="mb-4 space-y-2">
                {checks.map((c, i) => (
                  <li key={i} className="flex items-center text-sm">
                    {c.valid
                      ? <HiCheckCircle className="text-green-500 w-5 h-5 mr-2" />
                      : <HiOutlineCheckCircle className="text-gray-400 w-5 h-5 mr-2" />
                    }
                    <span className={c.valid ? 'text-green-600' : 'text-gray-600'}>
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          
            <div className="flex justify-end mb-6">
              <a href="/login" className="text-sm text-blue-600 hover:underline">
                Déjà un compte ?
              </a>
            </div>
         
            <motion.button
              type="submit"
              disabled={!pwdValid}
              className={`w-full py-2 px-4 font-semibold rounded-md shadow-md transition
                ${pwdValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
              `}
              whileHover={pwdValid ? { scale: 1.05 } : {}}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              S’inscrire
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

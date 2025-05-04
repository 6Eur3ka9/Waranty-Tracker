import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserService } from '../service/user.service';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setIsLoading(true);
    try {
      const response = await UserService.resetPassword({ email });
      
      if (response.data.resetLink) {
        setMessage({
          type: 'success',
          text: "Un lien de réinitialisation vient d'être envoyé à votre adresse e-mail."
        });
      } else {
   
        setMessage({
          type: 'success',
          text: "Si cette adresse existe, vous recevrez bientôt un e-mail de réinitialisation."
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text: "Une erreur est survenue. Veuillez réessayer plus tard."
      });
    }
    setIsLoading(false);
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
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Mot de passe oublié</h2>
          <label className="block mb-4">
            <span className="text-gray-700">Adresse e-mail</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="votre.email@example.com"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4" fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : 'Envoyer le lien'}
          </button>
          {message.text && (
            <p className={`text-center text-sm mt-4 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message.text}
            </p>
          )}
        </motion.form>
      </motion.main>
      <Footer />
    </div>
  );
}

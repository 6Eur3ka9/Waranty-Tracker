// src/pages/SubscribePage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../service/context.provider';
import { UserService } from '../service/user.service';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../service/payment.service';

export default function SubscribePage() {
  const { connectedUserId, connectedUserToken, setConnectedUserToken } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plan, setPlan] = useState('free');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const  navigate = useNavigate();


  useEffect(() => {
    if (!connectedUserToken) return;
    UserService.getUserById(connectedUserId)
      .then(res => {
        setPlan(res.data.plan || 'free');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [connectedUserId, connectedUserToken]);

  const handleSubscribe = async () => {
    const stripe = await loadStripe('pk_test_51RJa0N4IGhkypRYuIL8QqCSEDilt60t4tZ0FIOlONZZUSMPT08TuKOEESh9y9h8wffMEF8GRNDj5Tbl69anNSlhG001hUs7Ea9');

    const body = {
      userId: connectedUserId,
      plan: 'pro',
    };

    PaymentService.createCheckoutSession(body)
      .then(res => {
        console.log(res.data);
        
         stripe.redirectToCheckout({ sessionId: res.data.id });

  }).catch(err => {
        console.error(err);
        setMessage({ type: 'error', text: 'Une erreur est survenue. Réessayez plus tard.' });
      })
  };  

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500">
        {/* Header sur mobile/tablette */}
        <div className="lg:hidden">
          <Header onMenuClick={openSidebar} />
        </div>

        <motion.main
          className="flex-1 p-6 lg:p-20 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-2xl lg:text-3xl font-bold text-white mb-8"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Abonnement
          </motion.h1>

          {loading ? (
            <p className="text-white">Chargement…</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <motion.div
                className={`p-6 bg-white rounded-lg shadow-lg flex flex-col ${
                  plan === 'free' ? 'border-4 border-blue-600' : ''
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.03 }}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Plan Gratuit</h2>
                <p className="text-gray-600 mb-6">Jusqu’à 3 garanties suivies gratuitement.</p>
                <button
                  disabled
                  className="mt-auto bg-gray-300 text-gray-700 py-2 rounded-md cursor-not-allowed"
                >
                  Actif
                </button>
              </motion.div>

             
              <motion.div
                className={`p-6 bg-white rounded-lg shadow-lg flex flex-col ${
                  plan === 'pro' ? 'border-4 border-green-600' : ''
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: plan === 'pro' ? 1 : 1.03 }}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Plan Pro</h2>
                <p className="text-gray-600 mb-6">
                  Garantie illimitée pour seulement 0,99 € par mois.
                </p>
                <button
                  onClick={handleSubscribe}
                  disabled={plan === 'pro'}
                  className={`mt-auto py-2 rounded-md text-white cursor-pointer ${
                    plan === 'pro'
                      ? 'bg-green-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {plan === 'pro' ? 'Déjà abonné' : 'Passer au Pro'}
                </button>
              </motion.div>
            </div>
          )}

          {message.text && (
            <p
              className={`mt-8 text-center text-sm ${
                message.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message.text}
            </p>
          )}
        </motion.main>
      </div>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header  from '../components/Header';
import { useUser } from '../service/context.provider';
import { UserService } from '../service/user.service';

export default function PaymentSuccessPage() {
  const { connectedUserId } = useUser();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const sessionId      = searchParams.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sessionId);
    
    if (!sessionId) {
     
      navigate('/', { replace: true });
      return;
    }
    if (!connectedUserId) {
      setLoading(false);
      return;
    }
    console.log(sessionId);
    
    const data = {
      userId: connectedUserId,
      plan: 'pro'
    };
    console.log('data:', data);
    
    UserService.editPlan(data)
      .then(res => {
      
        
        setTimeout(() => navigate('/home'), 3000);
      })
      .catch(err => console.error('Erreur editPlan:', err))
     
  }, [connectedUserId, navigate]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={false} onClose={() => {}} />
      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500">
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
            {loading ? (
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 text-green-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <p className="mt-4 text-gray-600">Activation du plan Pro…</p>
              </div>
            ) : (
              <>
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2l4 -4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" />
                </svg>
                <h1 className="text-2xl font-bold text-gray-800">Paiement réussi !</h1>
                <p className="text-gray-600">
                  Votre plan Pro est maintenant actif. Merci pour votre confiance !
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                >
                  Retour à l’accueil
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

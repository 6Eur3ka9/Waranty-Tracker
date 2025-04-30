// src/pages/PaymentResultPage.jsx
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('payment_intent_status'); // Stripe ajoute ce param
  const message =
    status === 'succeeded'
      ? '✅ Paiement réussi ! Merci pour votre confiance.'
      : '⚠️ Le paiement a échoué ou a été annulé.';

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={false} onClose={()=>{}} />
      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500 items-center justify-center p-8">
        <Header />
        <p className="text-white text-xl">{message}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Retour à l’accueil
        </button>
      </div>
    </div>
  );
}

// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { PaymentService } from '../service/payment.service';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const stripePromise = loadStripe('pk_test_51RJa0N4IGhkypRYuIL8QqCSEDilt60t4tZ0FIOlONZZUSMPT08TuKOEESh9y9h8wffMEF8GRNDj5Tbl69anNSlhG001hUs7Ea9');

const VAT_RATES = [
  { country: 'FR', rate: 20 },
  { country: 'DE', rate: 19 },
  { country: 'IT', rate: 22 },
  { country: 'ES', rate: 21 },
  { country: 'NL', rate: 21 },
];

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [vatRate, setVatRate] = useState(20);
  const [message, setMessage] = useState({ type: '', text: '' });
  const basePrice = 0.99;

  // détecter pays
  useEffect(() => {
    const country = (navigator.language.split('-')[1] || 'FR').toUpperCase();
    const found = VAT_RATES.find(v => v.country === country);
    if (found) setVatRate(found.rate);
  }, []);

  const total = (basePrice * (1 + vatRate/100)).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
  
    if (!stripe || !elements) {
      setMessage({ type: 'error', text: 'Stripe n’a pas chargé. Réessayez plus tard.' });
      return;
    }
  
    // 1) Création du PaymentMethod
    const cardElement = elements.getElement(CardElement);
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { name }
    });
    if (pmError) {
      setMessage({ type: 'error', text: pmError.message });
      return;
    }
  
    try {
      // 2) Création du PaymentIntent (non confirmé)
      const cents = Math.round(Number(total) * 100);
      const response = await PaymentService.createPaymentIntent({
        amount: cents,
        currency: 'eur'
      });
      const clientSecret = response.data.clientSecret;
  
      // 3) Construction d’un return_url complet
      const frontUrl = import.meta.env.VITE_FRONT_URL || window.location.origin;
      // Ex : "http://localhost:5173" ou "https://votre-domaine.com"
      const returnUrl = `${frontUrl.replace(/\/$/, '')}/payment-result`;
  
      // 4) Confirmation du paiement avec 3D Secure
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
          return_url: returnUrl
        });
  
      // 5) Gestion du résultat
      if (confirmError) {
        setMessage({ type: 'error', text: confirmError.message });
      } else if (paymentIntent.status === 'succeeded') {
        setMessage({ type: 'success', text: '✅ Paiement réussi !' });
      } else {
        setMessage({ type: 'error', text: `Statut inattendu : ${paymentIntent.status}` });
      }
    } catch (err) {
      console.error('Erreur paiement :', err);
      setMessage({ type: 'error', text: '⚠️ Une erreur est survenue lors du paiement.' });
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Nom du titulaire</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Jean Dupont"
          className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Carte bancaire</label>
        <div className="border rounded-md p-3">
          <CardElement options={{ style:{ base:{ fontSize:'16px' } }}} />
        </div>
      </div>

      <div className="space-y-1 bg-gray-50 p-4 rounded-md">
        <p className="text-gray-700">Prix HT : {basePrice.toFixed(2)} €</p>
        <p className="text-gray-700">TVA ({vatRate}%) : {(basePrice * vatRate/100).toFixed(2)} €</p>
        <p className="text-lg font-semibold">Total TTC : {total} €</p>
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md transition cursor-pointer"
      >
        Payer {total} €
      </button>

      {message.text && (
        <p className={`text-center text-sm ${message.type==='success'?'text-green-500':'text-red-500'}`}>
          {message.text}
        </p>
      )}
    </form>
  );
}

export default function PaymentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500">
        {/* Header mobile/tablette */}
        <div className="lg:hidden">
          <Header onMenuClick={openSidebar} />
        </div>

        <motion.main
          className="flex-1 p-6 lg:p-20 overflow-auto flex items-center justify-center"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.5 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2"
            initial={{ scale:0.9, opacity:0 }}
            animate={{ scale:1, opacity:1 }}
            transition={{ duration:0.5 }}
          >
            {/* Résumé du plan */}
            <div className="p-8 bg-gray-50 flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800">Plan Pro</h2>
              <p className="mt-4 text-gray-700 flex-1">
                Bénéficiez d’un suivi illimité de vos garanties pour seulement <br/><span className="font-semibold">0,99 € / mois</span>.
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>✓ Garanties illimitées</li>
                <li>✓ Accès prioritaire au support</li>
        
                <li>✓ Annulez a tout moment</li>
              </ul>
            </div>

            {/* Formulaire */}
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations de paiement</h2>
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}

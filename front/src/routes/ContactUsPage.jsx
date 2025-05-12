import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default function ContactUsPage() {
  const formRef = useRef();
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));


  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = e => {
    e.preventDefault();
    setStatus({ type: '', text: '' });
    setLoading(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus({ type: 'success', text: "Merci, votre message a bien été envoyé !" });
        setLoading(false);
        formRef.current.reset();
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        setStatus({ type: 'error', text: "Échec de l'envoi, réessayez plus tard." });
        setLoading(false);
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {userId ? (
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      ) : (
        <div></div>
      )}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500 overflow-auto">

     {userId ? (
               <div className="lg:hidden">
                 <Header onMenuClick={openSidebar} />
               </div>
             ) : (
               <Header onMenuClick={openSidebar} />
             )}
      <motion.main
        className="flex-1 flex items-center justify-center px-6 lg:px-20 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.section
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nous contacter</h1>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="reply_to" className="block text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                name="reply_to"
                id="email"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="prenom@exemple.com"
              />
            </div>

            <div>
              <label htmlFor="objet" className="block text-gray-700 mb-1">Sujet</label>
              <input
                type="text"
                name="objet"
                id="objet"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Objet de votre message"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                id="message"
                required
                rows={5}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre message..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow hover:bg-blue-700 transition disabled:opacity-50"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {loading ? 'Envoi…' : 'Envoyer'}
            </motion.button>
          </form>

          {status.text && (
            <p
              className={`mt-4 text-center text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'
                }`}
            >
              {status.text}
            </p>
          )}
        </motion.section>
      </motion.main>
{userId ? (
  <div></div>
) : (
  <Footer />
)}
</div>
    </div>
  );
}

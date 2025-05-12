// src/pages/AboutUsPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutUsPage() {
 const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  return (
    <div className="flex h-screen overflow-hidden">
      {userId ? (
              <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            ) : (
             <div></div>
            )}

      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500">
        <div className="lg:hidden">
          <Header onMenuClick={openSidebar} />
        </div>

        <motion.main
          className="flex-1 overflow-auto px-6 lg:px-20 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-3xl lg:text-4xl font-bold text-white mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Qui sommes-nous ?
          </motion.h1>

          <motion.section
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notre mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Warranty Tracker simplifie la gestion de vos garanties en centralisant toutes vos informations en un seul endroit. 
              Recevez des alertes avant l'expiration et profitez d'un suivi illimité avec notre abonnement Pro.
            </p>
          </motion.section>

          <motion.section
            className="grid gap-8 md:grid-cols-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Nos valeurs</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Transparence et simplicité</li>
                <li>Respect de la vie privée</li>
                <li>Innovation continue</li>
                <li>Support réactif</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Notre équipe</h3>
              <p className="text-gray-600 leading-relaxed">
                Fondé par une équipe passionnée de développeurs et de chefs de produits,
                Warranty Tracker met l'accent sur l'expérience utilisateur et la fiabilité technique.
              </p>
            </div>
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

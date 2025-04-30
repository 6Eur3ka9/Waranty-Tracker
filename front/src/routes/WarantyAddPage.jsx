// src/pages/AddWarrantyPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../service/context.provider';
import { WarrantyService } from '../service/waranty.service';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function AddWarrantyPage() {
  const { connectedUserToken } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  // États du formulaire
  const [productName, setProductName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAdd = e => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
  
    if (!connectedUserToken) {
      setMessage({ type: 'error', text: 'Vous devez être connecté.' });
      return;
    }
  
    const data = {
      productName,        
      purchaseDate,
      expiryDate,
    };
  
    WarrantyService.addWarranty(data)
      .then(() => {
        setMessage({ type: 'success', text: 'Garantie ajoutée avec succès.' });
        setProductName('');
        setPurchaseDate('');
        setExpiryDate('');
      })
      .catch(err => {
        console.error(err);
        setMessage({ type: 'error', text: 'Erreur lors de l’ajout de la garantie.' });
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500">
        
       <Header onMenuClick={openSidebar} />
       

        <motion.main
          className="flex-1 p-6 lg:p-20 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.section
            className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl font-bold text-gray-800">Ajouter une garantie</h1>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Nom du produit</label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Smartphone XYZ"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Date d’achat</label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={e => setPurchaseDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Date d’expiration</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Ajouter
              </button>
            </form>

            {message.text && (
              <p
                className={`text-sm mt-4 text-center ${
                  message.type === 'success' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message.text}
              </p>
            )}
          </motion.section>
        </motion.main>
      </div>
    </div>
  );
}

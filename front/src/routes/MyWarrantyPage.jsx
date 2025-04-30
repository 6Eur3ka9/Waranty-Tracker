
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, differenceInDays, parseISO } from 'date-fns';
import { useUser } from '../service/context.provider';
import { WarrantyService } from '../service/waranty.service';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MyWarrantyPage() {
  const { connectedUserToken } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [warranties, setWarranties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    if (!connectedUserToken) return;
    setLoading(true);
    const userId = localStorage.getItem('userId');
    WarrantyService.getWarrantyByUserId(userId)
      .then(res => {
        console.log(res.data, "warranties");
        
        setWarranties(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Impossible de charger vos garanties.');
        setLoading(false);
      });
  }, [connectedUserToken]);

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
          <motion.h1
            className="text-2xl lg:text-3xl font-bold text-white mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Mes garanties
          </motion.h1>

          {loading ? (
            <p className="text-white">Chargement…</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : warranties.length === 0 ? (
            <p className="text-white">Vous n’avez aucune garantie enregistrée.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {warranties.map(w => {
                const expDate = parseISO(w.expiryDate);
                const daysLeft = differenceInDays(expDate, new Date());
                return (
                  <motion.div
                    key={w._id}
                    className={`bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between ${
                      daysLeft < 0 ? 'opacity-60' : ''
                    }`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        {w.productName}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Achat : {format(parseISO(w.purchaseDate), 'dd/MM/yyyy')}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Expire : {format(expDate, 'dd/MM/yyyy')}
                      </p>
                    </div>
                    <div>
                      {daysLeft >= 0 ? (
                        <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded">
                          {daysLeft} jour{daysLeft > 1 ? 's' : ''} restants
                        </span>
                      ) : (
                        <span className="inline-block bg-red-200 text-red-800 text-xs px-2 py-1 rounded">
                          Expirée
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.main>
      </div>
    </div>
  );
}

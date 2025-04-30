// src/pages/MyWarrantyPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, differenceInDays, parseISO, compareAsc, compareDesc } from 'date-fns';
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
  const [sortOrder, setSortOrder] = useState(''); // 'asc' ou 'desc'
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    productName: '',
    purchaseDate: '',
    expiryDate: ''
  });

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  // Charger les garanties
  useEffect(() => {
    if (!connectedUserToken) return;
    setLoading(true);
    const userId = localStorage.getItem('userId');
    WarrantyService.getWarrantyByUserId(userId)
      .then(res => {
        let list = res.data || [];
        list.sort((a, b) => 
          sortOrder === 'asc'
            ? compareAsc(parseISO(a.expiryDate), parseISO(b.expiryDate))
            : compareDesc(parseISO(a.expiryDate), parseISO(b.expiryDate))
        );
        setWarranties(list);
      })
      .catch(err => {
        console.error(err);
        setError('Impossible de charger vos garanties.');
      })
      .finally(() => setLoading(false));
  }, [connectedUserToken, sortOrder]);

  // Supprimer une garantie
  const handleDelete = id => {
    WarrantyService.deleteWarranty(id)
      .then(() => {
        setWarranties(ws => ws.filter(w => w._id !== id));
      })
      .catch(err => {
        console.error(err);
        alert('Échec de suppression');
      });
  };

  // Passer en mode édition
  const startEdit = w => {
    setEditingId(w._id);
    setEditData({
      productName: w.productName,
      purchaseDate: w.purchaseDate,
      expiryDate: w.expiryDate
    });
  };

  // Sauver les modifications
  const saveEdit = id => {
    
    WarrantyService.editWarranty(id, editData)
      .then(res => {
        setWarranties(ws => ws.map(w => w._id === id ? res.data.warranty : w));
        setEditingId(null);
      })
      .catch(err => {
        console.error(err);
        alert('Échec de la mise à jour');
      });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500">
        <Header onMenuClick={openSidebar} />

        <motion.main
          className="flex-1 p-6 lg:p-20 overflow-auto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-2xl lg:text-3xl font-bold text-white mb-6"
            initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
          >
            Mes garanties
          </motion.h1>

          {/* Contrôle de tri */}
          <div className="flex justify-end mb-4">
            <label className="text-white mr-2">Trier par expiration :</label>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="rounded px-2 py-1 text-amber-50 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">default</option>
              <option value="asc">Plus proche d'abord</option>
              <option value="desc">Plus lointain d'abord</option>
            </select>
          </div>

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
                const isEditing = editingId === w._id;

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
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editData.productName}
                          onChange={e => setEditData({...editData, productName: e.target.value})}
                          className="mb-2 border rounded px-2 py-1"
                        />
                        <input
                          type="date"
                          value={editData.purchaseDate}
                          onChange={e => setEditData({...editData, purchaseDate: e.target.value})}
                          className="mb-2 border rounded px-2 py-1"
                        />
                        <input
                          type="date"
                          value={editData.expiryDate}
                          onChange={e => setEditData({...editData, expiryDate: e.target.value})}
                          className="mb-4 border rounded px-2 py-1"
                        />
                        <div className="flex justify-between">
                          <button
                            onClick={() => saveEdit(w._id)}
                            className="bg-green-600 text-white px-4 py-1 rounded"
                          >
                            Enregistrer
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-400 text-white px-4 py-1 rounded"
                          >
                            Annuler
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
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
                        <div className="flex items-center justify-between">
                          <div>
                            {daysLeft >= 30 ? (
                              <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded">
                                {daysLeft} jour{daysLeft>1?'s':''} restants
                              </span>
                            ) : daysLeft >= 0 ? (
                              <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">
                                {daysLeft} jour{daysLeft>1?'s':''} restants
                              </span>
                            ) : (
                              <span className="inline-block bg-red-200 text-red-800 text-xs px-2 py-1 rounded">
                                Expirée
                              </span>
                            )}
                          </div>
                          <div className="space-x-2">
                            <button
                              onClick={() => startEdit(w)}
                              className="text-blue-600 hover:underline text-sm cursor-pointer"
                            >
                              Éditer
                            </button>
                            <button
                              onClick={() => handleDelete(w._id)}
                              className="text-red-600 hover:underline text-sm cursor-pointer "
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </>
                    )}
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

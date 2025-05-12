import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../service/context.provider';
import { WarrantyService } from '../service/waranty.service';
import { UserService } from '../service/user.service';
import Sidebar from '../components/Sidebar';
import addfile from '../assets/add-file.png';
import { HiX } from 'react-icons/hi';

export default function AddWarrantyPage() {
  const { connectedUserToken } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [warrantyCount, setWarrantyCount] = useState(0);
  const [plan, setPlan] = useState('free');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    if (!connectedUserToken) return;
    const userId = localStorage.getItem('userId');
    UserService.getUserById(userId)
      .then(res => setPlan(res.data.plan || 'free'))
      .catch(console.error);
    WarrantyService.getWarrantyByUserId(userId)
      .then(res => setWarrantyCount((res.data || []).length))
      .catch(console.error);
  }, [connectedUserToken]);

  const handleFileUpload = event => {
    const selected = event.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleAdd = e => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    if (plan === 'free' && warrantyCount >= 3) {
      setMessage({
        type: 'error',
        text: 'Vous avez atteint la limite gratuite (3 garanties). Passez au plan Pro pour en ajouter plus.'
      });
      return;
    }
    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('productName', productName);
    formData.append('purchaseDate', purchaseDate);
    formData.append('expiryDate', expiryDate);
    WarrantyService.addWarranty(formData)
      .then(() => {
        setMessage({ type: 'success', text: 'Garantie ajoutée avec succès.' });
        setProductName('');
        setPurchaseDate('');
        setExpiryDate('');
        setFile(null);
        setPreview(null);
        setWarrantyCount(c => c + 1);
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
        <button onClick={openSidebar} className="md:hidden p-4 text-white">Ouvrir le menu</button>
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
              <div>
                <label className="block text-gray-700 mb-1">Document de garantie</label>
                <label className="flex flex-col items-center justify-center border border-dashed border-gray-400 p-6 rounded-md cursor-pointer hover:bg-gray-50 transition">
                  <img src={addfile} alt="Ajouter un fichier" className="w-16 mb-2" />
                  <span className="text-sm text-gray-600">Cliquez pour ajouter votre facture</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              {preview && (
                <div className="mt-4 flex items-center space-x-4 border p-2">
                  <img src={preview} alt="aperçu" className="h-10 object-cover rounded shadow" />
                  <button type="button" onClick={removeFile} className="text-red-600">
                    <HiX size={20} />
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Ajouter
              </button>
            </form>
            {message.text && (
              <p className={`text-sm mt-4 text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {message.text}
              </p>
            )}
          </motion.section>
        </motion.main>
      </div>
    </div>
  );
}

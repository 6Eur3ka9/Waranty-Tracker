
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../service/context.provider';
import { UserService } from '../service/user.service';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function ProfilePage() {
  const { connectedUserId } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [infoMessage, setInfoMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  const [emailMessage, setEmailMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!connectedUserId) return;
    UserService.getUserById(connectedUserId)
      .then(response => {
        setUsername(response.data.username);
        setEmail(response.data.email);
      })
      .catch(err => {
        console.error(err);
      });
  }, [connectedUserId]);

  const handleUpdateInfo = e => {
    e.preventDefault();
    setInfoMessage({ type: '', text: '' });
    UserService.editUsername({ userId: connectedUserId, username })
      .then(() => UserService.editEmail({ userId: connectedUserId, email }))
      .then(() => {
        setInfoMessage({ type: 'success', text: 'Informations mises à jour.' });
      })
      .catch(err => {
        console.error(err);
        setInfoMessage({ type: 'error', text: 'Erreur lors de la mise à jour.' });
      });
  };

  const handleSendResetLink = () => {
    setPasswordMessage({ type: '', text: '' });
    UserService.resetPassword({ email })
      .then(() => {
        setPasswordMessage({ type: 'success', text: 'Lien de réinitialisation envoyé.' });
      })
      .catch(err => {
        console.error(err);
        setPasswordMessage({ type: 'error', text: 'Erreur lors de l’envoi du lien.' });
      });
  };


  const handleRequestEmailChange = e => {
    e.preventDefault();
    setEmailMessage({ type: '', text: '' });
    UserService.requestEmailChange({
      userId: connectedUserId,
      newEmail,
      currentPassword
    })
      .then(() => {
        setEmailMessage({ type: 'success', text: 'E-mail de confirmation envoyé.' });
      })
      .catch(err => {
        console.error(err);
        setEmailMessage({ type: 'error', text: 'Erreur lors de la demande d’e-mail.' });
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={openSidebar} />

        <motion.main
          className="flex-1 bg-gradient-to-b from-black to-blue-500 p-6 lg:p-20 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.section
            className="max-w-2xl mx-auto space-y-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-white">Mon profil</h1>

          
            <motion.form
              onSubmit={handleUpdateInfo}
              className="bg-white rounded-lg shadow-lg p-8 space-y-4"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold text-gray-800">Informations</h2>
              <div>
                <label className="block text-gray-700 mb-1">Nom d’utilisateur</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
           
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Enregistrer
              </button>
              {infoMessage.text && (
                <p
                  className={`text-sm mt-2 ${
                    infoMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {infoMessage.text}
                </p>
              )}
            </motion.form>

            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Mot de passe</h2>
              <button
                onClick={handleSendResetLink}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Envoyer lien de réinitialisation
              </button>
              {passwordMessage.text && (
                <p
                  className={`text-sm mt-2 ${
                    passwordMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {passwordMessage.text}
                </p>
              )}
            </motion.div>

    
            <motion.form
              onSubmit={handleRequestEmailChange}
              className="bg-white rounded-lg shadow-lg p-8 space-y-4"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold text-gray-800">Changer d’e-mail</h2>
              <div>
                <label className="block text-gray-700 mb-1">Nouvel e-mail</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Mot de passe actuel</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Demander confirmation
              </button>
              {emailMessage.text && (
                <p
                  className={`text-sm mt-2 ${
                    emailMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {emailMessage.text}
                </p>
              )}
            </motion.form>
          </motion.section>
        </motion.main>
      </div>
    </div>
  );
}

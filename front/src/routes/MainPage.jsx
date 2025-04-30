import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { UserService } from '../service/user.service';

export default function MainPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const [username, setUsername] = useState('');

  const cards = [
    {
      title: 'Ajouter une garantie',
      desc: 'Enregistre un nouvel appareil et sa date de garantie.',
      link: '/add-warranty',
      label: 'Ajouter',
    },
    {
      title: 'Mes garanties',
      desc: 'Consulte et gère toutes tes garanties en cours.',
      link: '/warranty',
      label: 'Voir',
    },
    {
      title: 'Mon profil',
      desc: 'Modifie tes informations et ton abonnement.',
      link: '/profile',
      label: 'Profil',
    },
  ];

  useEffect(() => {
    const userid = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    console.log(token, "token");
    console.log(userid, "userid");
   
    
    if (!userid || userid === 'undefined') {
      console.log("pas de token");
      console.log("pas de userid");
      
      window.location.href = '/login';
    }

  

    UserService.getUserById(userid)
      .then((response) => {
        setUsername(response.data.username);
        console.log(response.data.username);
      })
      
      
      .catch((error) => console.error(error));
  }, []);



  return (
    <div className="flex h-screen overflow-hidden rounded-tl-md">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500 overflow-auto">
      <Header onMenuClick={openSidebar} />
       

        <motion.main
          className="flex-1 px-6 lg:px-20 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero */}
          <motion.section
            className="mb-12"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Bonjour, { username} !
            </h1>
            <p className="text-white">
              Voici votre tableau de bord Waranty Tracker.
            </p>
          </motion.section>

        
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
                <a
                  href={card.link}
                  className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                  {card.label}
                </a>
              </motion.div>
            ))}
          </section>
        </motion.main>

       
      </div>
    </div>
  );
}

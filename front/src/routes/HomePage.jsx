import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  const cards = [
    {
      title: 'Suivi simplifié',
      desc: 'Tous vos gadgets et appareils au même endroit, sans effort.',
    },
    {
      title: 'Alertes automatiques',
      desc: 'Ne ratez jamais une date limite de garantie grâce aux notifications.',
    },
    {
      title: 'Prix imbattable',
      desc: '3 suivis gratuits, puis un suivi illimité pour moins d’un euro.',
    },
  ];

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-b from-black to-blue-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header />

      {/* Hero */}
      <main className="flex-1 flex flex-col lg:flex-row justify-between items-center px-6 lg:px-20 py-16">
        <motion.div
          className="flex-1 flex flex-col mb-8 lg:mb-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Bienvenue sur Waranty Tracker
          </h1>
          <p className="text-lg text-white mb-8 max-w-md">
            Gérez facilement vos garanties : 3 suivis gratuits, puis un suivi illimité à seulement 0.99€ !
          </p>
          <motion.a
            href="/register"
            className="inline-block px-8 py-3 rounded-md text-sm font-medium text-white bg-blue-900"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Démarrer
          </motion.a>
        </motion.div>

        <motion.div
          className="flex-1 border border-gray-300 rounded-lg h-64 w-full lg:ml-8 flex items-center justify-center bg-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gray-500">Image Placeholder</span>
        </motion.div>
      </main>

      {/* Pourquoi nous */}
      <section className="px-6 lg:px-20 py-16 bg-white rounded-t-3xl">
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Pourquoi choisir Waranty Tracker ?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map(({ title, desc }, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}

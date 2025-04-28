import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

const HomePage: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-white font-sans">
    <Header />
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <motion.div
            className="flex-1 mb-10 lg:mb-0"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Bienvenue sur Waranty Tracker
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-md">
              Suivez vos garanties gratuitement. 3 suivis offerts, et pour 0.99€ illimité.
            </p>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md text-lg font-medium"
            >
              Démarrer
            </motion.a>
          </motion.div>

          <motion.div
            className="flex-1 w-full h-64 border-2 border-gray-300 rounded-lg flex items-center justify-center"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
          >
            <span className="text-gray-400">Image Placeholder</span>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className="text-3xl font-semibold text-gray-800 mb-8 text-center"
          >
            Pourquoi choisir notre service ?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'Suivi automatisé',
              'Interface simple',
              'Prix imbattable',
            ].map((title, idx) => (
              <motion.div
                key={title}
                initial="hidden"
                animate="visible"
                custom={idx + 2}
                variants={fadeInUp}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="h-40 border-2 border-gray-300 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default HomePage;
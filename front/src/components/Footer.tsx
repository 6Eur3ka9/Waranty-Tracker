import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => (
  <motion.footer
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-100 text-gray-700 py-6"
  >
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center space-x-6">
      <Link to="/contact-us" className="hover:underline">
        Nous contacter
      </Link>
      <Link to="/legalmentions" className="hover:underline">
        Mentions légales
      </Link>
      <Link to="/aboutus" className="hover:underline">
        Qui sommes-nous
      </Link>
    </div>
  </motion.footer>
);

export default Footer;
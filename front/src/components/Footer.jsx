import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="flex justify-center space-x-6">
        <Link to="/contact-us" className="hover:underline">
          Nous contacter
        </Link>
        <Link to="/legalmentions" className="hover:underline">
          Mentions légales
        </Link>
        <Link to="/aboutus" className="hover:underline">
          Qui sommes nous
        </Link>
      </div>
    </footer>
  );
}

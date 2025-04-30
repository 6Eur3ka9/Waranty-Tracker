// src/pages/MentionsLegalesPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MentionsLegalesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-blue-500">
        {/* Header only on mobile/tablet */}
        <div className="lg:hidden">
          <Header onMenuClick={openSidebar} />
        </div>

        <motion.main
          className="flex-1 overflow-auto p-6 lg:p-20 text-gray-100 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">Mentions Légales</h1>

          {/* Éditeur du site */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Éditeur du site</h2>
            <p className="mb-2">
              Le site <strong>Waranty Tracker</strong> est édité par :
            </p>
            <ul className="list-disc list-inside">
              <li><strong>Raison sociale :</strong> Waranty Tracker SARL</li>
              <li><strong>Siège social :</strong> 45 avenue des Technologies, 75015 Paris, France</li>
              <li><strong>Capital social :</strong> 10 000 €</li>
              <li><strong>RCS Paris :</strong> 123 456 789</li>
              <li><strong>Numéro de TVA intracommunautaire :</strong> FR12 345678901</li>
              <li><strong>Directeur de publication :</strong> Mme Isabelle Martin</li>
              <li><strong>Contact éditeur :</strong> legal@waranty-tracker.com</li>
            </ul>
          </section>

          {/* Hébergement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Hébergement</h2>
            <p className="mb-2">
              Le présent site est hébergé par :
            </p>
            <ul className="list-disc list-inside">
              <li><strong>Hébergeur :</strong> OVH SAS</li>
              <li><strong>Adresse :</strong> 2 Rue Kellermann, 59100 Roubaix, France</li>
              <li><strong>Téléphone :</strong> +33 (0)9 72 10 10 07</li>
              <li><strong>Site web :</strong> https://www.ovh.com</li>
            </ul>
          </section>

          {/* Propriété intellectuelle */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Propriété Intellectuelle</h2>
            <p>
              Tous les éléments (textes, photographies, logos, icônes,  
              vidéos, animations, sons, bases de données, etc.) présents  
              sur le site sont protégés par le Code de la propriété  
              intellectuelle et appartiennent à Waranty Tracker ou à  
              leurs auteurs respectifs. Toute reproduction, représentation,  
              modification ou adaptation totale ou partielle de ces éléments  
              sans autorisation écrite préalable est interdite.
            </p>
          </section>

          {/* Données personnelles */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Données Personnelles</h2>
            <p className="mb-2">
              Les données collectées via les formulaires (inscription,  
              contact, etc.) sont nécessaires au traitement de vos demandes.  
              Conformément à la loi « Informatique et Libertés » du 6 janvier 1978  
              modifiée et au RGPD, vous disposez d’un droit d’accès, de  
              rectification, de suppression et de portabilité des données  
              vous concernant, ainsi que d’un droit d’opposition ou de  
              limitation du traitement. Vous pouvez exercer ces droits :
            </p>
            <ul className="list-disc list-inside">
              <li>Par email : privacy@waranty-tracker.com</li>
              <li>Par courrier : Waranty Tracker SARL – 45 avenue des Technologies, 75015 Paris</li>
            </ul>
            <p className="mt-2">
              Pour en savoir plus, consultez notre <a href="/privacy-policy" className="text-blue-300 hover:underline">Politique de Confidentialité</a>.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies</h2>
            <p className="mb-2">
              Ce site utilise des cookies et traceurs pour améliorer votre  
              expérience et réaliser des statistiques de visites. Vous pouvez  
              accepter ou refuser ces cookies via la bannière d’information  
              apparaissant à votre première visite. Vous pouvez également  
              paramétrer ou désactiver les cookies dans les préférences de  
              votre navigateur.
            </p>
            <p>
              Pour en savoir plus, consultez notre <a href="/cookie-policy" className="text-blue-300 hover:underline">Politique de Cookies</a>.
            </p>
          </section>

          {/* Responsabilité et législation */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Responsabilité &amp; Législation</h2>
            <p>
              Waranty Tracker met tout en œuvre pour garantir la fiabilité  
              et la mise à jour des informations publiées, mais ne peut  
              garantir l’exactitude, la complétude ou l’actualité des  
              contenus. L’utilisation du site se fait sous votre propre  
              responsabilité. En cas de litige, les tribunaux de Paris  
              seront seuls compétents, sous réserve d’une attribution  
              de compétence spécifique découlant d’un texte de loi ou  
              d’un règlement.
            </p>
          </section>
        </motion.main>
      </div>
    </div>
  );
}

# Warranty Tracker

**Warranty Tracker** est une application web pour gérer et suivre facilement vos garanties de produits.  
- **3 suivis gratuits**, puis **suivi illimité** à 0,99 € par mois  
- Alertes automatiques avant expiration  
- Upload et téléchargement de vos factures  
- Plans Freemium & Pro

---

## Installation

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/votre-utilisateur/warranty-tracker.git
   cd warranty-tracker

Installer les dépendances

bash
Copier
Modifier
# Serveur
cd back && npm install

# Client
cd ../front && npm install
Configurer vos variables d’environnement

back/.env : MongoDB URI, JWT secrets, Cloudinary, Stripe clés…

front/.env : VITE_API_BASE_URL, VITE_STRIPE_PUBLISHABLE_KEY, etc.

Lancer en développement
Ouvrez deux terminaux :

bash
Copier
Modifier
# Terminal 1 — API
cd back
node index.js   

# Terminal 2 — Frontend
cd front
npm run dev

Frontend → http://localhost:5173

API → http://localhost:4242

Build pour la production
bash
Copier
Modifier
# Frontend seulement
cd front
npm run build
Le dossier front/dist contient votre site optimisé prêt à être déployé (Netlify, Vercel, Surge…).

Utilisation rapide
Créez un compte et connectez-vous

Ajoutez jusqu’à 3 garanties gratuitement

Passez Pro pour un suivi illimité

Téléchargez vos factures et recevez des rappels

Licence : MIT
Contact : warantytracker@gmail.com

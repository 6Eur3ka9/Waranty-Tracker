// back/routes/payment.js
require('dotenv').config();
const express = require('express');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router  = express.Router();
const authenticate = require('../middleware/authenticate');


// POST /api/auth/payment/create-checkout-session
router.post(
  '/payment/create-checkout-session',

  async (req, res) => {
    try {
      // On récupère l’ID du price Stripe (price_…)
      const priceId   = process.env.STRIPE_PRICE_ID;
        const userId    = req.body.userId;


      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
         
        line_items: [{ price: priceId, quantity: 1 }],
        
        subscription_data: {
          metadata: { userId }
        },
        success_url: `${process.env.FRONT_URL}/succes`,
        cancel_url:  `${process.env.FRONT_URL}/cancel`
      });

      res.json({ id: session.id });
    } catch (err) {
      console.error('❌ create-checkout-session error:', err);
      res.status(500).json({ error: 'Impossible de créer la session de paiement.' });
    }
  }
);

module.exports = router;

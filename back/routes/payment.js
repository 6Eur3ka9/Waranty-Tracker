
require('dotenv').config();
const express = require('express');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router  = express.Router();
const authenticate = require('../middleware/authenticate');


router.post(
  '/payment/create-checkout-session',

  async (req, res) => {
    try {
   
      const priceId   = process.env.STRIPE_PRICE_ID;
        const userId    = req.body.userId;
      const email = req.body.email;


      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: email,
         
        line_items: [{ price: priceId, quantity: 1 }],
        
        subscription_data: {
          metadata: { userId }
        },
        success_url: `${process.env.FRONTEND_URL}/succes?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:  `${process.env.FRONTEND_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
        
      });

      res.json({ id: session.id });
    } catch (err) {
      console.error('❌ create-checkout-session error:', err);
      res.status(500).json({ error: 'Impossible de créer la session de paiement.' });
    }
  }
);

module.exports = router;

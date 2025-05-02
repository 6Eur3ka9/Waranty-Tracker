// back/routes/webhook.js
require('dotenv').config();
const express    = require('express');
const Stripe     = require('stripe');
const nodemailer = require('nodemailer');
const router     = express.Router();
const User       = require('../models/User'); // votre modèle Mongoose

const stripe         = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        endpointSecret
      );
    } catch (err) {
      console.error('❌ Webhook signature failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId  = session.subscription_data
        ? session.subscription_data.metadata.userId
        : session.metadata.userId;

      // 1) upgrade user
      await User.findByIdAndUpdate(userId, { plan: 'pro' });

      // 2) récupérer la facture et son PDF
      const invoice = await stripe.invoices.retrieve(
        session.subscription.invoice,
        { expand: ['invoice_pdf'] }
      );
      const pdfUrl = invoice.invoice_pdf;

      // 3) envoyer le mail
      await transporter.sendMail({
        from:    `"Warranty Tracker" <${process.env.SMTP_USER}>`,
        to:      session.customer_email,
        subject: 'Votre abonnement Pro est actif ✅',
        text:    `Bonjour,\n\nVotre abonnement a bien été activé. Vous pouvez récupérer votre facture ici : ${pdfUrl}\n\nMerci !`
      });
      console.log('✉️ Mail de confirmation envoyé à', session.customer_email);
    }

    res.json({ received: true });
  }
);

module.exports = router;

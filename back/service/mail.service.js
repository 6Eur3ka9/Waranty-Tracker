// src/services/mail.service.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,      // ex: 'smtp.gmail.com'
  port: process.env.SMTP_PORT,      // ex: 587
  secure: false,                    // TLS
  auth: {
    user: process.env.SMTP_USER,    // ton e-mail
    pass: process.env.SMTP_PASS,    // mot de passe ou app-password
  },
});

transporter.verify()
  .then(() => console.log('✅ SMTP configuré'))
  .catch(err => console.error('❌ Erreur SMTP', err));

async function sendMail({ to, subject, html, text }) {
  return transporter.sendMail({
    from: `"Waranty Tracker" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail };

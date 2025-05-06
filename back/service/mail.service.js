
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,     
  port: process.env.SMTP_PORT,      
  secure: false,                    
  auth: {
    user: process.env.SMTP_USER,  
    pass: process.env.SMTP_PASS,   
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

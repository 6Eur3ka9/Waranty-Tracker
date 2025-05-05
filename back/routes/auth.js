const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Warantytracker = require('../models/Warantytracker');
const multer = require('multer');
const router = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { sendMail } = require('../service/mail.service');
const authenticate = require('../middleware/authenticate');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pictures',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => {
      return file.originalname.split('.')[0] + Date.now(); 
    },
  },
});

const upload = multer({ storage: storage });

router.post('/register', async (req, res) => {
  const { username, email, password, date } = req.body;
    const created_at = new Date();
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    console.log(req.body);
    const existingUser = await User.findOne({ email }, { username });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      date
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  

    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      token,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
    console.error(error);
  }
});

router.get('/user/:userid', async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await User.findById(userid).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user data' });
    console.error(error);
  }
});

router.put('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log('userid is:', user._id);
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
    console.error(error);
  }
});

router.put('/edit/username', async (req, res) => {
  const { userId, username } = req.body;
  try {
    if (!userId || !username) {
      return res.status(400).json({ error: 'rentrer un nom d\'utilisateur valide' });
    }
  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
    console.error(error);
  }
});

router.put('/edit/password', async (req, res) => {
  const { userId, password } = req.body;
  try {
    if (!userId || !password) {
      return res.status(400).json({ error: 'rentrer un mot de passe valide' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true , runValidators: true, context: 'query' }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
    console.error(error);
  }
});

router.put('/edit/email', async (req, res) => {
  const { userId, email } = req.body;
  try {
    if (!userId || !email) {
      return res.status(400).json({ error: 'Veuillez rentrer un email valide' });
    }
  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email },
      { new: true, runValidators: true, context: 'query' }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Email non valide' });
    console.error(error);
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId || !req.file) {
      return res.status(400).json({ error: 'Invalid input' });
    }
   
    const newImage = new UserImage({
      user: userId,
      url: req.file.path, 
    });
    
    await newImage.save();
    res.status(201).json({ 
      message: 'Image uploaded and added successfully', 
      imageUrl: req.file.path 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});


router.post('/profile/send-reset-password', authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  const token = jwt.sign({ id: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' });
  const link = `${process.env.FRONT_URL}/reset-password?token=${token}`;
  await sendMail({
    to: user.email,
    subject: 'Réinitialisation de votre mot de passe',
    html: `<p>Cliquez pour réinitialiser : <a href="${link}">${link}</a></p>`
  });
  res.json({ message: 'Lien envoyé' });
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'L’e-mail est requis' });
  }

  const user = await User.findOne({ email });
  if (!user) {
   
    return res.json({ resetLink: null });
  }


  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_RESET_SECRET,
    { expiresIn: '1h' }
  );

  const resetLink = `${process.env.FRONT_URL}/reset-password?token=${token}`;


  try {
    await sendMail({
      to: user.email,
      subject: 'Réinitialisez votre mot de passe',
      html: `
        <p>Bonjour ${user.username},</p>
        <p>Cliquez sur ce lien pour réinitialiser votre mot de passe :</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Ce lien expire dans 1 heure.</p>
      `
    });
  } catch (err) {
    console.error('Erreur envoi mail reset-password:', err);
    
  }


  res.json({ resetLink });
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res
      .status(400)
      .json({ error: 'Le token et le nouveau mot de passe sont requis' });
  }

  try {

    const payload = jwt.verify(token, process.env.JWT_RESET_SECRET);


    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(payload.id, { password: hashedPassword });

    return res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    console.error('Reset-password error:', err);
    return res
      .status(400)
      .json({ error: 'Token invalide ou expiré' });
  }
});

router.post('/warranty/add', authenticate, async (req, res) => {
  const { productName, purchaseDate, expiryDate, token } = req.body;
  const userId = req.user.id;

  try {
    if (!productName || !purchaseDate || !expiryDate) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
   
    const newWaranty = new Warantytracker({
      productName, purchaseDate, expiryDate, user: userId
    });
    await newWaranty.save();
    res.status(201).json({ message: 'Produit ajouté avec succès', waranty: newWaranty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
  }
});

router.get('/warranty/:userId', authenticate, async (req, res) => {
  const { userId } = req.params;
  try {
    const warranties = await Warantytracker.find({ user: userId });
    res.status(200).json(warranties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des garanties' });
  }
});

router.put('/warranty/edit/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { productName, purchaseDate, expiryDate } = req.body;
  try {
    const updatedWarranty = await Warantytracker.findByIdAndUpdate(
      id,
      { productName, purchaseDate, expiryDate },
      { new: true }
    );
    if (!updatedWarranty) {
      return res.status(404).json({ error: 'Garantie non trouvée' });
    }
    res.status(200).json({ message: 'Garantie mise à jour avec succès', warranty: updatedWarranty });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la garantie' });
  }
});

router.delete('/warranty/delete/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedWarranty = await Warantytracker.findByIdAndDelete(id);
    if (!deletedWarranty) {
      return res.status(404).json({ error: 'Garantie non trouvée' });
    }
    res.status(200).json({ message: 'Garantie supprimée avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression de la garantie' });
  }
});

router.post('payment/create-subscription', authenticate, async (req, res) => {
  const { userId, subscriptionType } = req.body;
  try {
    if (!userId || !subscriptionType) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
  
    res.status(201).json({ message: 'Abonnement créé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'abonnement' });
  }
});

router.post('/payment/create-payment-intent', authenticate, async (req, res) => {
  try {
    let { amount, currency } = req.body;
    amount = Math.trunc(amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status
    });
  } catch (err) {
    console.error('Stripe Error:', err);
    return res.status(500).json({ error: err.message });
  }
});

router.put(
  '/edit/plan',
  authenticate,
  async (req, res) => {
    const { userId, plan } = req.body;
    console.log('Plan:', plan , 'UserId:', userId);
    
    if (!userId || !plan) {
      return res.status(400).json({ error: 'userId et plan sont requis' });
    }
    try {
      const updated = await User.findByIdAndUpdate(
        userId,
        { plan },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
     return res.json({ message: 'Plan mis à jour', plan: updated.plan,  });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du plan' });
    }
  }
);

module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserImage = require('../models/UserImage');
const multer = require('multer');
const router = express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

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
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' , userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
    console.error(error);
  }
});

router.get('/user/:userid', async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await User.findById(userid).select('-password'); // Exclude password field
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
  const { userId } = req.body; // 'userId' est envoyé dans le formData
  try {
    if (!userId || !req.file) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    // req.file.path contient l'URL secure fournie par Cloudinary grâce à CloudinaryStorage.
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

// l'url : "http://localhost:4242/api/auth/test" avec la requête GET fonctionne dans Postman, le serveur tourne bien
// router.get('/test', (req, res) => {
//   res.send('API is working!');
// });

router.put('/picture/delete', async (req, res) => {
  // console.log('le req', req);
  const { picture, user } = req.body;
  console.log(user)
  console.log(picture, 'image loggée')

  try {
    
    if(!picture || !user) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const userExist = await User.findById(user);
    if(!userExist) {
      return res.status(400).json({ error: 'This user doesn\'t exist' });
    }
    
    //ça marchait pas en faisant 'await UserImage.findById({ picture })' car là je lui renvoyais un Objet
    const pictureExist = await UserImage.findById(picture);

    if(!pictureExist) {
      return res.status(400).json({ error: 'This image doesn\'t exist' });
    }

    const deletePicture = await UserImage.deleteOne({ _id: picture });

    if (deletePicture.deletedCount == 1) {
      return res.status(200).json({ message : 'Image deleted successfully' });
    } else {
      return res.status(400).json({ error: 'Image not found' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during the image deletion." });
  }
});

router.get('/pictures/:userid', async (req, res) => {
  const { userid } = req.params;
  
  if (!userid) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  try {
    // Recherche toutes les images correspondant à l'utilisateur
    const images = await UserImage.find({ user: userid });
    
    // Si aucune image n'est trouvée, on retourne une réponse adéquate
    if (!images || images.length === 0) {
      return res.status(404).json({ error: 'Aucune image trouvée pour cet utilisateur' });
    }

    res.status(200).json({ images });
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des images' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'L’e‑mail est requis' });
  }

  // 1) Vérifier que l’utilisateur existe
  const user = await User.findOne({ email });
  if (!user) {
    // On ne révèle pas l’absence d’adresse en base
    return res.json({ resetLink: null });
  }

  // 2) Générer un token JWT valable 1h
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_RESET_SECRET,
    { expiresIn: '1h' }
  );

  // 3) Construire le lien de réinitialisation
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  return res.json({ resetLink });
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res
      .status(400)
      .json({ error: 'Le token et le nouveau mot de passe sont requis' });
  }

  try {
    // 1) Vérifier et décoder le token
    const payload = jwt.verify(token, process.env.JWT_RESET_SECRET);

    // 2) Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3) Mettre à jour l’utilisateur
    await User.findByIdAndUpdate(payload.id, { password: hashedPassword });

    return res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    console.error('Reset-password error:', err);
    return res
      .status(400)
      .json({ error: 'Token invalide ou expiré' });
  }
});

module.exports = router;

require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const authRoutes    = require('./routes/auth');
const paymentRoutes = require('./routes/payment');


const app = express();


app.use(express.json());
app.use(cors());


app.use('/api/auth',    authRoutes);
app.use('/api/auth',    paymentRoutes); 

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 4242, () =>
      console.log(`Server listening on ${process.env.PORT || 4242}`)
    );
  })
  .catch(err => console.error(err));

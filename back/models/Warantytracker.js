const mongoose = require('mongoose');
const { Schema } = mongoose;

const WarrantyProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  notified: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WarrantyProduct', WarrantyProductSchema);

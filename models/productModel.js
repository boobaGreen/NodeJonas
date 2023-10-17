const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, // eliminate the white space at the start and at the end of the string
    required: [true, 'A product must have a name'],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

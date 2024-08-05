const mongoose = require('mongoose');

// Define the Meeting Schema
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name:{
    type:String,
  },
  price: {
    type: String,
    required: true,
  },

});

// Create the Meeting model
const product = mongoose.model('product', productSchema);

module.exports = product;

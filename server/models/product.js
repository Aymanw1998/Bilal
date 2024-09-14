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
  from:{
    type: String,
    required: true,
  }
});

// Create the Meeting model
const productzn = mongoose.model('productzn', productSchema);
const productbh = mongoose.model('productbh', productSchema);
module.exports = {productzn, productbh};

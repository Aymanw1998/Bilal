const mongoose = require('mongoose');

// Define the Meeting Schema
const bidSchema = new mongoose.Schema({
  idBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bid'
    },
  idProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },
  amount: {
    type: String,
    required: true,
  },
  TotalPrice:{
    type:String,
    required: true,
  }

});

// Create the bid model
const bidDetails = mongoose.model('bidDetails', bidSchema);

module.exports = bidDetails;

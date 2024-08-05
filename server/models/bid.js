const mongoose = require('mongoose');

// Define the Meeting Schema
const bidSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  finishPrice: {
    type: Number,
  },
  totalPrice:{
    type:Number,
  },
  vat:{
    type:Number,
  },
  discount:{
    dis: {type:Number},
    price: {type:Number}
  },
  date: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
  },
  customer:{
    id: {type:String},
    name:{type:String},
  }

});

// Create the bid model
const bid = mongoose.model('bid', bidSchema);

module.exports = bid;

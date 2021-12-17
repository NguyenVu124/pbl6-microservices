const mongoose = require('mongoose');

// const types = ['Single', 'Double', 'Family'];

const Room = new mongoose.Schema({
  idHotel: { type: mongoose.Types.ObjectId, ref: 'Hotel' },
  city: { type: String },
  price: { type: Number },
  type: { type: String },
  images: [{ type: String }],
  available: [{ type: Date }],
});

module.exports = mongoose.model('Room', Room);

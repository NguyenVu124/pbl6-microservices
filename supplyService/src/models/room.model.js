const mongoose = require('mongoose');

const types = ['Single', 'Double', 'Family'];

const Room = new mongoose.Schema({
  hotel: { type: mongoose.Types.ObjectId, ref: 'Hotel' },
  price: { type: Number },
  type: { type: String, enum: types },
  images: [{ type: String }],
  available: [{ type: Date }],
});

module.exports = mongoose.model('Room', Room);

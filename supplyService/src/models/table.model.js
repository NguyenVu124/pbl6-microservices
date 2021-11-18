const mongoose = require('mongoose');

const Table = new mongoose.Schema({
  restaurants: { type: mongoose.Types.ObjectId, ref: 'Restaurant' },
  price: { type: Number },
  totalSeats: { type: Number },
  type: { type: String },
  images: [{ type: String }],
});

module.exports = mongoose.model('Table', Table);

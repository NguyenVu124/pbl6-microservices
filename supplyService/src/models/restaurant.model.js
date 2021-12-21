const mongoose = require('mongoose');

const Restaurant = new mongoose.Schema({
  city: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: { type: String, required: true },
  description: { type: String },
  name: { type: String },
  open: { type: String },
  close: { type: String },
  type: { type: String },
  totalTables: { type: Number, required: true },
  availableTables: { type: Number, required: true },
  feedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeedBack',
    },
  ],
  priceFrom: {
    type: Number,
    required: true,
  },
  fee: { type: Number, required: true },
  priceTo: {
    type: Number,
    required: true,
  },
  vote: {
    type: Number,
  },
  tables: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
    },
  ],
  images: [{ type: String }],
  imageCover: { type: String, required: true },
});

module.exports = mongoose.model('Restaurant', Restaurant);

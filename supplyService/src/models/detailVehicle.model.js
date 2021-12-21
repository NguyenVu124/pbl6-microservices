const mongoose = require('mongoose');

const types = ['Xe máy', 'Ô tô 7 chỗ', 'Ô tô 4 chỗ', 'Xe đạp'];

const DetailVehicle = new mongoose.Schema({
  idSelfVehicle: { type: mongoose.Types.ObjectId, ref: 'SelfVehicle' },
  city: { type: String },
  type: { type: String, enum: types, required: true, default: 'Xe máy' },
  price: { type: Number },
  images: [{ type: String }],
  imageCover: { type: String, required: true },
});

module.exports = mongoose.model('DetailVehicle', DetailVehicle);

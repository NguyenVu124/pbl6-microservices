const mongoose = require('mongoose');

const types = ['Xe máy', 'Ô tô 7 chỗ', 'Ô tô 4 chỗ', 'Xe đạp'];

const SelfVehicle = new mongoose.Schema({
  type: { type: String, enum: types, required: true, default: 'Xe máy' },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  feedBacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeedBack',
    },
  ],
  address: { type: String, required: true },
  vote: { type: Number },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DetailVehicle' }],
  images: [{ type: String }],
  imageCover: { type: String, required: true },
});

module.exports = mongoose.model('SelfVehicle', SelfVehicle);

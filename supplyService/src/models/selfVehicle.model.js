const mongoose = require('mongoose');

// const types = ['Xe máy', 'Ô tô', 'Xe đạp'];

const SelfVehicle = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: { type: String, trim: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  feedBacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeedBack',
    },
  ],
  city: { type: String, trim: true },
  address: { type: String, required: true },
  vote: { type: Number },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DetailVehicle' }],
  images: [{ type: String }],
  imageCover: { type: String, required: true },
});

module.exports = mongoose.model('SelfVehicle', SelfVehicle);

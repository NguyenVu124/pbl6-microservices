const mongoose = require('mongoose');

const Bill = new mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
    },
    additionalFee: { type: Number },
    total: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: { type: Boolean },
    room: {
      type: mongoose.Types.ObjectId,
      ref: 'Room',
    },
    guest: { type: mongoose.Types.ObjectId, ref: 'User' },
    table: { type: mongoose.Types.ObjectId, ref: 'Table' },
    detailVehicle: { type: mongoose.Types.ObjectId, ref: 'DetailVehicle' },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Bill', Bill);

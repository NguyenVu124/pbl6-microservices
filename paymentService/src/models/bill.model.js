const mongoose = require('mongoose');

const Bill = new mongoose.Schema(
  {
    service: {
      type: String,
    },
    additionalFee: { type: Number },
    total: { type: Number },
    checkIn: { type: Date },
    checkOut: { type: Date },
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

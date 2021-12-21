const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const billSchema = new mongoose.Schema(
  {
    service: { type: String },
    name: { type: String },
    hotel: {
      type: mongoose.Types.ObjectId,
      ref: 'Hotel',
    },
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
    },
    selfVehicle: {
      type: mongoose.Types.ObjectId,
      ref: 'SelfVehicle',
    },
    additionalFee: { type: Number },
    total: { type: Number },
    checkIn: { type: Date },
    checkOut: { type: Date },
    status: { type: Boolean },
    guest: { type: mongoose.Types.ObjectId, ref: 'User' },
    room: {
      type: mongoose.Types.ObjectId,
      ref: 'Room',
    },
    chairs: { type: Number, default: 2 },
    detailVehicle: { type: mongoose.Types.ObjectId, ref: 'DetailVehicle' },
  },
  {
    timestamps: true,
  }
);
billSchema.plugin(toJSON);
const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;

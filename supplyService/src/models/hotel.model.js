const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const hotelSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    city: { type: String, trim: true },
    description: { type: String },
    address: {
      type: String,
      trim: true,
    },
    phone: { type: String, trim: true },
    totalRooms: { type: Number },
    availableRooms: { type: Number },
    vote: { type: Number, default: 2 },
    imageCover: { type: String },
    images: [{ type: String }],
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
      },
    ],
    priceFrom: {
      type: Number,
      required: true,
    },
    priceTo: {
      type: Number,
      required: true,
    },
    feedbacks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedBack',
      },
    ],
  },
  { timestamps: true }
);

hotelSchema.plugin(toJSON);

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

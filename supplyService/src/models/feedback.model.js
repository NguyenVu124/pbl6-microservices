const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const feedbackSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
    },
    vote: { type: Number, required: true },
    comment: {
      type: String,
    },
    idUser: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    idRestaurant: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
    },
    idSelfVehicle: { type: mongoose.Types.ObjectId, ref: 'SelfVehicle' },
    idHotel: { type: mongoose.Types.ObjectId, ref: 'Hotel' },
  },
  {
    timestamps: true,
  }
);

feedbackSchema.plugin(toJSON);
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;

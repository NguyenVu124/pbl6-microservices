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
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurant',
    },
    selfVehicle: { type: mongoose.Types.ObjectId, ref: 'SelfVehicle' },
    hotel: { type: mongoose.Types.ObjectId, ref: 'Hotel' },
  },
  {
    timestamps: true,
  }
);

feedbackSchema.plugin(toJSON);
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;

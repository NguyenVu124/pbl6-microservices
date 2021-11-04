const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON } = require('./plugins');
const { roles, gender, types } = require('../config/defaultValue');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'guest',
    },
    birth: {
      type: Date,
    },
    phone: {
      type: String,
    },
    typeBusiness: { type: String, enum: types },
    idHotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    idSelfVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'SelfVehicle' },
    idRestaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    businessIdentifier: {
      type: String,
    },
    isValid: {
      type: Boolean,
    },
    gender: { type: String, enum: gender },
    identityNumber: {
      type: String,
    },
    feedbacks: [{ type: mongoose.Types.ObjectId, ref: 'Feedback' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
// userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

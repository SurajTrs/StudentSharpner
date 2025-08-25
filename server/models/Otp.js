const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneOrEmail: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Otp', otpSchema);

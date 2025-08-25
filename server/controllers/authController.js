// controllers/authController.js
const twilio = require('twilio');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ Send OTP
exports.requestOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
      .verifications
      .create({ to: phone, channel: 'sms' });

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP Request Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

// ✅ Verify OTP
exports.verifyOtp = async (req, res) => {
  const { phone, code } = req.body;

  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks
      .create({ to: phone, code });

    if (verificationCheck.status === 'approved') {
      // Check if user already exists
      let user = await User.findOne({ phone });

      if (!user) {
        user = new User({ phone, otpVerified: true });
        await user.save();
      } else {
        user.otpVerified = true;
        await user.save();
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.status(200).json({ success: true, message: 'OTP verified', token });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('OTP Verification Error:', error.message);
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
};

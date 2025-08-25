const express = require('express');
const twilio = require('twilio');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

dotenv.config();

const router = express.Router();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ✅ 1. Request OTP
router.post('/request-otp', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  try {
    await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
      .verifications
      .create({ to: phone, channel: 'sms' });

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP Request Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// ✅ 2. Verify OTP + Create/Update User + Send JWT
router.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ success: false, message: 'Phone and OTP code are required' });
  }

  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks
      .create({ to: phone, code });

    if (verificationCheck.status === 'approved') {
      let user = await User.findOne({ phone });

      let isNewUser = false;

      if (!user) {
        user = new User({ phone, otpVerified: true });
        isNewUser = true;
      } else {
        user.otpVerified = true;
      }

      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.status(200).json({ 
        success: true, 
        message: 'OTP verified', 
        token,
        newUser: isNewUser,
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('OTP Verification Error:', error.message);
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
});

// ✅ 3. Resend OTP
router.post('/resend-otp', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  try {
    await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
      .verifications
      .create({ to: phone, channel: 'sms' });

    res.status(200).json({ success: true, message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Resend OTP Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to resend OTP' });
  }
});

// ✅ 4. Check if User Already Exists
router.post('/check-user', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  try {
    const user = await User.findOne({ phone });
    if (user) {
      res.status(200).json({ success: true, exists: true });
    } else {
      res.status(200).json({ success: true, exists: false });
    }
  } catch (error) {
    console.error('Check User Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;

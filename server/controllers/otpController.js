const otpStore = {}; // Temporary memory store (later Redis recommended)

const sendOtp = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Save OTP against phone
  otpStore[phone] = otp;

  // Twilio se send karo
  await twilioClient.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone
  });

  res.json({ message: 'OTP sent successfully!' });
};

const verifyOtp = (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] && otpStore[phone] == otp) {
    delete otpStore[phone]; // Success hone ke baad OTP hata do
    res.json({ message: 'OTP verified successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid OTP!' });
  }
};

module.exports = { sendOtp, verifyOtp };

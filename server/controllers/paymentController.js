const crypto = require("crypto");
const admin = require('firebase-admin');

function isFreeMode() {
  return (
    process.env.FREE_PAYMENTS === 'true' ||
    !process.env.RAZORPAY_KEY_ID ||
    !process.env.RAZORPAY_KEY_SECRET
  );
}

function normalizeAmountToPaise(amount) {
  if (typeof amount === 'number') return Math.round(amount * 100);
  const n = parseInt(String(amount || '').replace(/[^0-9]/g, ''), 10);
  // If input looked like 2999 (rupees), assume paise = 299900
  // If it already looked like 299900, caller should pass correct format.
  return Number.isFinite(n) ? n * 100 : 0;
}

exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const paise = normalizeAmountToPaise(amount);

    if (isFreeMode()) {
      const order = {
        id: 'free_' + Date.now(),
        amount: paise,
        currency: 'INR',
        status: 'created',
        notes: { free: true },
      };
      return res.status(200).json({ order, free: true });
    }

    // Lazy-load Razorpay instance only in paid mode
    const RazorpayInstance = require("../config/razorpay");
    const options = {
      amount: paise,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await RazorpayInstance.orders.create(options);
    res.status(200).json({ order, free: false });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userEmail, courseId } = req.body || {};

  try {
    let verified = false;

    if (isFreeMode()) {
      verified = true;
    } else {
      const body = (razorpay_order_id || '') + '|' + (razorpay_payment_id || '');
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');
      verified = expectedSignature === razorpay_signature;
    }

    if (!verified) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // If client supplied purchase info, persist it now (idempotent)
    if (userEmail && courseId) {
      const email = String(userEmail).trim().toLowerCase();
      const cId = String(courseId).trim();
      if (email && cId) {
        const firestore = admin.firestore();
        const docId = `${email}__${cId}`;
        const ref = firestore.collection('purchases').doc(docId);
        const snap = await ref.get();
        if (!snap.exists) {
          await ref.set({
            userEmail: email,
            courseId: cId,
            purchasedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('verifyPayment error:', err);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
};

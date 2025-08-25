const express = require('express');
const jwt = require('jsonwebtoken');  // Import JWT
const admin = require('firebase-admin');
const router = express.Router();

// @route   POST /api/user-details/submit
router.post('/submit', async (req, res) => {
  try {
    const db = admin.apps.length ? admin.firestore() : null;
    if (!db) return res.status(503).json({ message: 'Service unavailable: database not initialized' });

    const { name, email, address, school, studentClass } = req.body;

    // Basic validation
    if (!name || !email || !address || !school || !studentClass) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email' });
    }

    const col = db.collection('userDetails');
    const existingSnap = await col.where('email', '==', email).limit(1).get();

    if (existingSnap.empty) {
      // Create new
      const ref = await col.add({
        name,
        email,
        address,
        school,
        studentClass,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      const token = jwt.sign({ userId: ref.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(201).json({ message: 'User details saved successfully', token });
    } else {
      // Update existing
      const doc = existingSnap.docs[0];
      await doc.ref.update({
        name,
        address,
        school,
        studentClass,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      const token = jwt.sign({ userId: doc.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'User details updated successfully', token });
    }
  } catch (error) {
    console.error('❌ Error saving user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

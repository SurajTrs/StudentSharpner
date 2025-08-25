const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userDetailsRoutes = require('./routes/userDetailsRoutes');
const courseRoutes = require('./routes/courseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

function initFirebase() {
  try {
    if (admin.apps.length) return; // already initialized
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(svc),
      });
    } else {
      // Will use GOOGLE_APPLICATION_CREDENTIALS if set
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
    console.log('✅ Firebase Admin initialized');
  } catch (e) {
    console.error('❌ Failed to initialize Firebase Admin. Provide credentials via GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT in server/.env', e.message);
  }
}

module.exports = function createApp() {
  // Initialize external services on cold start (serverless-safe)
  connectDB();
  initFirebase();
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/user-details', userDetailsRoutes);
  app.use('/api/courses', courseRoutes);
  app.use('/api/payments', paymentRoutes);

  app.get('/', (req, res) => {
    res.send('Backend server is running ✅');
  });

  // Healthcheck
  app.get('/health', async (req, res) => {
    try {
      const db = admin.apps.length ? admin.firestore() : null;
      if (!db) return res.status(503).json({ status: 'down', db: 'not_initialized' });
      await db.listCollections();
      res.json({ status: 'ok', db: 'connected' });
    } catch (e) {
      res.status(503).json({ status: 'down', db: 'error', error: e?.message });
    }
  });

  return app;
};

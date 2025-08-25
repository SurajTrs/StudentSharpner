// Firebase initialization
// Add your Firebase web app keys in a .env file at client/.env with REACT_APP prefix
// Example keys needed:
// REACT_APP_FIREBASE_API_KEY=...
// REACT_APP_FIREBASE_AUTH_DOMAIN=...
// REACT_APP_FIREBASE_PROJECT_ID=...
// REACT_APP_FIREBASE_STORAGE_BUCKET=...
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
// REACT_APP_FIREBASE_APP_ID=...

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyB6W7D1weFNYMbubXO0YvqLsCJQQDD0RVs",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "student-sharpner.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "student-sharpner",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "student-sharpner.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "615144573321",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:615144573321:web:9b918a4af2b0c20aa27958",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-BZLWWMXVX0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

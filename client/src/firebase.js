// Firebase initialization
// Add your Firebase web app keys in a .env file at client/.env with REACT_APP_ prefix
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
  apiKey: "AIzaSyB6W7D1weFNYMbubXO0YvqLsCJQQDD0RVs",
  authDomain: "student-sharpner.firebaseapp.com",
  projectId: "student-sharpner",
  storageBucket: "student-sharpner.appspot.com",
  messagingSenderId: "615144573321",
  appId: "1:615144573321:web:9b918a4af2b0c20aa27958",
  measurementId: "G-BZLWWMXVX0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

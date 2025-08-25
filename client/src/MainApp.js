// MainApp.js
import React from 'react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const MainApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default MainApp;

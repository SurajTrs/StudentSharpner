import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ADMIN_EMAILS } from '../config/admin';

// Admin allowlist is centralized in config/admin.js

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const email = user?.email?.toLowerCase();

  // Wait for auth to hydrate to avoid false redirects
  if (loading) {
    return (
      <div style={{ padding: '8rem 5rem' }}>
        <p>Checking admin access...</p>
      </div>
    );
  }

  if (!email || !ADMIN_EMAILS.includes(email)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

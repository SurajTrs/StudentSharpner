// src/components/DetailsRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DetailsPage from '../pages/Details';

const DetailsRoute = () => {
  const { user, isNewUser, isLoadingUser } = useAuth();

  if (isLoadingUser) return null; // or spinner

  if (!user) return <Navigate to="/login" replace />;

  if (!isNewUser) return <Navigate to="/dashboard" replace />;

  return <DetailsPage />;
};

export default DetailsRoute;

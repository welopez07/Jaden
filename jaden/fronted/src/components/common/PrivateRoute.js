import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  if (!token) {
    return <Navigate to="/login" replace/>;
  }

  if (role && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
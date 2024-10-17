import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('adminToken'); // Verifica si el token está guardado
  return isAdminAuthenticated ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import PrivateRoute from './components/common/PrivateRoute';

// Importaciones de páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Registrarse from './pages/Registrarse';
import Contacto from './pages/Contacto';

// Dashboards
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

// Componentes de gestión de admin
import AdminUserManagement from './components/admin/AdminUserManagement';
import AdminProductManagement from './components/admin/AdminProductManagement';
import AdminOrderManagement from './components/admin/AdminOrderManagement';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* Rutas protegidas de admin */}
        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/users"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminUserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/products"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminProductManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin/orders"
          element={
            <PrivateRoute role="ROLE_ADMIN">
              <AdminOrderManagement />
            </PrivateRoute>
          }
        />
        {/* Otras rutas protegidas */}
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
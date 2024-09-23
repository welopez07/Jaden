import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Registrarse from './pages/Registrarse';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Productos from './pages/Productos';
import Pedidos from './pages/Pedidos';
import Contacto from './pages/Contacto';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registrarse" element={<Registrarse />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Pedidos" element={<Pedidos />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Registrarse from './pages/Registrarse';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminPanel from './pages/AdminPanel';
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
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
        <Route path="/dashboard/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Estilos para el header

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/images/logoJaden.jpg" alt="Logo empresa jaden" className="logo-img" />
            </div>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/Productos">Productos</Link></li>
                    <li><Link to="/Pedidos">Pedidos</Link></li>
                    <li><Link to="/Contacto">Contacto</Link></li>
                    <li><Link to="/Registrarse">Registrarse</Link></li>
                    <li><Link to="/Login">Iniciar Sesión</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
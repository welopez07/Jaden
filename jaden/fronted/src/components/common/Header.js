import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../pages/styles/Header.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path) => {
        setIsMenuOpen(false); // Cerrar menú al seleccionar una opción
        navigate(path); // Redirigir a la ruta correspondiente
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo a la izquierda */}
                <div className="logo">
                    <img
                        src="/images/logoJaden.jpg"
                        alt="Logo"
                        className="logo-img"
                        onClick={() => handleNavigation('/')}
                    />
                </div>

                {/* Menú hamburguesa a la derecha */}
                <div className="menu-toggle" onClick={toggleMenu}>
                    <span className={isMenuOpen ? 'rotate-45' : ''}></span>
                    <span className={isMenuOpen ? 'opacity-0' : ''}></span>
                    <span className={isMenuOpen ? '-rotate-45' : ''}></span>
                </div>

                {/* Menú visible en pantallas grandes */}
                <nav className="navbar">
                    <ul className="nav-links">
                        <li onClick={() => handleNavigation('/')}>Inicio</li>
                        <li onClick={() => handleNavigation('/productos')}>Productos</li>
                        <li onClick={() => handleNavigation('/pedidos')}>Pedidos</li>
                        <li onClick={() => handleNavigation('/contacto')}>Contacto</li>
                        <li onClick={() => handleNavigation('/registrarse')}>Registrarse</li>
                        <li onClick={() => handleNavigation('/login')}>Iniciar Sesión</li>
                    </ul>
                </nav>

                {/* Menú desplegable */}
                {isMenuOpen && (
                    <div className="mobile-menu">
                        <nav className="mobile-navbar">
                            <ul className="mobile-nav-links">
                                <li onClick={() => handleNavigation('/')}>Inicio</li>
                                <li onClick={() => handleNavigation('/productos')}>Productos</li>
                                <li onClick={() => handleNavigation('/pedidos')}>Pedidos</li>
                                <li onClick={() => handleNavigation('/contacto')}>Contacto</li>
                                <li onClick={() => handleNavigation('/registrarse')}>Registrarse</li>
                                <li onClick={() => handleNavigation('/login')}>Iniciar Sesión</li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

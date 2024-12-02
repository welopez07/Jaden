import React, { useState, useEffect } from 'react';
import './styles/Home.css';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Arreglo de imágenes para el slider
  const sliderImages = [
    "/images/canastaFrutas.jpg",
    "/images/corazonFrutas.jpg",
    "/images/corazonAmarilloFlorez.jpg"
  ];

  // Cambiar la imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cada 3 segundos
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div>
      <header className="hero-banner">
        <div className="slider">
          {/* Renderizar solo la imagen correspondiente al índice actual */}
          <img src={sliderImages[currentImageIndex]} alt="Flores frescas" />
        </div>
      </header>

      <main className="main-content">
        <section className="about-us">
          <h2>Bienvenido a la tienda de flores</h2>
          <p>Ofrecemos los mejores arreglos florales para cada ocasión. Explora nuestros productos o regístrate para gestionar tu cuenta.</p>
        </section>

        <section className="featured-products">
          <h2>Productos Destacados</h2>
          <div className="product-grid">
            <div className="product-item">
              <img src="/images/ramoConFresasbn.jpg" alt="Producto 1" />
              <p>Ramo de Rosas</p>
            </div>
            <div className="product-item">
              <img src="/images/corazonFloresRojas.jpg" alt="Producto 2" />
              <p>Corazón de Rosas</p>
            </div>
            <div className="product-item">
              <img src="/images/cajaFresasx6.jpg" alt="Producto 3" />
              <p>Cajas de Fresas</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Tienda de Flores. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
import React, { useState, useEffect } from "react";
import "./styles/Home.css";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderImages = [
    "/images/canastaFrutas.jpg",
    "/images/corazonFrutas.jpg",
    "/images/corazonAmarilloFlorez.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div>
      {/* Slider */}
      <div className="slider">
        <img
          src={sliderImages[currentImageIndex]}
          alt="Flores frescas"
          className="slider-img"
        />
      </div>

      {/* Contenido principal */}
      <main className="main-content">
        <section className="about-us">
          <h2>Bienvenido a Jaden detalles</h2>
          <p>
            Ofrecemos los mejores arreglos florales para cada ocasión. Explora
            nuestros productos o regístrate para gestionar tu cuenta.
          </p>
        </section>

        <section className="featured-products">
          <h2>Productos Destacados</h2>
          <div className="product-grid">
            <div className="card">
              <img src="/images/ramoConFresasbn.jpg" alt="Producto 1" />
              <div className="card-body">
                <p>Ramo de Rosas</p>
              </div>
            </div>
            <div className="card">
              <img src="/images/corazonFloresRojas.jpg" alt="Producto 2" />
              <div className="card-body">
                <p>Corazón de Rosas</p>
              </div>
            </div>
            <div className="card">
              <img src="/images/cajaFresasx6.jpg" alt="Producto 3" />
              <div className="card-body">
                <p>Cajas de Fresas</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Jaden. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;

import React from 'react';
import './styles/Contacto.css';

const Contacto = () => {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contacto</h1>
                <p>Ponte en contacto con nosotros para cualquier duda o consulta</p>
            </div>

            <div className="contact-content">
                <div className="contact-form">
                    <h2>Formulario de Contacto</h2>
                    <form>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" placeholder="Tu nombre.." />

                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" name="email" placeholder="Tu correo.." />

                        <label htmlFor="subject">Asunto</label>
                        <input type="text" id="subject" name="subject" placeholder="Asunto del mensaje.." />

                        <label htmlFor="message">Mensaje</label>
                        <textarea id="message" name="message" placeholder="Escribe tu mensaje aquí..." rows="4"></textarea>

                        <button type="submit">Enviar</button>
                    </form>
                </div>

                <div className="company-info">
                    <h2>Sobre Nosotros</h2>
                    <p>Somos una empresa dedicada a la venta de productos exclusivos.</p>
                    <p>Teléfono: +57 123 456 78 90</p>
                    <p>Correo: contacto@jaden.com</p>
                    <p>Dirección: Calle 4 # 1-23, Armenia, Quindio</p>

                    <h3>Síguenos en redes sociales:</h3>
                    <ul>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://twitter.com">Twitter</a></li>
                        <li><a href="https://instagram.com">Instagram</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
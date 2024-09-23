import React, { useState } from 'react';

const Pedidos = () => {
    const [pedido, setPedido] = useState({
        producto: '',
        cantidad: 1,
        direccion: '',
        contacto: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes implementar la lógica para enviar el pedido por correo o lo que prefieras.
        console.log(pedido);
        alert("Pedido enviado correctamente.");
    };

    const handleChange = (e) => {
        setPedido({
            ...pedido,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="pedido-container">
            <h1>Organiza tu pedido</h1>
            <form onSubmit={handleSubmit}>
                <label>Producto</label>
                <input type="text" name="producto" onChange={handleChange} value={pedido.producto} />

                <label>Cantidad</label>
                <input type="number" name="cantidad" onChange={handleChange} value={pedido.cantidad} />

                <label>Dirección</label>
                <input type="text" name="direccion" onChange={handleChange} value={pedido.direccion} />

                <label>Contacto (Correo o Teléfono)</label>
                <input type="text" name="contacto" onChange={handleChange} value={pedido.contacto} />

                <button type="submit">Enviar Pedido</button>
            </form>
        </div>
    );
};

export default Pedidos;

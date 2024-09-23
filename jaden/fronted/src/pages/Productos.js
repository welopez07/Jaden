import React from 'react';
import { useParams } from 'react-router-dom';

function Product() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalles del Producto</h1>
      <p>ID del Producto: {id}</p>
      {/* Aquí puedes mostrar los detalles del producto utilizando el ID */}
    </div>
  );
}

export default Product;
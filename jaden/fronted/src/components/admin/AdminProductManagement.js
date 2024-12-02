import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';

function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar productos');
      setLoading(false);
      console.error(err);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await productService.createProduct(newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', description: '', price: '', stock: '' });
    } catch (err) {
      console.error('Error al crear producto', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (err) {
      console.error('Error al eliminar producto', err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-product-management">
      <h2>Gestión de Productos</h2>

      {/* Formulario de Creación de Producto */}
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
          required
        />
        <button type="submit">Crear Producto</button>
      </form>

      {/* Lista de Productos */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button>Editar</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductManagement;
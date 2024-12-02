import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';

function AdminOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar pedidos');
      setLoading(false);
      console.error(err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await orderService.deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (err) {
      console.error('Error al eliminar pedido', err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-order-management">
      <h2>Gestión de Pedidos</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer?.name || 'Cliente'}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td>
                <button>Ver Detalles</button>
                <button onClick={() => handleDeleteOrder(order.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrderManagement;
import axiosInstance from '../utils/axiosConfig';

export const orderService = {
  getAllOrders: () => axiosInstance.get('/orders/all'),
  createOrder: (orderData) => axiosInstance.post('/orders/create', orderData),
  updateOrder: (orderId, orderData) => axiosInstance.put(`/orders/update/${orderId}`, orderData),
  deleteOrder: (orderId) => axiosInstance.delete(`/orders/delete/${orderId}`),
  getOrderById: (orderId) => axiosInstance.get(`/orders/${orderId}`)
};

export default orderService;
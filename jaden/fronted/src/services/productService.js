import axiosInstance from '../utils/axiosConfig';

export const productService = {
  getAllProducts: () => axiosInstance.get('/products/all'),
  createProduct: (productData) => axiosInstance.post('/products/create', productData),
  updateProduct: (productId, productData) => axiosInstance.put(`/products/update/${productId}`, productData),
  deleteProduct: (productId) => axiosInstance.delete(`/products/delete/${productId}`),
  getProductById: (productId) => axiosInstance.get(`/products/${productId}`)
};

export default productService;
import axiosInstance from '../utils/axiosConfig';

export const productService = {
  // Métodos para operaciones de producto normales (si se llega a necesitar)
  getAllProductsPublic: async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  }
};

export const adminProductService = {
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get('/admin/products');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos', error);
      throw error;
    }
  },
  createProduct: async (productData) => {
    try {
      const response = await axiosInstance.post('/admin/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto', error);
      throw error;
    }
  },
  updateProduct: async (productId, productData) => {
    try {
      const response = await axiosInstance.put(`/admin/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto', error.response?.data || error.message);
      throw error;
    }
  },
  deleteProduct: async (productId) => {
    try {
      const response = await axiosInstance.delete(`/admin/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar producto', error.response?.data || error.message);
      throw error;
    }
  }
};
import axiosInstance from '../utils/axiosConfig';

export const userService = {
  // Métodos para operaciones de usuario normal
  getUserProfile: async () => {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await axiosInstance.put('/users/profile', userData);
    return response.data;
  }
};

export const adminUserService = {
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios', error);
      throw error;
    }
  },
  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post('/admin/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario', error);
      throw error;
    }
  },
  updateUser: async (userId, userData) => {
    try {
      // Eliminar campos nulos o vacíos para evitar problemas de validación
      const cleanedUserData = Object.fromEntries(
        Object.entries(userData).filter(([_, v]) => v != null && v !== '')
      );
      const response = await axiosInstance.put(`/admin/users/${userId}`, cleanedUserData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar usuario', error.response?.data || error.message);
      throw error;
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar usuario', error.response?.data || error.message);
      throw error;
    }
  }
};
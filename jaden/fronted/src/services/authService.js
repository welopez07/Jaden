import axiosInstance from '../utils/axiosConfig';

export const authService = {
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  logout: () => {
    // Eliminar token del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Opcional: invalidar token en backend
    return axiosInstance.post('/auth/logout');
  },
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token; // Convertir a booleano
  }
};

export default authService;
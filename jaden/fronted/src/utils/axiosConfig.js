
import axios from 'axios';
import authService from '../services/authService';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Interceptor para añadir token a cada solicitud
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para manejar errores de autorización
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token inválido, cerrar sesión
      authService.logout();
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
import axiosInstance from '../utils/axiosConfig';

export const userService = {
  getAllUsers: () => axiosInstance.get('/users/all'),
  createUser: (userData) => axiosInstance.post('/users/create', userData),
  updateUser: (userId, userData) => axiosInstance.put(`/users/update/${userId}`, userData),
  deleteUser: (userId) => axiosInstance.delete(`/users/delete/${userId}`),
};

export default userService;
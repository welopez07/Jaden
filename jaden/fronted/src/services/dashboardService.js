import axiosInstance from '../utils/axiosConfig';

export const dashboardService = {
  getDashboardStats: () => axiosInstance.get('/dashboard/stats')
};

export default dashboardService;
import axiosInstance from '../utils/axiosConfig';

export const dashboardService = {
  getDashboardStats: () => axiosInstance.get('admin/dashboard/stats')
};

export default dashboardService;
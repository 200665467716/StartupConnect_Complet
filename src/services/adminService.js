// Fichier: src/services/adminService.js
import api from './api';

const adminService = {
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
  getAllDiplomeProfiles: async () => {
    const response = await api.get('/admin/profiles/diplome');
    return response.data;
  },
  getAllStartupProfiles: async () => {
    const response = await api.get('/admin/profiles/startup');
    return response.data;
  },
  getAllOffers: async () => {
    const response = await api.get('/admin/offers');
    return response.data;
  },
  deleteOffer: async (offerId) => {
    const response = await api.delete(`/admin/offers/${offerId}`);
    return response.data;
  },
};

export default adminService;

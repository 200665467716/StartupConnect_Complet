// Fichier: src/services/profileService.js
import api from './api';

const profileService = {
  // Récupérer le profil de l'utilisateur connecté
  async getMyProfile() {
    const response = await api.get('/profiles/me');
    return response.data;
  },

  // Créer un profil pour un diplômé
  async createGraduateProfile(profileData) {
    const response = await api.post('/profiles/diplome', profileData);
    return response.data;
  },

  // Créer un profil pour une startup
  async createStartupProfile(profileData) {
    const response = await api.post('/profiles/startup', profileData);
    return response.data;
  },

  // Mettre à jour un profil (la route est la même pour les deux)
  async updateMyProfile(profileData) {
    const response = await api.put('/profiles/me', profileData);
    return response.data;
  },
};

export default profileService;
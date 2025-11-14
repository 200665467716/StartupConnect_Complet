// Fichier: src/services/matchingService.js
import api from './api';

const matchingService = {
  // Récupérer les offres recommandées pour le diplômé connecté
  async getRecommendedOffers() {
    const response = await api.get('/matches/offers');
    return response.data;
  },

  // Récupérer les profils recommandés pour la startup connectée
  async getRecommendedProfiles() {
    const response = await api.get('/matches/profiles');
    return response.data;
  },
};

export default matchingService;
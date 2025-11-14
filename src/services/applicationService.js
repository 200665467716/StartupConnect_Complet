// Fichier: src/services/applicationService.js
import api from './api';

const applicationService = {
  // Récupérer les offres et leurs candidats pour la startup connectée
  async getStartupApplications() {
    const response = await api.get('/applications/my');
    return response.data;
  },

  // L'URL pour télécharger un CV
  getCVDownloadUrl(filename) {
    return `${api.defaults.baseURL}/cv/${filename}`;
  }
};

export default applicationService;

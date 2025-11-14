// Fichier: src/services/offerService.js
import api from './api';

const offerService = {
  // Récupérer toutes les offres
  async getAllOffers() {
    const response = await api.get('/offers/');
    return response.data;
  },

  // Récupérer une offre par son ID
  async getOfferById(id) {
    const response = await api.get(`/offers/${id}`);
    return response.data;
  },

  // Créer une nouvelle offre
  async createOffer(offerData) {
    const response = await api.post('/offers/', offerData);
    return response.data;
  },

  // Mettre à jour une offre
  async updateOffer(id, offerData) {
    const response = await api.put(`/offers/${id}`, offerData);
    return response.data;
  },

  // Supprimer une offre
  async deleteOffer(id) {
    const response = await api.delete(`/offers/${id}`);
    return response.data;
  },

  // Postuler à une offre avec un CV
  async applyToOffer(offerId, cvFile) {
    const formData = new FormData();
    formData.append('cv', cvFile);

    const response = await api.post(`/offers/${offerId}/apply`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default offerService;
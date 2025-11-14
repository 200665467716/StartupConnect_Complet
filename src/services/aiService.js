// Fichier: src/services/aiService.js
import api from './api';

const aiService = {
  /**
   * Demande au backend de générer une description basée sur un prompt.
   * @param {string} prompt - Le texte de base pour la génération (ex: compétences, nom de l'entreprise).
   * @param {string} context - Le contexte de la demande (ex: 'Bio for a graduate profile').
   * @param {string} target_type - Le type de cible (ex: 'diplome_profile', 'startup_profile').
   * @returns {Promise<Object>} La réponse de l'API contenant le texte généré.
   */
  async generateDescription(prompt, context, target_type) {
    const response = await api.post('/ai/generate-description', {
      prompt,
      context,
      target_type,
    });
    return response.data;
  },
};

export default aiService;
// Fichier: src/services/authService.js
import api from './api';

/**
 * Service pour gérer l'authentification des utilisateurs.
 * Il communique avec les endpoints d'authentification du backend.
 */
const authService = {
  /**
   * Enregistre un nouvel utilisateur.
   * @param {object} userData - Les données de l'utilisateur (email, password, role).
   * @returns {Promise<object>} Les données de l'utilisateur créé.
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Connecte un utilisateur.
   * @param {string} email - L'email de l'utilisateur.
   * @param {string} password - Le mot de passe de l'utilisateur.
   * @returns {Promise<object>} Le token d'accès.
   */
  login: async (email, password) => {
    // Le backend attend des données de formulaire pour le login
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },
};

export default authService;

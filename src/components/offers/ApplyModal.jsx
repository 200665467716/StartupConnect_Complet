// Fichier: src/components/offers/ApplyModal.jsx
import { useState } from 'react';
import offerService from '../../services/offerService';

const ApplyModal = ({ isOpen, onClose, offer }) => {
  const [cvFile, setCvFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      setError('Veuillez sélectionner un fichier CV.');
      return;
    }
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      await offerService.applyToOffer(offer.id, cvFile);
      setSuccess('Votre candidature a été envoyée avec succès !');
      // Fermer la modale après un court délai
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Une erreur est survenue lors de l\'envoi de la candidature.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Postuler à : {offer.title}</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-2">Votre CV (PDF)</label>
            <input 
              type="file" 
              id="cv" 
              accept=".pdf"
              onChange={handleFileChange} 
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required 
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50">
              Annuler
            </button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
              {isLoading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;

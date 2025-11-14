import { useState } from 'react';
import profileService from '../../services/profileService';
import aiService from '../../services/aiService';

const EditStartupProfileForm = ({ profile, onProfileUpdated }) => {
  const [companyName, setCompanyName] = useState(profile.company_name);
  const [description, setDescription] = useState(profile.description || '');
  const [website, setWebsite] = useState(profile.website || '');
  const [industry, setIndustry] = useState(profile.industry || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const profileData = {
        company_name: companyName,
        description,
        website,
        industry,
      };
      await profileService.updateMyProfile(profileData);
      onProfileUpdated();
    } catch (err) {
      setError(err.response?.data?.detail || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
    const prompt = `${companyName} ${industry}`;
    if (!prompt.trim()) {
      setError('Veuillez renseigner le nom de l\'entreprise et le secteur d\'activité.');
      return;
    }
    setError('');
    setIsGenerating(true);
    try {
      const response = await aiService.generateDescription(prompt, 'Description for a startup profile', 'startup_profile');
      setDescription(response.generated_text);
    } catch (err) {
      setError('Erreur lors de la génération de la description.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="text-sm text-blue-600 hover:underline disabled:text-gray-400">
            {isGenerating ? 'Génération...' : 'Générer avec l\'IA'}
          </button>
        </div>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Site web</label>
        <input
          type="url"
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Secteur d'activité</label>
        <input
          type="text"
          id="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300">
        {isLoading ? 'Mise à jour en cours...' : 'Mettre à jour le profil'}
      </button>
    </form>
  );
};

export default EditStartupProfileForm;

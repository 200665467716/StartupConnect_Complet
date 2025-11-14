import { useState } from 'react';
import profileService from '../../services/profileService';
import aiService from '../../services/aiService';

const EditDiplomeProfileForm = ({ profile, onProfileUpdated }) => {
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [bio, setBio] = useState(profile.bio || '');
  const [skills, setSkills] = useState(profile.skills.join(', '));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const profileData = {
        first_name: firstName,
        last_name: lastName,
        bio,
        skills: skills.split(',').map(skill => skill.trim()),
      };
      await profileService.updateMyProfile(profileData);
      onProfileUpdated();
    } catch (err) {
      setError(err.response?.data?.detail || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBio = async () => {
    if (!skills) {
      setError('Veuillez d\'abord renseigner vos compétences.');
      return;
    }
    setError('');
    setIsGenerating(true);
    try {
      const response = await aiService.generateDescription(skills, 'Bio for a graduate profile', 'diplome_profile');
      setBio(response.generated_text);
    } catch (err) {
      setError('Erreur lors de la génération de la bio.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <button type="button" onClick={handleGenerateBio} disabled={isGenerating} className="text-sm text-blue-600 hover:underline disabled:text-gray-400">
            {isGenerating ? 'Génération...' : 'Générer avec l\'IA'}
          </button>
        </div>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Compétences (séparées par des virgules)</label>
        <input
          type="text"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300">
        {isLoading ? 'Mise à jour en cours...' : 'Mettre à jour le profil'}
      </button>
    </form>
  );
};

export default EditDiplomeProfileForm;

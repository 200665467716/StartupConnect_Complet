// Fichier: src/pages/MatchingPage.jsx
import { useState, useEffect } from 'react';
import matchingService from '../services/matchingService';
import { useAuth } from '../hooks/useAuth';

const MatchingPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user) {
        try {
          let data;
          if (user.role === 'diplome') {
            data = await matchingService.getRecommendedOffers();
          } else if (user.role === 'startup') {
            data = await matchingService.getRecommendedProfiles();
          }
          setRecommendations(data);
        } catch (err) {
          setError('Impossible de charger les recommandations.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRecommendations();
  }, [user]);

  if (isLoading) {
    return <div className="text-center">Chargement des recommandations...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Recommandations</h1>
      {user.role === 'diplome' && <RecommendedOffers offers={recommendations} />}
      {user.role === 'startup' && <RecommendedProfiles profiles={recommendations} />}
    </div>
  );
};

const RecommendedOffers = ({ offers }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {offers.map(offer => (
      <div key={offer.id} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">{offer.title}</h2>
        <p className="text-gray-700 mt-2">{offer.description}</p>
        <div className="mt-4">
          <span className="text-gray-500">{offer.location}</span>
        </div>
      </div>
    ))}
  </div>
);

const RecommendedProfiles = ({ profiles }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {profiles.map(profile => (
      <div key={profile.id} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">{profile.first_name} {profile.last_name}</h2>
        <p className="text-gray-700 mt-2">{profile.bio}</p>
        <div className="mt-4">
          {profile.skills.map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default MatchingPage;
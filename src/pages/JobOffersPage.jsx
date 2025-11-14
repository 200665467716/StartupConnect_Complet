
// Fichier: src/pages/JobOffersPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import offerService from '../services/offerService';
import { useAuth } from '../hooks/useAuth';
import ApplyModal from '../components/offers/ApplyModal'; // Importer la modale

const JobOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  // State pour la modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await offerService.getAllOffers();
        setOffers(data);
      } catch (err) {
        setError('Impossible de charger les offres.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleApplyClick = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="text-center">Chargement des offres...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Offres d'emploi</h1>
        {user && user.role === 'startup' && (
          <Link to="/offers/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Créer une offre
          </Link>
        )}
      </div>

      {offers.length === 0 ? (
        <div className="text-center my-8 bg-white p-8 rounded-lg shadow-md">
          <p className="mb-4 text-gray-600">Aucune offre disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold">{offer.title}</h2>
                <p className="text-gray-500 text-sm mb-2">{offer.owner.company_name}</p>
                <p className="text-gray-700 mt-2">{offer.description}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">{offer.location || 'Non spécifié'}</span>
                {user && user.role === 'diplome' && (
                  <button onClick={() => handleApplyClick(offer)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold">
                    Postuler
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rendu de la modale */}
      {selectedOffer && (
        <ApplyModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          offer={selectedOffer} 
        />
      )}
    </div>
  );
};

export default JobOffersPage;
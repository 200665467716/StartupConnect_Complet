
// Fichier: src/pages/ApplicationTrackerPage.jsx
import { useState, useEffect } from 'react';
import applicationService from '../services/applicationService';

const ApplicationTrackerPage = () => {
  const [offersWithApplicants, setOffersWithApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationService.getStartupApplications();
        setOffersWithApplicants(data);
      } catch (err) {
        setError('Impossible de charger les candidatures.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (isLoading) {
    return <div className="text-center">Chargement des candidatures...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Suivi des Candidatures</h1>
      
      {offersWithApplicants.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">Vous n'avez reçu aucune candidature pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {offersWithApplicants.map(offer => (
            <OfferApplicants key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
};

// Composant pour afficher une offre et ses candidats
const OfferApplicants = ({ offer }) => {
  const [isOpen, setIsOpen] = useState(true); // Open by default

  return (
    <div className="bg-white rounded-lg shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left p-4 flex justify-between items-center font-bold text-lg text-gray-800 hover:bg-gray-50"
      >
        <span>{offer.title} ({offer.applicants.length} {offer.applicants.length > 1 ? 'candidatures' : 'candidature'})</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-200">
          {offer.applicants.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Candidat</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">CV</th>
                </tr>
              </thead>
              <tbody>
                {offer.applicants.map(app => (
                  <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{app.applicant.full_name}</td>
                    <td className="px-6 py-4">{app.applicant.email}</td>
                    <td className="px-6 py-4">{new Date(app.applied_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <a 
                        href={applicationService.getCVDownloadUrl(app.cv_filename)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Télécharger
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 py-4">Aucune candidature pour cette offre.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationTrackerPage;

// Fichier: src/pages/AdminPage.jsx
import { useState, useEffect, useCallback } from 'react';
import adminService from '../services/adminService';
import { useAuth } from '../hooks/useAuth';

const AdminPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (user && user.role === 'ADMIN') {
      setIsLoading(true);
      try {
        const [usersData, offersData] = await Promise.all([
          adminService.getAllUsers(),
          adminService.getAllOffers(),
        ]);
        setUsers(usersData);
        setOffers(offersData);
      } catch (err) {
        setError('Impossible de charger les données admin.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      await adminService.deleteUser(userId);
      fetchData(); // Refresh data
    }
  };

  const handleDeleteOffer = async (offerId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      await adminService.deleteOffer(offerId);
      fetchData(); // Refresh data
    }
  };

  if (isLoading) {
    return <div className="text-center">Chargement du panneau d'administration...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (user?.role !== 'ADMIN') {
    return <div className="text-center text-red-500">Accès non autorisé.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Utilisateurs</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {users.map(u => (
            <div key={u.id} className="flex justify-between items-center p-2 border-b">
              <span>{u.email} ({u.role})</span>
              <button onClick={() => handleDeleteUser(u.id)} className="text-red-500 hover:text-red-700">Supprimer</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Offres d'emploi</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {offers.map(offer => (
            <div key={offer.id} className="flex justify-between items-center p-2 border-b">
              <span>{offer.title}</span>
              <button onClick={() => handleDeleteOffer(offer.id)} className="text-red-500 hover:text-red-700">Supprimer</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
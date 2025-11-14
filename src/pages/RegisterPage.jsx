// Fichier: src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState('diplome'); // 'diplome' ou 'startup'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const userData = {
      email,
      password,
      full_name: fullName,
      role: userType,
    };

    try {
      await authService.register(userData);
      // Après l'inscription, rediriger vers la page de connexion avec un message
      navigate('/login', { state: { message: 'Inscription réussie ! Veuillez vous connecter.' } });
    } catch (err) {
      setError(err.response?.data?.detail || 'Une erreur est survenue lors de l\'inscription.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="fullName">Nom complet</label>
            <input
              type="text" id="fullName" value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Mot de passe</label>
            <input
              type="password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Je suis un(e)</label>
            <div className="flex rounded-lg border">
                <button type="button" onClick={() => setUserType('diplome')} className={`w-1/2 p-2 rounded-l-lg ${userType === 'diplome' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    Diplômé(e)
                </button>
                <button type="button" onClick={() => setUserType('startup')} className={`w-1/2 p-2 rounded-r-lg ${userType === 'startup' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    Startup
                </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300">
            {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

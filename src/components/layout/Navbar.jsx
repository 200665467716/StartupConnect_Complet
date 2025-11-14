// Fichier: src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">StartupConnect</Link>
        <div>
          <Link to="/offers" className="text-gray-600 hover:text-blue-500 mx-3">Offres</Link>
          {isAuthenticated ? (
            <>
              <Link to="/matching" className="text-gray-600 hover:text-blue-500 mx-3">Matching</Link>
              {user && user.role === 'startup' && (
                <Link to="/applications" className="text-gray-600 hover:text-blue-500 mx-3">Mes Candidatures</Link>
              )}
              {user && user.role === 'ADMIN' && (
                <Link to="/admin" className="text-gray-600 hover:text-blue-500 mx-3">Admin</Link>
              )}
              <Link to="/profile" className="text-gray-600 hover:text-blue-500 mx-3">Profil</Link>
              <button onClick={logout} className="text-gray-600 hover:text-blue-500 mx-3">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-500 mx-3">Connexion</Link>
              <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mx-3">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
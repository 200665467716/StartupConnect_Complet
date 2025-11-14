
// Fichier: src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobOffersPage from './pages/JobOffersPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import OfferCreatePage from './pages/OfferCreatePage';
import MatchingPage from './pages/MatchingPage';
import AdminPage from './pages/AdminPage';
import ApplicationTrackerPage from './pages/ApplicationTrackerPage'; // Importer la nouvelle page

function App() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar />
      <main className="container mx-auto p-6">
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/offers" element={<JobOffersPage />} />

          {/* Routes protégées */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/offers/create"
            element={
              <ProtectedRoute>
                <OfferCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matching"
            element={
              <ProtectedRoute>
                <MatchingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <ApplicationTrackerPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App


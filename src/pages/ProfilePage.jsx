// Fichier: src/pages/ProfilePage.jsx
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import profileService from '../services/profileService';
import CreateDiplomeProfileForm from '../components/profile/CreateDiplomeProfileForm';
import CreateStartupProfileForm from '../components/profile/CreateStartupProfileForm';
import EditDiplomeProfileForm from '../components/profile/EditDiplomeProfileForm';
import EditStartupProfileForm from '../components/profile/EditStartupProfileForm';

// Composant pour afficher un profil de diplômé

const GraduateProfileDisplay = ({ profile }) => (

  <div>

    <h2 className="text-2xl font-semibold">{profile.first_name} {profile.last_name}</h2>

    <p className="text-gray-600 mt-4"><span className="font-semibold">Bio:</span> {profile.bio || 'Non spécifiée'}</p>

    <div className="mt-4">

        <h3 className="font-semibold">Compétences:</h3>

        <div className="flex flex-wrap gap-2 mt-2">

            {profile.skills && profile.skills.length > 0 ? 

                profile.skills.map(skill => <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{skill}</span>)

                : <p>Aucune compétence ajoutée.</p>

            }

        </div>

    </div>

  </div>

);



// Composant pour afficher un profil de startup

const StartupProfileDisplay = ({ profile }) => (

  <div>

    <h2 className="text-2xl font-semibold">{profile.company_name}</h2>

    <p className="text-gray-600 mt-4"><span className="font-semibold">Secteur:</span> {profile.industry || 'Non spécifié'}</p>

    <p className="text-gray-600 mt-2"><span className="font-semibold">Description:</span> {profile.description || 'Non spécifiée'}</p>

    <p className="text-gray-600 mt-2"><span className="font-semibold">Site web:</span> <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{profile.website}</a></p>

  </div>

);



function ProfilePage() {

  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState('');

  const [isEditing, setIsEditing] = useState(false);



  const fetchProfile = useCallback(async () => {

    if (user) {

      setIsLoading(true);

      try {

        const data = await profileService.getMyProfile();

        setProfile(data);

      } catch (err) {

        if (err.response && err.response.status === 404) {

          setProfile(null);

        } else {

          setError('Impossible de charger le profil.');

          console.error(err);

        }

      } finally {

        setIsLoading(false);

      }

    }

  }, [user]);



  useEffect(() => {

    fetchProfile();

  }, [fetchProfile]);



  const handleProfileUpdated = () => {

    setIsEditing(false);

    fetchProfile();

  };



  if (isLoading) {

    return <div className="text-center">Chargement du profil...</div>;

  }



  if (error) {

    return <div className="text-center text-red-500">{error}</div>;

  }



  if (!profile) {

    return (

      <div className="text-center bg-white p-8 rounded-lg shadow-md">

        <h2 className="text-2xl font-bold mb-4">Complétez votre profil</h2>

        <p className="mb-6">Vous n'avez pas encore de profil. Créez-le maintenant pour commencer à utiliser StartupConnect !</p>

        {user.role === 'diplome' && <CreateDiplomeProfileForm onProfileCreated={fetchProfile} />}

        {user.role === 'startup' && <CreateStartupProfileForm onProfileCreated={fetchProfile} />}

      </div>

    );

  }



  return (

    <div className="bg-white p-8 rounded-lg shadow-md">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">Mon Profil</h1>

        <button onClick={() => setIsEditing(!isEditing)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">

          {isEditing ? 'Annuler' : 'Modifier le profil'}

        </button>

      </div>



      {isEditing ? (

        <>

          {user.role === 'diplome' && <EditDiplomeProfileForm profile={profile} onProfileUpdated={handleProfileUpdated} />}

          {user.role === 'startup' && <EditStartupProfileForm profile={profile} onProfileUpdated={handleProfileUpdated} />}

        </>      ) : (

        <>

          {user.role === 'diplome' && <GraduateProfileDisplay profile={profile} />}

          {user.role === 'startup' && <StartupProfileDisplay profile={profile} />}

        </>

      )}

    </div>

  );

}

export default ProfilePage;
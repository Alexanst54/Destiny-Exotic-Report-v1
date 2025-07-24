import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function BungieProfile({ accessToken }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => setProfile(res.data))
      .catch(err => setError(err.response?.data?.error || 'Erreur'));
  }, [accessToken]);

  if (error) return <div>Erreur : {error}</div>;
  if (!profile) return <div>Chargement du profil...</div>;

  return (
    <div className="p-4 border rounded bg-gray-100">
      <h2 className="text-xl font-bold mb-2">{profile.displayName}</h2>
      {profile.iconPath && (
        <img
          src={`https://www.bungie.net${profile.iconPath}`}
          alt="Avatar"
          className="w-16 h-16 rounded-full mb-2"
        />
      )}
      <div>Plateforme : {profile.platform}</div>
      <div>Clan : {profile.clanName || 'Aucun'}</div>
      <div>Niveau de saison : {profile.seasonLevel ?? 'N/A'}</div>
    </div>
  );
}
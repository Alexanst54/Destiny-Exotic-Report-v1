import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function BungieActivities({ accessToken }) {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => setActivities(res.data.activities || []))
      .catch(err => setError(err.response?.data?.error || 'Erreur'));
  }, [accessToken]);

  if (error) return <div>Erreur : {error}</div>;
  if (!accessToken) return null;
  if (!activities.length) return <div>Chargement des activités...</div>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Dernières activités</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((act, idx) => (
          <li key={idx} className="py-2">
            <div>
              <span className="font-semibold">{act.activityDetails?.referenceId}</span>
              {/* Tu peux enrichir avec d'autres champs selon la structure retournée */}
              <span className="ml-2 text-xs text-gray-500">
                {act.values?.completed?.basic?.value ? 'Fini' : 'Non fini'}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Date : {act.period}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
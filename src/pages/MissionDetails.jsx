import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function MissionDetails() {
  const { hash } = useParams();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_BUNGIE_API_KEY;

  useEffect(() => {
    async function fetchMission() {
      try {
        const res = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyActivityDefinition/${hash}/`, {
          headers: { 'X-API-Key': API_KEY }
        });
        setMission(res.data.Response);
      } catch (e) {
        setError('Erreur lors du chargement de la mission');
      } finally {
        setLoading(false);
      }
    }
    fetchMission();
  }, [hash, API_KEY]);

  if (loading) return <div>Chargement...</div>;
  if (error || !mission) return <div>{error || 'Mission inconnue'}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/missions" className="text-yellow-500 underline mb-4 inline-block">← Retour aux missions</Link>
      <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-8 flex flex-col items-center mb-8">
        {mission.pgcrImage && (
          <img src={`https://www.bungie.net${mission.pgcrImage}`} alt={mission.displayProperties?.name} className="w-full h-56 object-cover rounded mb-6" />
        )}
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{mission.displayProperties?.name || 'Mission exotique'}</h2>
        <div className="text-gray-700 dark:text-gray-300 mb-4">{mission.displayProperties?.description || 'Aucune description.'}</div>
        <div className="text-sm text-gray-400">Hash: {hash}</div>
      </div>
    </div>
  );
}

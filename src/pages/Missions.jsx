import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_BUNGIE_API_KEY;

if (!API_KEY) {
  // Affiche une alerte claire si la clé API n'est pas définie
  // eslint-disable-next-line no-alert
  alert("Erreur : la clé API Bungie n'est pas définie. Ajoutez VITE_BUNGIE_API_KEY=... dans votre fichier .env et redémarrez le serveur Vite.");
}

export default function Missions() {
  const [exoticActivities, setExoticActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charge dynamiquement la liste des missions exotiques depuis le backend
    async function fetchActivities() {
      try {
        // Utilise la nouvelle route API pour récupérer la liste à jour
        const res = await axios.get("/api/exotic-activities");
        // Le backend fournit déjà toutes les infos nécessaires (nom, image, hash, etc.)
        const activities = Array.isArray(res.data) ? res.data : (res.data.activities || []);
        setExoticActivities(activities);
      } catch (err) {
        setError("Erreur lors de la récupération des missions exotiques.");
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  return (
    <div className="bg-white dark:bg-[#181926] min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Missions Exotiques</h1>
      {loading && <div className="text-gray-400">Chargement...</div>}
      {error && <div className="text-red-400">{error}</div>}
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead>
          <tr>
            <th className="text-lg text-gray-900 dark:text-white">Nom</th>
            <th className="text-lg text-gray-900 dark:text-white">Image</th>
            <th className="text-lg text-gray-900 dark:text-white">Variants</th>
          </tr>
        </thead>
        <tbody>
          {!loading && !error && exoticActivities.map((mission, idx) => (
            <tr key={mission.hash || idx} className="bg-gray-100 dark:bg-[#23243a] rounded-lg">
              <td className="py-3 px-2 font-bold text-yellow-600 dark:text-yellow-400">
                <Link to={`/missions/${mission.hash}`}>{mission.name}</Link>
              </td>
              <td className="py-3 px-2">
                <img src={mission.pgcrImage || "/images/unknown.png"} alt={mission.name} className="w-32 h-20 object-cover rounded" onError={e => { e.target.onerror = null; e.target.src = "/images/unknown.png"; }} />
              </td>
              <td className="py-3 px-2">
                {/* Si tu veux afficher d'autres infos, ajoute ici */}
                <span className="italic text-gray-400">{mission.hash}</span>
                {mission.log && (
                  <div className="text-xs text-red-400 mt-1">{mission.log}</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Missions() {
  const [exoticActivities, setExoticActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await axios.get("/api/exotic-activities");
        const activities = Array.isArray(res.data) ? res.data : (res.data.activities || []);
        // Regroupe par mission principale (nom sans variante)
        const groupByMain = {};
        activities.forEach(act => {
          // On considère le nom principal comme tout avant le premier ':' ou '('
          const mainName = act.name.split(/[:(]/)[0].trim();
          if (!groupByMain[mainName]) {
            groupByMain[mainName] = {
              main: act,
              variants: [],
              extension: act.description?.includes("The Final Shape") ? "The Final Shape" : null,
              description: act.description,
              pgcrImage: act.pgcrImage,
            };
          }
          // Ajoute la variante (le nom complet)
          groupByMain[mainName].variants.push(act);
        });
        setExoticActivities(Object.values(groupByMain));
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
      <div className="flex flex-col gap-8">
        {!loading && !error && exoticActivities.map((mission, idx) => (
          <div key={mission.main.hash || idx} className="rounded-2xl shadow-lg overflow-hidden relative" style={{ background: mission.pgcrImage ? `url(${mission.pgcrImage}) center/cover no-repeat` : '#23243a' }}>
            <div className="bg-black/60 dark:bg-[#23243a]/80 p-8 flex flex-col gap-2 min-h-[280px]">
              <div className="text-3xl font-bold mb-2 text-yellow-400 drop-shadow-lg">{mission.main.name.split(/[:(]/)[0].trim()}</div>
              <div className="italic text-lg text-gray-300 mb-2">{mission.description || "Aucune description."}</div>
              {mission.extension && (
                <div className="mb-2"><span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded">Extension : {mission.extension}</span></div>
              )}
              <div className="mb-2">
                <span className="font-semibold text-gray-200">Variants :</span>{' '}
                {mission.variants.map(variant => (
                  <Link key={variant.hash} to={`/missions/${variant.hash}`} className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 m-1 rounded shadow hover:bg-yellow-100 dark:hover:bg-yellow-900 transition">
                    {variant.name.replace(mission.main.name.split(/[:(]/)[0].trim(), '').replace(/[:()]/g, '').trim() || 'Standard'}
                  </Link>
                ))}
              </div>
              <div className="bg-gray-200/80 dark:bg-gray-700/80 rounded p-3 mt-4 text-center text-gray-500">
                Stats à venir...
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

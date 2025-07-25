import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_BUNGIE_API_KEY;

export default function Missions() {
  const [exoticActivities, setExoticActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Liste des missions exotiques avec hash textuel et hash numérique principal (pour l'image)
    const missions = [
      { hash: "dualdestiny", mainHash: -2132841886, variants: [ { name: "Standard", hash: -2132841886 } ] },
      { hash: "encore", mainHash: 1550266704, variants: [ { name: "Standard", hash: 1550266704 } ] },
      { hash: "voxobscura", mainHash: -1626230148, variants: [ { name: "Standard", hash: -1626230148 } ] },
      { hash: "zerohour", mainHash: -933221025, variants: [ { name: "Standard", hash: -933221025 } ] },
      { hash: "presage", mainHash: -411671539, variants: [ { name: "Standard", hash: -411671539 } ] },
      { hash: "seraphshield", mainHash: 1221538367, variants: [ { name: "Seraph's Shield: Standard", hash: 1221538367 } ] },
      { hash: "kellsfall", mainHash: -416696360, variants: [ { name: "Standard", hash: -416696360 } ] },
      { hash: "starcrossed", mainHash: 196691221, variants: [ { name: "Standard", hash: 196691221 } ] },
      { hash: "whisper", mainHash: 74501540, variants: [ { name: "Standard", hash: 74501540 } ] },
      { hash: "harbinger", mainHash: 1738383283, variants: [ { name: "Standard", hash: 1738383283 } ] },
    ];

    async function fetchImages() {
      const results = await Promise.all(missions.map(async (mission) => {
        try {
          const res = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyActivityDefinition/${mission.mainHash}/`, {
            headers: { 'X-API-Key': API_KEY }
          });
          const img = res.data.Response?.pgcrImage ? `https://www.bungie.net${res.data.Response.pgcrImage}` : null;
          const name = res.data.Response?.displayProperties?.name || mission.hash;
          return { ...mission, image: img, name };
        } catch {
          return { ...mission, image: null, name: mission.hash };
        }
      }));
      setExoticActivities(results);
      setLoading(false);
    }
    fetchImages();
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
            <tr key={idx} className="bg-gray-100 dark:bg-[#23243a] rounded-lg">
              <td className="py-3 px-2 font-bold text-yellow-600 dark:text-yellow-400">
                <Link to={`/missions/${mission.variants && mission.variants[0] && mission.variants[0].hash ? mission.variants[0].hash : mission.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}>{mission.name}</Link>
              </td>
              <td className="py-3 px-2">
                <img src={mission.image} alt={mission.name} className="w-32 h-20 object-cover rounded" />
              </td>
              <td className="py-3 px-2">
                {mission.variants && mission.variants.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {mission.variants.map((variant, vIdx) => (
                      <li key={vIdx} className="bg-gray-200 dark:bg-[#181926] px-2 py-1 rounded text-xs text-gray-900 dark:text-gray-200">
                        {variant.name}
                      </li>
                    ))}
                  </ul>
                ) : <span className="italic text-gray-400">Aucun</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

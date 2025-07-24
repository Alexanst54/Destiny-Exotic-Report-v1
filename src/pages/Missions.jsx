import { useEffect, useState } from "react";
import axios from "axios";

export default function Missions() {
  const [exoticActivities, setExoticActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setExoticActivities([
      {
        name: "Dual Destiny",
        image: "https://www.bungie.net/img/destiny_content/pgcr/dualdestiny.jpg",
        variants: [ { name: "Standard", hash: -2132841886 } ]
      },
      {
        name: "Encore",
        image: "https://www.bungie.net/img/destiny_content/pgcr/encore.jpg",
        variants: [ { name: "Standard", hash: 123456789 } ]
      },
      {
        name: "Vox Obscura",
        image: "https://www.bungie.net/img/destiny_content/pgcr/voxobscura.jpg",
        variants: [ { name: "Standard", hash: 987654321 } ]
      },
      {
        name: "Zero Hour",
        image: "https://www.bungie.net/img/destiny_content/pgcr/zerohour.jpg",
        variants: [ { name: "Standard", hash: 192837465 } ]
      },
      {
        name: "Presage",
        image: "https://www.bungie.net/img/destiny_content/pgcr/presage.jpg",
        variants: [ { name: "Standard", hash: 564738291 } ]
      },
      {
        name: "Operation: Seraph's Shield",
        image: "https://www.bungie.net/img/destiny_content/pgcr/seraphsshield.jpg",
        variants: [ { name: "Standard", hash: 1029384756 } ]
      },
      {
        name: "Kell's Fall",
        image: "https://www.bungie.net/img/destiny_content/pgcr/kellsfall.jpg",
        variants: [ { name: "Standard", hash: 564738290 } ]
      },
      {
        name: "Starcrossed",
        image: "https://www.bungie.net/img/destiny_content/pgcr/starcrossed.jpg",
        variants: [ { name: "Standard", hash: 564738299 } ]
      },
      {
        name: "The Whisper",
        image: "https://www.bungie.net/img/destiny_content/pgcr/whisper.jpg",
        variants: [ { name: "Standard", hash: 564738298 } ]
      },
      {
        name: "Harbinger",
        image: "https://www.bungie.net/img/destiny_content/pgcr/harbinger.jpg",
        variants: [ { name: "Standard", hash: 564738297 } ]
      }
    ]);
    setLoading(false);
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
              <td className="py-3 px-2 font-bold text-yellow-600 dark:text-yellow-400">{mission.name}</td>
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

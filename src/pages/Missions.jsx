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
        variants: [
          { name: "Expert", hash: 655052177 },
          { name: "Overture (Expert)", hash: -1932104431 },
          { name: "Concerto (Expert)", hash: -1932104430 },
          { name: "Coda (Expert)", hash: -1553027841 },
          { name: "Standard", hash: 1550266704 },
          { name: "Customize", hash: -1174422607 },
          { name: "Concerto: Standard", hash: -752855492 },
          { name: "Coda: Standard", hash: -752855491 },
          { name: "Overture: Standard", hash: -752855489 }
        ]
      },
      {
        name: "Vox Obscura",
        image: "https://www.bungie.net/img/destiny_content/pgcr/voxobscura.jpg",
        variants: [
          { name: "Standard", hash: -1626230148 },
          { name: "Master", hash: 613120446 },
          { name: "Expert", hash: 666172264 },
          { name: "Normal", hash: 901429423 }
        ]
      },
      {
        name: "Zero Hour",
        image: "https://www.bungie.net/img/destiny_content/pgcr/zerohour.jpg",
        variants: [
          { name: "Heroic", hash: -1563758630 },
          { name: "Standard", hash: -933221025 },
          { name: "Expert", hash: 1848771417 }
        ]
      },
      {
        name: "Presage",
        image: "https://www.bungie.net/img/destiny_content/pgcr/presage.jpg",
        variants: [
          { name: "Standard", hash: -411671539 },
          { name: "Expert", hash: -93120625 }
        ]
      },
      {
        name: "Operation: Seraph's Shield",
        image: "https://www.bungie.net/img/destiny_content/pgcr/seraphsshield.jpg",
        variants: [
          { name: "Seraph's Shield (Expert)", hash: -1375158087 },
          { name: "Seraph's Shield: Normal", hash: 202306511 },
          { name: "Seraph's Shield (Legend)", hash: 995051012 },
          { name: "Seraph's Shield: Standard", hash: 1221538367 }
        ]
      },
      {
        name: "Kell's Fall",
        image: "https://www.bungie.net/img/destiny_content/pgcr/kellsfall.jpg",
        variants: [
          { name: "Standard", hash: -416696360 },
          { name: "Diffraction", hash: -998179575 },
          { name: "Reflection (Expert)", hash: -847719003 },
          { name: "Expert", hash: 367562924 },
          { name: "Distortion (Expert)", hash: 264074906 },
          { name: "Distortion", hash: 715393254 },
          { name: "Diffraction (Expert)", hash: 1044034163 },
          { name: "Reflection", hash: 1583447699 },
          { name: "Customize", hash: 1948474391 }
        ]
      },
      {
        name: "Starcrossed",
        image: "https://www.bungie.net/img/destiny_content/pgcr/starcrossed.jpg",
        variants: [
          { name: "Legend", hash: 1013336498 },
          { name: "Standard", hash: 196691221 },
          { name: "Normal", hash: 896748846 },
          { name: "Customize", hash: 1768099736 }
        ]
      },
      {
        name: "The Whisper",
        image: "https://www.bungie.net/img/destiny_content/pgcr/whisper.jpg",
        variants: [
          { name: "Standard", hash: 74501540 },
          { name: "Expert", hash: -423446509 },
          { name: "Customize", hash: 576782083 },
          { name: "Heroic", hash: 1099555105 }
        ]
      },
      {
        name: "Harbinger",
        image: "https://www.bungie.net/img/destiny_content/pgcr/harbinger.jpg",
        variants: [
          { name: "Standard", hash: 1738383283 }
        ]
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

// Définition des thèmes par extension ou nom de mission principale
const MISSION_THEMES = {
  "The Witch Queen": {
    name: "The Witch Queen",
    colors: ["#3A1F73", "#033159", "#027353", "#0AA67A", "#592608"],
    gradient: "linear-gradient(135deg, #3A1F73 0%, #033159 25%, #027353 50%, #0AA67A 75%, #592608 100%)"
  },
  // Ajoute d'autres thèmes ici si besoin
};


import { Link } from "react-router-dom";

export default function Missions({ exoticActivities = [] }) {
  // Regroupe par mission principale (nom sans variante)
  const groupByMain = {};
  exoticActivities.forEach(act => {
    const mainName = act.name.split(/[:(]/)[0].trim();
    if (!groupByMain[mainName]) {
      groupByMain[mainName] = {
        main: act,
        variants: [],
        image: act.image,
      };
    }
    groupByMain[mainName].variants = act.variants;
    groupByMain[mainName].image = act.image;
  });
  const missions = Object.values(groupByMain);

  return (
    <div className="bg-white dark:bg-[#181926] min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Missions Exotiques</h1>
      <div className="flex flex-col gap-8">
        {missions.map((mission, idx) => (
          <div
            key={mission.main.name + idx}
            className="rounded-2xl shadow-lg overflow-hidden relative"
            style={{
              background: mission.image ? `url(${mission.image}) center/cover no-repeat` : '#23243a',
            }}
          >
            <div className="bg-black/60 dark:bg-[#23243a]/80 p-8 flex flex-col gap-2 min-h-[280px]">
              <div className="text-3xl font-bold mb-2" style={{ color: '#FFD600' }}>{mission.main.name.split(/[:(]/)[0].trim()}</div>
              <div className="italic text-lg text-gray-300 mb-2">Mission exotique Destiny 2</div>
              <div className="mb-2">
                <span className="font-semibold text-gray-200">Variants :</span>{' '}
                {mission.variants.map(variant => (
                  <Link key={variant.hash} to={`/missions/${variant.hash}`} className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 m-1 rounded shadow hover:bg-yellow-100 dark:hover:bg-yellow-900 transition">
                    {variant.name}
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

import React from "react";
import { useParams, Link } from "react-router-dom";

// Example static data, to be replaced by a fetch or JSON import later
const exoticMissions = [
  {
    name: "Dual Destiny",
    hash: "dualdestiny",
    image: "https://www.bungie.net/img/destiny_content/pgcr/dualdestiny.jpg",
    description: "Exotic cooperative mission from Season 23.",
    completions: 14,
    timeSpent: "8h 12m",
    bestTime: "18:42",
    kills: 87,
    deaths: 3,
    finished: true,
    details: "Dual Destiny is a cooperative mission requiring two players, one Light, one Darkness. You must activate synchronized plates, solve puzzles, and defeat several bosses. The mission offers variants and secrets to discover.",
    youtube: "https://www.youtube.com/watch?v=QwQwQwQwQwQ",
    chests: [
      { name: "Chest 1", description: "Behind the secret door after the first boss." },
      { name: "Chest 2", description: "In the laser room, jump onto the hidden platform on the left." },
      { name: "Chest 3", description: "After the light puzzle, in the high alcove." },
    ],
    lastCompletions: [
      { date: "2025-07-24", time: "18:42", classe: "Titan", kills: 87, deaths: 3, finished: true },
      { date: "2025-07-20", time: "20:30", classe: "Hunter", kills: 110, deaths: 6, finished: true },
    ],
  },
  {
    name: "Encore",
    hash: "encore",
    image: "https://www.bungie.net/img/destiny_content/pgcr/encore.jpg",
    description: "Musical mission with several variants.",
    completions: 10,
    timeSpent: "6h 40m",
    bestTime: "19:40",
    kills: 102,
    deaths: 5,
    finished: true,
    details: "Encore features musical puzzles and rhythm-based boss fights. You must activate platforms in the correct order.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_ENCORE",
    chests: [
      { name: "Chest 1", description: "In the orchestra room, behind the red curtain." },
      { name: "Chest 2", description: "After the tempo puzzle, on the upper walkway." }
    ],
    lastCompletions: [
      { date: "2025-07-23", time: "21:10", classe: "Hunter", kills: 102, deaths: 5, finished: true }
    ]
  },
  {
    name: "Vox Obscura",
    hash: "voxobscura",
    image: "https://www.bungie.net/img/destiny_content/pgcr/voxobscura.jpg",
    description: "Infiltrate a Cabal base to intercept transmissions and obtain Dead Messenger.",
    completions: 8,
    timeSpent: "5h 20m",
    bestTime: "23:10",
    kills: 91,
    deaths: 4,
    finished: true,
    details: "Vox Obscura requires you to move quickly through a Cabal base, use tanks, and survive waves of enemies.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_VOX",
    chests: [
      { name: "Chest 1", description: "In the tank hangar, behind the crates." }
    ],
    lastCompletions: [
      { date: "2025-07-21", time: "19:30", classe: "Titan", kills: 91, deaths: 4, finished: true }
    ]
  },
  {
    name: "Zero Hour",
    hash: "zerohour",
    image: "https://www.bungie.net/img/destiny_content/pgcr/zerohour.jpg",
    description: "Timed mission in a Braytech complex to recover Outbreak Perfected.",
    completions: 7,
    timeSpent: "4h 55m",
    bestTime: "17:55",
    kills: 76,
    deaths: 2,
    finished: false,
    details: "Zero Hour is a race against the clock with many shortcuts and hidden platforms.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_ZEROHOUR",
    chests: [
      { name: "Secret Chest", description: "In the server room, behind the removable panel." }
    ],
    lastCompletions: [
      { date: "2025-07-22", time: "20:05", classe: "Warlock", kills: 76, deaths: 2, finished: false }
    ]
  },
  {
    name: "Operation: Seraph's Shield",
    hash: "seraphshield",
    image: "https://www.bungie.net/img/destiny_content/pgcr/seraphshield.jpg",
    description: "Board a space station to restore Rasputin and unlock Revision Zero.",
    completions: 12,
    timeSpent: "7h 30m",
    bestTime: "20:30",
    kills: 110,
    deaths: 6,
    finished: true,
    details: "Mission with security puzzles, space combat, and hidden chests in the vents.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_SERAPH",
    chests: [
      { name: "Chest 1", description: "In the vent after the control room." }
    ],
    lastCompletions: [
      { date: "2025-07-20", time: "22:15", classe: "Hunter", kills: 110, deaths: 6, finished: true }
    ]
  },
  {
    name: "//node.ovrd.AVALON//",
    hash: "avalon",
    image: "https://www.bungie.net/img/destiny_content/pgcr/avalon.jpg",
    description: "Dive into a corrupted Vex network to obtain Vexcalibur.",
    completions: 9,
    timeSpent: "5h 50m",
    bestTime: "21:05",
    kills: 95,
    deaths: 3,
    finished: true,
    details: "Avalon features platforming puzzles and fights against elite Vex.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_AVALON",
    chests: [
      { name: "Chest 1", description: "In the matrix area, jump onto the hidden platform on the right." }
    ],
    lastCompletions: [
      { date: "2025-07-18", time: "16:40", classe: "Titan", kills: 95, deaths: 3, finished: true }
    ]
  },
  {
    name: "Kell's Fall",
    hash: "kellsfall",
    image: "https://www.bungie.net/img/destiny_content/pgcr/kellsfall.jpg",
    description: "Mission with illusions and Eliksni lore, exotic reward linked to Mithrax.",
    completions: 6,
    timeSpent: "4h 20m",
    bestTime: "18:20",
    kills: 68,
    deaths: 1,
    finished: false,
    details: "Kell's Fall features illusion rooms and hidden chests behind illusory walls.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_KELL",
    chests: [
      { name: "Chest 1", description: "Behind the illusory wall after the second boss." }
    ],
    lastCompletions: [
      { date: "2025-07-19", time: "17:55", classe: "Warlock", kills: 68, deaths: 1, finished: false }
    ]
  },
  {
    name: "Starcrossed",
    hash: "starcrossed",
    image: "https://www.bungie.net/img/destiny_content/pgcr/starcrossed.jpg",
    description: "Face celestial anomalies and Void threats for an exotic weapon.",
    completions: 8,
    timeSpent: "5h 10m",
    bestTime: "21:05",
    kills: 95,
    deaths: 3,
    finished: true,
    details: "Starcrossed features altered gravity phases and hidden chests in high places.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_STAR",
    chests: [
      { name: "Chest 1", description: "On the highest platform after the final boss." }
    ],
    lastCompletions: [
      { date: "2025-07-18", time: "16:40", classe: "Titan", kills: 95, deaths: 3, finished: true }
    ]
  },
  {
    name: "The Whisper",
    hash: "whisper",
    image: "https://www.bungie.net/img/destiny_content/pgcr/thewhisper.jpg",
    description: "Timed mission in a Taken rift to obtain Whisper of the Worm.",
    completions: 11,
    timeSpent: "7h 05m",
    bestTime: "16:50",
    kills: 120,
    deaths: 7,
    finished: true,
    details: "The Whisper is a platforming and time puzzle mission with hidden chests in secret alcoves.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_WHISPER",
    chests: [
      { name: "Chest 1", description: "In the hidden alcove after the void jump." }
    ],
    lastCompletions: [
      { date: "2025-07-17", time: "20:20", classe: "Hunter", kills: 120, deaths: 7, finished: true }
    ]
  },
  {
    name: "Presage",
    hash: "presage",
    image: "https://www.bungie.net/img/destiny_content/pgcr/presage.jpg",
    description: "Mission aboard a haunted ship, standard and expert variants.",
    completions: 9,
    timeSpent: "6h 00m",
    bestTime: "19:10",
    kills: 82,
    deaths: 2,
    finished: true,
    details: "Presage features pipe puzzles and hidden chests in the vents.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_PRESAGE",
    chests: [
      { name: "Chest 1", description: "In the vent after the spore room." }
    ],
    lastCompletions: [
      { date: "2025-07-16", time: "21:50", classe: "Warlock", kills: 82, deaths: 2, finished: true }
    ]
  },
  {
    name: "Exotic Quest: Presage",
    hash: "exoticquestpresage",
    image: "https://www.bungie.net/img/destiny_content/pgcr/presage.jpg",
    description: "Explore a Cabal ship to unlock Dead Man’s Tale.",
    completions: 5,
    timeSpent: "3h 40m",
    bestTime: "22:00",
    kills: 77,
    deaths: 4,
    finished: false,
    details: "Hard variant of Presage with elite enemies and hidden chests in locked rooms.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_EXOTICPRESAGE",
    chests: [
      { name: "Chest 1", description: "In the locked room after the final boss." }
    ],
    lastCompletions: [
      { date: "2025-07-15", time: "19:05", classe: "Titan", kills: 77, deaths: 4, finished: false }
    ]
  },
  {
    name: "Exotic mission 'Derealize'",
    hash: "derealize",
    image: "https://www.bungie.net/img/destiny_content/pgcr/derealize.jpg",
    description: "Mysterious mission about perception and reality.",
    completions: 3,
    timeSpent: "2h 10m",
    bestTime: "22:15",
    kills: 50,
    deaths: 1,
    finished: true,
    details: "Derealize features perception puzzles and hidden chests in phased zones.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_DEREALIZE",
    chests: [
      { name: "Chest 1", description: "In the phased zone after the main puzzle." }
    ],
    lastCompletions: [
      { date: "2025-07-14", time: "18:00", classe: "Hunter", kills: 50, deaths: 1, finished: true }
    ]
  },
  {
    name: "Grandmaster Conquest",
    hash: "gmconquest",
    image: "https://www.bungie.net/img/destiny_content/pgcr/gmconquest.jpg",
    description: "Very high difficulty conquest mission.",
    completions: 2,
    timeSpent: "1h 30m",
    bestTime: "45:00",
    kills: 30,
    deaths: 8,
    finished: false,
    details: "Grandmaster Conquest features enemy waves and hidden chests in the arenas.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_GMCONQUEST",
    chests: [
      { name: "Chest 1", description: "In the final arena, behind the central column." }
    ],
    lastCompletions: [
      { date: "2025-07-13", time: "17:30", classe: "Warlock", kills: 30, deaths: 8, finished: false }
    ]
  },
  {
    name: "Harbinger",
    hash: "harbinger",
    image: "https://www.bungie.net/img/destiny_content/pgcr/harbinger.jpg",
    description: "Climb a haunted cliff to obtain Hawkmoon.",
    completions: 4,
    timeSpent: "2h 50m",
    bestTime: "19:05",
    kills: 60,
    deaths: 2,
    finished: true,
    details: "Harbinger features platforming phases and hidden chests in side caves.",
    youtube: "https://www.youtube.com/watch?v=VOTRE_TUTO_HARBINGER",
    chests: [
      { name: "Chest 1", description: "In the left cave after the first jump." }
    ],
    lastCompletions: [
      { date: "2025-07-12", time: "16:10", classe: "Titan", kills: 60, deaths: 2, finished: true }
    ]
  }
];

export default function MissionDetails() {
  const { hash } = useParams();
  const mission = exoticMissions.find((m) => m.hash === hash);

  if (!mission) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Unknown mission</h1>
        <Link to="/missions" className="text-yellow-500 underline">Back to missions</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/missions" className="text-yellow-500 underline mb-4 inline-block">← Back to missions</Link>
      <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-8 flex flex-col items-center mb-8">
        <img src={mission.image} alt={mission.name} className="w-full max-w-md rounded-xl mb-6 shadow-lg" />
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{mission.name}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{mission.description}</p>
        {/* Details */}
        {mission.details && (
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 text-gray-700 dark:text-gray-200">
            <h3 className="font-bold mb-2 text-lg text-gray-900 dark:text-white">Mission details</h3>
            <p>{mission.details}</p>
          </div>
        )}
        {/* YouTube Tutorial */}
        {mission.youtube && (
          <div className="w-full mb-4">
            <h3 className="font-bold mb-2 text-lg text-gray-900 dark:text-white">Tutorial video</h3>
            <div className="aspect-w-16 aspect-h-9 w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={mission.youtube.replace("watch?v=", "embed/")}
                title={`Tutorial ${mission.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 md:h-96"
              ></iframe>
            </div>
          </div>
        )}
        {/* Hidden Chests */}
        {mission.chests && mission.chests.length > 0 && (
          <div className="w-full mb-4">
            <h3 className="font-bold mb-2 text-lg text-gray-900 dark:text-white">Hidden chests</h3>
            <ul className="list-disc pl-6 space-y-1">
              {mission.chests.map((chest, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-200"><span className="font-semibold">{chest.name}:</span> {chest.description}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Stats */}
        <div className="flex flex-wrap gap-6 justify-center w-full mb-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">Completions</span>
            <span className="text-lg font-bold text-green-500">{mission.completions}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">Total time</span>
            <span className="text-lg font-bold text-yellow-500">{mission.timeSpent}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">Best time</span>
            <span className="text-lg font-bold text-blue-400">{mission.bestTime}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 justify-center w-full mb-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">Kills</span>
            <span className="text-lg font-bold text-red-400">{mission.kills}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">Deaths</span>
            <span className="text-lg font-bold text-red-500">{mission.deaths}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">Finished</span>
            <span className={mission.finished ? "text-green-500 font-bold" : "text-red-500 font-bold"}>{mission.finished ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Recent completions</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {mission.lastCompletions.map((item, idx) => (
            <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-2 md:gap-0">
              <div className="flex items-center gap-3 min-w-[180px]">
                <img src={`/images/${item.classe.toLowerCase()}.png`} alt={item.classe} className="w-7 h-7 rounded-full border-2 border-yellow-400 shadow" />
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.date} {item.time}</span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({item.classe})</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 items-center justify-start md:justify-end">
                <span><i className="fa-solid fa-skull-crossbones mr-1 text-red-400"></i>Kills: <span className="font-semibold text-gray-900 dark:text-white">{item.kills}</span></span>
                <span><i className="fa-solid fa-heart-crack mr-1 text-red-500"></i>Deaths: <span className="font-semibold text-gray-900 dark:text-white">{item.deaths}</span></span>
                <span>
                  {item.finished ? (
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full"><i className="fa-solid fa-check mr-1"></i> Finished</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full"><i className="fa-solid fa-xmark mr-1"></i> Not finished</span>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

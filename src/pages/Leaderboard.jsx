import { useState } from "react";

// Exemple de missions fictives
const missions = [
  "Dual Destiny",
  "Encore",
  "Vox Obscura",
  "Zero Hour",
];

// Ajoutez un score par mission pour chaque joueur
const players = [
  {
    name: "Shaxx#1234",
    class: "Titan",
    avatar: "/images/titan.png",
    emblem: "/images/emblem.png",
    scores: {
      "Dual Destiny": 50,
      "Encore": 30,
      "Vox Obscura": 28,
      "Zero Hour": 20,
    },
  },
  {
    name: "Ikora#5678",
    class: "Warlock",
    avatar: "/images/warlock.png",
    emblem: "/images/emblem.png",
    scores: {
      "Dual Destiny": 40,
      "Encore": 40,
      "Vox Obscura": 20,
      "Zero Hour": 20,
    },
  },
  {
    name: "Cayde#9999",
    class: "Hunter",
    avatar: "/images/hunter.png",
    emblem: "/images/emblem.png",
    scores: {
      "Dual Destiny": 30,
      "Encore": 30,
      "Vox Obscura": 30,
      "Zero Hour": 20,
    },
  },
  {
    name: "Drifter#7777",
    class: "Hunter",
    avatar: "/images/hunter.png",
    emblem: "/images/emblem.png",
    scores: {
      "Dual Destiny": 20,
      "Encore": 25,
      "Vox Obscura": 25,
      "Zero Hour": 25,
    },
  },
  {
    name: "Saint#14",
    class: "Titan",
    avatar: "/images/titan.png",
    emblem: "/images/emblem.png",
    scores: {
      "Dual Destiny": 10,
      "Encore": 20,
      "Vox Obscura": 30,
      "Zero Hour": 30,
    },
    }
];

const medals = [
  <i className="fa-solid fa-crown text-yellow-400 text-xl" title="1st" key="gold"></i>,
  <i className="fa-solid fa-medal text-gray-300 text-xl" title="2nd" key="silver"></i>,
  <i className="fa-solid fa-medal text-orange-700 text-xl" title="3rd" key="bronze"></i>,
];



export default function Leaderboard() {
  const [filter, setFilter] = useState("All");
  const [mission, setMission] = useState(missions[0]);

  const classOptions = [
    { label: "All", value: "All" },
    { label: <span className="flex items-center gap-1"><img src="/images/titan.png" alt="Titan" className="w-5 h-5" /> Titan</span>, value: "Titan" },
    { label: <span className="flex items-center gap-1"><img src="/images/hunter.png" alt="Hunter" className="w-5 h-5" /> Hunter</span>, value: "Hunter" },
    { label: <span className="flex items-center gap-1"><img src="/images/warlock.png" alt="Warlock" className="w-5 h-5" /> Warlock</span>, value: "Warlock" },
  ];

  // Score pour la mission sélectionnée
  const filteredPlayers = filter === "All"
    ? players.slice().sort((a, b) => b.scores[mission] - a.scores[mission])
    : players.filter(p => p.class === filter).sort((a, b) => b.scores[mission] - a.scores[mission]);

  return (
    <div className="flex flex-col items-center w-full bg-white dark:bg-[#181926] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Leaderboard</h1>
      <div className="flex gap-2 mb-6 flex-wrap justify-center w-full max-w-3xl">
        {classOptions.map(opt => (
          <button
            key={typeof opt.label === 'string' ? opt.label : opt.value}
            className={`px-4 py-2 rounded-lg border border-gray-700 text-sm flex items-center gap-2 transition ${filter === opt.value ? 'bg-yellow-400 text-black font-bold' : 'bg-[#23243a] text-gray-300 hover:bg-[#181926]'}`}
            onClick={() => setFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
        <select
          className="ml-4 px-3 py-2 rounded-lg border border-gray-700 bg-[#23243a] text-gray-200 text-sm outline-none"
          value={mission}
          onChange={e => setMission(e.target.value)}
        >
          {missions.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto w-full flex justify-center">
        <table className="w-full max-w-3xl bg-gray-100 dark:bg-[#23243a] rounded-2xl shadow-lg mx-auto text-center">
          <thead>
            <tr className="text-gray-700 dark:text-gray-400 text-sm">
              <th className="py-3 px-4 text-center">#</th>
              <th className="py-3 px-4 text-center">Player</th>
              <th className="py-3 px-4 text-center">Class</th>
              <th className="py-3 px-4 text-center">Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player, idx) => (
              <tr key={player.name} className={"border-b border-[#181926] hover:bg-[#181926]/60 transition"}>
                <td className="py-3 px-4 font-bold text-lg text-center align-middle">
                  {idx < 3 ? medals[idx] : idx + 1}
                </td>
                <td className="py-3 px-4 text-center align-middle">
                  <div className="flex items-center gap-3 justify-center">
                    <img src={player.emblem} alt="emblem" className="w-8 h-8 rounded-full border-2 border-yellow-400 shadow" />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{player.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center align-middle">
                  <div className="flex items-center gap-2 justify-center">
                    <img src={player.avatar} alt={player.class} className="w-6 h-6" />
                    <span className="text-gray-800 dark:text-gray-300 text-sm">{player.class}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-green-400 text-lg text-center align-middle">{player.scores[mission]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

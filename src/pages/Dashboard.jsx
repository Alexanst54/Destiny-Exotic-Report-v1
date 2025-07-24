import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from "recharts";
import BungieProfile from '../components/BungieProfile';
import BungieActivities from '../components/BungieActivities';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Dashboard() {
  // Données fictives par classe
  const classData = [
    { name: "Titan", completions: 14 },
    { name: "Hunter", completions: 21 },
    { name: "Warlock", completions: 10 },
  ];

  // Données fictives pour la courbe (complétions par année)
  const lineData = [
    { year: 2018, completions: 2 },
    { year: 2019, completions: 4 },
    { year: 2020, completions: 5 },
    { year: 2021, completions: 3 },
    { year: 2022, completions: 18 },
    { year: 2023, completions: 40 },
    { year: 2024, completions: 27 },
    { year: 2025, completions: 30 },
  ];

  const [accessToken, setAccessToken] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  // Récupère l'URL du backend depuis la variable d'environnement
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      axios.get(`${apiUrl}/auth/callback?code=${code}`)
        .then(res => {
          setAccessToken(res.data.access_token);
          setAuthMessage("Connexion Bungie réussie !");
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(() => setAuthMessage("Erreur lors de l'authentification Bungie."));
    }
  }, [apiUrl]);

  return (
    <>
      {/* Header / Login Section */}
      <div className="w-full max-w-none grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-8 flex flex-col justify-center items-start">
          <h2 className="text-lg tracking-widest text-gray-700 dark:text-gray-400 mb-2">DESTINY 2</h2>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Exotic Mission Tracker</h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300">Track your progress in Destiny 2 exotic missions.</p>
          {!accessToken ? (
            <button
              onClick={() => window.location.href = `${apiUrl}/auth/login`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Se connecter avec Bungie.net
            </button>
          ) : (
            <div className="text-green-500 font-semibold mb-2">{authMessage}</div>
          )}
        </div>
        {/* Profile Section */}
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <BungieProfile accessToken={accessToken} />
        </div>
      </div>

      {/* Dernières complétions */}
      <div className="w-full max-w-none bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Dernières complétions</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {[
            { mission: "Dual Destiny", date: "2025-07-24", classe: "Titan", heure: "18:42", temps: "22:15", kills: 87, morts: 3, fini: true },
            { mission: "Encore", date: "2025-07-23", classe: "Hunter", heure: "21:10", temps: "19:40", kills: 102, morts: 5, fini: true },
            { mission: "Zero Hour", date: "2025-07-22", classe: "Warlock", heure: "20:05", temps: "17:55", kills: 76, morts: 2, fini: false },
            { mission: "Vox Obscura", date: "2025-07-21", classe: "Titan", heure: "19:30", temps: "23:10", kills: 91, morts: 4, fini: true },
            { mission: "Operation: Seraph's Shield", date: "2025-07-20", classe: "Hunter", heure: "22:15", temps: "20:30", kills: 110, morts: 6, fini: true },
            { mission: "Kell's Fall", date: "2025-07-19", classe: "Warlock", heure: "17:55", temps: "18:20", kills: 68, morts: 1, fini: false },
            { mission: "Starcrossed", date: "2025-07-18", classe: "Titan", heure: "16:40", temps: "21:05", kills: 95, morts: 3, fini: true },
            { mission: "The Whisper", date: "2025-07-17", classe: "Hunter", heure: "20:20", temps: "16:50", kills: 120, morts: 7, fini: true },
            { mission: "Presage", date: "2025-07-16", classe: "Warlock", heure: "21:50", temps: "19:10", kills: 82, morts: 2, fini: true },
            { mission: "Harbinger", date: "2025-07-15", classe: "Titan", heure: "19:05", temps: "22:00", kills: 77, morts: 4, fini: false },
          ].map((item, idx) => (
            <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-2 md:gap-0">
              <div className="flex items-center gap-3 min-w-[180px]">
                <img src={`/images/${item.classe.toLowerCase()}.png`} alt={item.classe} className="w-7 h-7 rounded-full border-2 border-yellow-400 shadow" />
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.mission}</span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({item.classe})</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 items-center justify-start md:justify-end">
                <span><i className="fa-regular fa-calendar mr-1"></i>{item.date} {item.heure}</span>
                <span><i className="fa-solid fa-stopwatch mr-1 text-yellow-400"></i>Temps: <span className="font-semibold text-gray-900 dark:text-white">{item.temps}</span></span>
                <span><i className="fa-solid fa-skull-crossbones mr-1 text-red-400"></i>Kills: <span className="font-semibold text-gray-900 dark:text-white">{item.kills}</span></span>
                <span><i className="fa-solid fa-heart-crack mr-1 text-red-500"></i>Morts: <span className="font-semibold text-gray-900 dark:text-white">{item.morts}</span></span>
                <span>
                  {item.fini ? (
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full"><i className="fa-solid fa-check mr-1"></i> Fini</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full"><i className="fa-solid fa-xmark mr-1"></i> Non fini</span>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Stats & Charts Section */}
      <div className="w-full max-w-none grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1 flex items-center gap-2"><i className="fa-solid fa-clock text-yellow-400"></i> TIME SPENT</span>
          <span className="text-2xl font-bold">36h 17m</span>
        </div>
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1 flex items-center gap-2"><i className="fa-solid fa-face-dizzy text-red-500"></i> DEATHS</span>
          <span className="text-2xl font-bold">128</span>
        </div>
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1 flex items-center gap-2"><i className="fa-solid fa-trophy text-green-400"></i> COMPLETIONS</span>
          <span className="text-2xl font-bold">45</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="w-full max-w-none grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
          <span className="text-gray-400 mb-2">Completions by Class</span>
          <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#23243a" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#23243a', border: 'none', color: '#fff' }} />
                <Bar dataKey="completions" fill="#facc15" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
          <span className="text-gray-400 mb-2">Completions by Year</span>
          <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#23243a" />
                <XAxis dataKey="year" stroke="#aaa" allowDecimals={false} />
                <YAxis stroke="#aaa" allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#23243a', border: 'none', color: '#fff' }} />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="completions" stroke="#facc15" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} name="Completions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <BungieProfile accessToken={accessToken} />
    </>
  );
}

function BungieProfile({ accessToken }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => setProfile(res.data))
      .catch(err => setError(err.response?.data?.error || 'Erreur'));
  }, [accessToken]);

  if (error) return <div>Erreur : {error}</div>;
  if (!profile) return <div>Chargement du profil...</div>;

  return (
    <div className="p-4 border rounded bg-gray-100 flex flex-col items-center">
      {/* Emblème du joueur */}
      {(profile.emblemPath || profile.iconPath) && (
        <img
          src={`https://www.bungie.net${profile.emblemPath || profile.iconPath}`}
          alt="Emblème du joueur"
          className="w-20 h-20 rounded-full mb-2 border-4 border-yellow-400 shadow"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{profile.displayName}</h2>
      <div>Plateforme : {profile.platform}</div>
      <div>Clan : {profile.clanName || 'Aucun'}</div>
      <div>Niveau de saison : {profile.seasonLevel ?? 'N/A'}</div>
    </div>
  );
}

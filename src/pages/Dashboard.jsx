  // Debug visuel : nombre d'activités récupérées et filtrées
  const [allActivitiesCount, setAllActivitiesCount] = useState(0);
  const [allActivitiesRaw, setAllActivitiesRaw] = useState([]);
  useEffect(() => {
    if (!accessToken || !exoticHashes.size) return;
    axios
      .get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => {
        setAllActivitiesCount((res.data.activities || []).length);
        setAllActivitiesRaw(res.data.activities || []);
      });
  }, [accessToken, exoticHashes]);
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Pour filtrer les exotiques

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from "recharts";

import BungieProfile from '../components/BungieProfile';
import BungieActivities from '../components/BungieActivities';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


export default function Dashboard() {
  // Données dynamiques pour les graphiques
  const [classData, setClassData] = useState([
    { name: "Titan", completions: 0 },
    { name: "Hunter", completions: 0 },
    { name: "Warlock", completions: 0 },
  ]);
  const [lineData, setLineData] = useState([]);

  const [accessToken, setAccessToken] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  // Debug visuel : nombre d'activités récupérées et filtrées
  const [allActivitiesCount, setAllActivitiesCount] = useState(0);
  const [allActivitiesRaw, setAllActivitiesRaw] = useState([]);

  // Récupère l'URL du backend depuis la variable d'environnement
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (!accessToken || !exoticHashes?.size) return;
    axios
      .get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => {
        setAllActivitiesCount((res.data.activities || []).length);
        setAllActivitiesRaw(res.data.activities || []);
      });
  }, [accessToken, exoticHashes]);

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


  // Récupérer les 10 dernières complétions réelles via l'API si connecté
  const [realCompletions, setRealCompletions] = useState([]);
  const [completionsError, setCompletionsError] = useState("");

  const [exoticHashes, setExoticHashes] = useState(new Set());
  useEffect(() => {
    fetch('/api/exotic-activities')
      .then(res => res.json())
      .then(data => {
        const hashes = new Set((data.activities || []).map(a => String(a.referenceId)));
        setExoticHashes(hashes);
      });
  }, []);

  useEffect(() => {
    if (!accessToken || !exoticHashes.size) return;
    axios
      .get(`${API_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => {
        const all = res.data.activities || [];
        const filtered = all.filter(act => exoticHashes.has(String(act.activityDetails?.referenceId)));
        setRealCompletions(filtered);

        // Calcul des complétions par classe
        const classCounts = { Titan: 0, Hunter: 0, Warlock: 0 };
        filtered.forEach(act => {
          const classType = act.values?.playerClass?.basic?.displayValue || act.playerClass || "Unknown";
          if (classType in classCounts) classCounts[classType]++;
        });
        setClassData([
          { name: "Titan", completions: classCounts.Titan },
          { name: "Hunter", completions: classCounts.Hunter },
          { name: "Warlock", completions: classCounts.Warlock },
        ]);

        // Calcul des complétions par année
        const yearCounts = {};
        filtered.forEach(act => {
          const date = act.period ? new Date(act.period) : null;
          if (date) {
            const year = date.getFullYear();
            yearCounts[year] = (yearCounts[year] || 0) + 1;
          }
        });
        // Générer un tableau trié par année
        const years = Object.keys(yearCounts).sort();
        setLineData(years.map(year => ({ year: Number(year), completions: yearCounts[year] })));
      })
      .catch(err => setCompletionsError(err.response?.data?.error || 'Erreur lors de la récupération des complétions'));
  }, [accessToken, exoticHashes]);

  // Calcul des stats globales dynamiques
  const totalTimeSeconds = realCompletions.reduce((sum, act) => sum + (act.values?.timePlayedSeconds?.basic?.value || 0), 0);
  const totalDeaths = realCompletions.reduce((sum, act) => sum + (act.values?.deaths?.basic?.value || 0), 0);
  const totalCompletions = realCompletions.reduce((sum, act) => sum + (act.values?.completed?.basic?.value ? 1 : 0), 0);

  // Formatage du temps total en h min
  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  }

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

      {/* Debug: nombre d'activités récupérées et filtrées */}
      {accessToken && (
        <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
          <b>Debug:</b> Activités totales récupérées: {allActivitiesCount} | Exotiques filtrées: {realCompletions.length}
          {realCompletions.length === 0 && allActivitiesCount > 0 && allActivitiesRaw.length > 0 && (
            <>
              <br/>Exemple activité brute:<br/>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded max-w-xl overflow-x-auto text-xs">
                {JSON.stringify(allActivitiesRaw[0], null, 2)}
              </pre>
            </>
          )}
        </div>
      )}

      {/* Dernières complétions (API) */}
      <div className="w-full max-w-none bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Dernières complétions</h3>
        {completionsError && <div className="text-red-500 mb-2">{completionsError}</div>}
        {!accessToken && <div className="text-gray-400">Connectez-vous pour voir vos dernières complétions.</div>}
        {accessToken && !realCompletions.length && !completionsError && (
          <div className="text-gray-400">
            Aucun historique de complétion exotique trouvé.<br />
            <span className="text-xs">(Jouez ou rejouez une mission exotique pour la voir ici)</span>
            <br/>
            <span className="text-xs text-red-400">Debug: Vérifiez le bloc debug ci-dessus pour le contenu des activités récupérées.</span>
          </div>
        )}
        {accessToken && realCompletions.length > 0 && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {realCompletions.map((act, idx) => (
              <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-2 md:gap-0">
                <div className="flex items-center gap-3 min-w-[180px]">
                  <img src={`/images/unknown.png`} alt="Classe" className="w-7 h-7 rounded-full border-2 border-yellow-400 shadow" />
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">{act.activityName || act.activityDetails?.referenceId || 'Mission inconnue'}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 items-center justify-start md:justify-end">
                  <span><i className="fa-regular fa-calendar mr-1"></i>{act.period}</span>
                  <span><i className="fa-solid fa-skull-crossbones mr-1 text-red-400"></i>Kills: <span className="font-semibold text-gray-900 dark:text-white">{act.values?.kills?.basic?.value ?? '-'}</span></span>
                  <span><i className="fa-solid fa-heart-crack mr-1 text-red-500"></i>Morts: <span className="font-semibold text-gray-900 dark:text-white">{act.values?.deaths?.basic?.value ?? '-'}</span></span>
                  <span>
                    {act.values?.completed?.basic?.value ? (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full"><i className="fa-solid fa-check mr-1"></i> Fini</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full"><i className="fa-solid fa-xmark mr-1"></i> Non fini</span>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Stats & Charts Section */}
      <div className="w-full max-w-none grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1 flex items-center gap-2"><i className="fa-solid fa-clock text-yellow-400"></i> TIME SPENT</span>
          <span className="text-2xl font-bold">{accessToken ? formatTime(totalTimeSeconds) : '--'}</span>
        </div>
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1 flex items-center gap-2"><i className="fa-solid fa-face-dizzy text-red-500"></i> DEATHS</span>
          <span className="text-2xl font-bold">{accessToken ? totalDeaths : '--'}</span>
        </div>
        <div className="bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1 flex items-center gap-2"><i className="fa-solid fa-trophy text-green-400"></i> COMPLETIONS</span>
          <span className="text-2xl font-bold">{accessToken ? totalCompletions : '--'}</span>
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

// ...existing code...

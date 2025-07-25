
import React, { useEffect, useState } from "react";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Leaderboard() {
  const [accessToken, setAccessToken] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Récupère le token comme sur Dashboard
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      axios.get(`${API_URL}/auth/callback?code=${code}`)
        .then(res => {
          setAccessToken(res.data.access_token);
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(() => setError("Erreur lors de l'authentification Bungie."));
    }
  }, []);

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
    axios.get(`${API_URL}/api/activities`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => {
        const all = res.data.activities || [];
        const filtered = all.filter(act => exoticHashes.has(String(act.activityDetails?.referenceId)));
        setActivities(filtered);
      })
      .catch(err => setError(err.response?.data?.error || 'Erreur lors de la récupération des activités'));
  }, [accessToken, exoticHashes]);

  return (
    <div className="flex flex-col items-center w-full bg-white dark:bg-[#181926] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Leaderboard - Tentatives & complétions exotiques</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!accessToken && <div className="text-gray-400">Connectez-vous pour voir vos tentatives exotiques.</div>}
      {accessToken && (
        <div className="overflow-x-auto w-full flex justify-center">
          <table className="w-full max-w-5xl bg-gray-100 dark:bg-[#23243a] rounded-2xl shadow-lg mx-auto text-center">
            <thead>
              <tr className="text-gray-700 dark:text-gray-400 text-sm">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Mission</th>
                <th className="py-3 px-4">Temps (min)</th>
                <th className="py-3 px-4">Kills</th>
                <th className="py-3 px-4">Morts</th>
                <th className="py-3 px-4">Escouade</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act, idx) => (
                <tr key={idx} className="border-b border-[#181926] hover:bg-[#181926]/60 transition">
                  <td className="py-3 px-4">{act.period ? new Date(act.period).toLocaleString() : '-'}</td>
                  <td className="py-3 px-4">{act.activityName || act.activityDetails?.referenceId || '-'}</td>
                  <td className="py-3 px-4">{Math.round((act.values?.timePlayedSeconds?.basic?.value || 0) / 60)}</td>
                  <td className="py-3 px-4">{act.values?.kills?.basic?.value ?? '-'}</td>
                  <td className="py-3 px-4">{act.values?.deaths?.basic?.value ?? '-'}</td>
                  <td className="py-3 px-4">{act.entries ? act.entries.map(e => e.player?.destinyUserInfo?.displayName).join(', ') : '-'}</td>
                  <td className="py-3 px-4">
                    {/* Badge flawless */}
                    {act.values?.deaths?.basic?.value === 0 && (
                      <span className="inline-flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full mr-1" title="Flawless">
                        <i className="fa-solid fa-star mr-1"></i> Flawless
                      </span>
                    )}
                    {/* Badge solo */}
                    {act.entries && act.entries.length === 1 && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full mr-1" title="Solo">
                        <i className="fa-solid fa-user mr-1"></i> Solo
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {act.values?.completed?.basic?.value ? (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full"><i className="fa-solid fa-check mr-1"></i> Fini</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full"><i className="fa-solid fa-xmark mr-1"></i> Non fini</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

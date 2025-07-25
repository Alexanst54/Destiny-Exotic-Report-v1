import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Missions from "./pages/Missions";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import MissionDetails from "./pages/MissionDetails";

import { useEffect } from "react";

function useExoticActivities() {
  const [exoticActivities, setExoticActivities] = useState([]);
  useEffect(() => {
    fetch("/api/exotic-activities")
      .then(res => res.json())
      .then(data => {
        // On suppose que le backend retourne un tableau [{ name, pgcrImage, variants: [{ name, hash }] }]
        setExoticActivities(
          (Array.isArray(data) ? data : data.activities || []).map(act => ({
            name: act.name,
            image: act.pgcrImage,
            variants: act.variants || [{ name: act.name, hash: act.referenceId }],
          }))
        );
      });
  }, []);
  return exoticActivities;
}

import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const exoticActivities = useExoticActivities();
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      {/* ...existing code... */}
            <main className="flex-1 w-full max-w-none p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/missions" element={<Missions exoticActivities={exoticActivities} />} />
                <Route path="/missions/:hash" element={<MissionDetails />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
      {/* ...existing code... */}
    </Router>
  );
}

export default App;

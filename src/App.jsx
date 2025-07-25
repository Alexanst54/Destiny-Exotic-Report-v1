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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#23243a] to-[#181926] text-white font-sans w-full min-w-0">
        <div className="w-full flex-1 flex flex-col">
          {/* Hamburger mobile */}
          <button
            className="md:hidden fixed top-4 left-4 z-40 bg-[#181926] border border-[#23243a] rounded-lg p-2 shadow-lg"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex flex-1 justify-start w-full">
            {/* Sidebar desktop */}
            <aside className="hidden md:flex flex-col w-56 bg-[#181926] border-r border-[#23243a] min-h-screen py-8 px-4 gap-4">
              <h2 className="text-xl font-bold mb-8 tracking-widest text-yellow-500">D2 Tracker</h2>
              <nav className="flex flex-col gap-2">
                <Link to="/" className="py-2 px-4 rounded-lg hover:bg-[#23243a] transition font-medium">Dashboard</Link>
                <Link to="/missions" className="py-2 px-4 rounded-lg hover:bg-[#23243a] transition font-medium">Missions</Link>
                <Link to="/leaderboard" className="py-2 px-4 rounded-lg hover:bg-[#23243a] transition font-medium">Leaderboard</Link>
                <Link to="/settings" className="py-2 px-4 rounded-lg hover:bg-[#23243a] transition font-medium">Settings</Link>
              </nav>
              <div className="mt-auto text-xs text-gray-500 px-2">v1.0.0</div>
            </aside>
            {/* Sidebar mobile overlay */}
            {menuOpen && (
              <div className="fixed inset-0 z-50 flex">
                <div className="absolute inset-0 bg-black bg-opacity-60" onClick={closeMenu}></div>
                <aside className="relative z-50 flex flex-col w-64 bg-[#181926] border-r border-[#23243a] min-h-screen py-8 px-4 gap-4 animate-slide-in-left">
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Fermer le menu" onClick={closeMenu}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <h2 className="text-xl font-bold mb-8 tracking-widest text-yellow-500">D2 Tracker</h2>
                  <nav className="flex flex-col gap-2">
                    <Link to="/" className="py-2 px-4 rounded-lg hover:bg-[#23243a] transition font-medium" onClick={closeMenu}>Dashboard</Link>
                    <Link to="/missions" className="py-2 px-4 rounded-lg hover:bg-[#23243a] transition font-medium" onClick={closeMenu}>Missions</Link>
                    <Link to="/leaderboard" className="py-2 px-4 rounded-lg hover:bg-[#23243a] transition font-medium" onClick={closeMenu}>Leaderboard</Link>
                    <Link to="/settings" className="py-2 px-4 rounded-lg hover:bg-[#23243a] transition font-medium" onClick={closeMenu}>Settings</Link>
                  </nav>
                  <div className="mt-auto text-xs text-gray-500 px-2">v1.0.0</div>
                </aside>
              </div>
            )}
            <main className="flex-1 w-full max-w-none p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/missions" element={<Missions exoticActivities={exoticActivities} />} />
                <Route path="/missions/:hash" element={<MissionDetails />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
        <footer className="w-full bg-[#181926] border-t border-[#23243a] py-4 text-center text-sm text-gray-400 mt-8">
          Destiny 2 Exotic Mission Tracker &copy; {new Date().getFullYear()} — Design inspired by Bungie & Destiny 2. Not affiliated.
        </footer>
      </div>
    </Router>
  );
}

export default App;

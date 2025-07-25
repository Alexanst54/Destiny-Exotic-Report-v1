import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Missions from "./pages/Missions";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import MissionDetails from "./pages/MissionDetails";
const exoticActivities = [
    { name: "Dual Destiny", image: "https://www.bungie.net/img/destiny_content/pgcr/dualdestiny.jpg", variants: [ { name: "Standard", hash: -2132841886 } ] },
    { name: "Encore", image: "https://www.bungie.net/img/destiny_content/pgcr/encore.jpg", variants: [
        { name: "Expert", hash: 655052177 },
        { name: "Overture (Expert)", hash: -1932104431 },
        { name: "Concerto (Expert)", hash: -1932104430 },
        { name: "Coda (Expert)", hash: -1553027841 },
        { name: "Standard", hash: 1550266704 },
        { name: "Customize", hash: -1174422607 },
        { name: "Concerto: Standard", hash: -752855492 },
        { name: "Coda: Standard", hash: -752855491 },
        { name: "Overture: Standard", hash: -752855489 }
    ] },
    { name: "Vox Obscura", image: "https://www.bungie.net/img/destiny_content/pgcr/voxobscura.jpg", variants: [
        { name: "Standard", hash: -1626230148 },
        { name: "Master", hash: 613120446 },
        { name: "Expert", hash: 666172264 },
        { name: "Normal", hash: 901429423 }
    ] },
    { name: "Zero Hour", image: "https://www.bungie.net/img/destiny_content/pgcr/zerohour.jpg", variants: [
        { name: "Heroic", hash: -1563758630 },
        { name: "Standard", hash: -933221025 },
        { name: "Expert", hash: 1848771417 }
    ] },
    { name: "Operation: Seraph's Shield", image: "https://www.bungie.net/img/destiny_content/pgcr/seraphshield.jpg", variants: [
        { name: "Expert", hash: -1375158087 },
        { name: "Normal", hash: 202306511 },
        { name: "Legend", hash: 995051012 },
        { name: "Standard", hash: 1221538367 }
    ] },
    { name: "//node.ovrd.AVALON//", image: "https://www.bungie.net/img/destiny_content/pgcr/avalon.jpg", variants: [
        { name: "Legend", hash: -1211705630 },
        { name: "Standard", hash: 509188661 },
        { name: "Legendary", hash: -343395313 }
    ] },
    { name: "Kell's Fall", image: "https://www.bungie.net/img/destiny_content/pgcr/kellsfall.jpg", variants: [
        { name: "Standard", hash: -416696360 },
        { name: "Diffraction", hash: -998179575 },
        { name: "Reflection (Expert)", hash: -847719003 },
        { name: "Expert", hash: 367562924 },
        { name: "Distortion (Expert)", hash: 264074906 },
        { name: "Distortion", hash: 715393254 },
        { name: "Diffraction (Expert)", hash: 1044034163 },
        { name: "Reflection", hash: 1583447699 },
        { name: "Customize", hash: 1948474391 }
    ] },
    { name: "Starcrossed", image: "https://www.bungie.net/img/destiny_content/pgcr/starcrossed.jpg", variants: [
        { name: "Legend", hash: 1013336498 },
        { name: "Standard", hash: 196691221 },
        { name: "Normal", hash: 896748846 },
        { name: "Customize", hash: 1768099736 }
    ] },
    { name: "The Whisper", image: "https://www.bungie.net/img/destiny_content/pgcr/thewhisper.jpg", variants: [
        { name: "Standard", hash: 74501540 },
        { name: "Expert", hash: -423446509 },
        { name: "Customize", hash: 576782083 },
        { name: "Heroic", hash: 1099555105 }
    ] },
    { name: "Presage", image: "https://www.bungie.net/img/destiny_content/pgcr/presage.jpg", variants: [
        { name: "Standard", hash: -411671539 },
        { name: "Expert", hash: -93120625 }
    ] },
    { name: "Exotic Quest: Presage", image: "https://www.bungie.net/img/destiny_content/pgcr/presage.jpg", variants: [
        { name: "Master", hash: -82214018 },
        { name: "Normal", hash: 2124066889 }
    ] },
    { name: "Exotic mission 'Derealize'", image: "https://www.bungie.net/img/destiny_content/pgcr/derealize.jpg", variants: [
        { name: "Standard", hash: 648675065 }
    ] },
    { name: "Grandmaster Conquest", image: "https://www.bungie.net/img/destiny_content/pgcr/gmconquest.jpg", variants: [
        { name: "Whisper: Customize", hash: 1645244833 }
    ] },
    { name: "Harbinger", image: "https://www.bungie.net/img/destiny_content/pgcr/harbinger.jpg", variants: [
        { name: "Standard", hash: 1738383283 }
    ] }
];

import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
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

import { useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("dark");

  // Simule le changement de thème (à adapter selon gestion globale du thème)
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.documentElement.classList.toggle("dark", e.target.value === "dark");
  };

  const handleLogout = () => {
    // À remplacer par la logique réelle de déconnexion
    alert("Déconnexion effectuée !");
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-[#23243a] rounded-2xl shadow-lg p-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">Paramètres</h1>
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2" htmlFor="theme">Thème</label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#181926] text-gray-900 dark:text-gray-200 text-base outline-none"
          >
            <option value="dark">Sombre</option>
            <option value="light">Clair</option>
          </select>
        </div>
        <div className="flex flex-col items-center mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white font-bold px-6 py-2 rounded-lg shadow transition flex items-center gap-2"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}

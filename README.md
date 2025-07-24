# 🛰️ Destiny 2 Exotic Mission Tracker (WIP)

A work-in-progress web application that connects to the [Bungie API](https://bungie-net.github.io/) to display detailed statistics for **Exotic Missions** in Destiny 2. Track your completions, deaths, time spent, and more — all in one place.
<img width="877" height="839" alt="image" src="https://github.com/user-attachments/assets/80c5ae63-7671-40f2-8e3f-f060844bc23a" />

---

## 🚀 Features (Planned)

- 🔐 **Bungie.net OAuth Login**  
  Secure login using your Bungie account.

- 📊 **Exotic Mission Stats**  
  View detailed stats for exotic missions:
  - Number of completions
  - Total time spent
  - Number of deaths
  - Attempts per character

- 📅 **Activity History**  
  Filter and browse past exotic runs by date, mission, or class.

- 📈 **Visual Insights**  
  Graphs and charts to help you analyze your performance.

---

## 🛠️ Tech Stack

- **Frontend**: React.js / TailwindCSS  
- **Backend**: Node.js (Express)  
- **API**: Bungie.net REST API  
- **Auth**: OAuth 2.0 (Bungie)  
- **Database**: MongoDB (optional, for caching and user data)

---

## ⚡ Project Setup (React + Vite)

This project uses [Vite](https://vitejs.dev/) for fast development and HMR, with React and TailwindCSS.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

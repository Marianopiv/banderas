import React from "react";
import moon from "../../assets/moon.png"

const NavBar = ({ darkMode, onToggleDarkMode }) => {
  return (
    <nav className="flex justify-between gap-5 px-8 py-6 bg-white shadow-sm dark:bg-slate-800">
      <div className=""><h3 className="text-sm font-bold">Where in the world</h3></div>
      <button type="button" aria-label="Dark Mode" aria-pressed={darkMode} onClick={onToggleDarkMode} className="flex items-center gap-2 text-xs font-bold">
        <img className="w-4 h-4 -rotate-45 dark:invert" src={moon} alt="" />
        Dark Mode
      </button>
    </nav>
  );
};

export default NavBar;

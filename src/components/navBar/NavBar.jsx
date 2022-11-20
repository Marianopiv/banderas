import React, { useContext } from "react";
import moon from "../../assets/moon.png"
import { FlagProvContext } from "../../context/FlagProv";

const NavBar = () => {
  const {toogleDarkMode,darkMode } =
    useContext(FlagProvContext);
  return (
    <div onClick={toogleDarkMode} className={`flex justify-between gap-5 ${darkMode?"bg-slate-700 text-white":"bg-white"} px-3 py-8 hover:cursor-pointer`} >
      <div className=""><h3 className="text-sm font-bold">Where in the world?</h3></div>
      <div className="flex gap-2"><img className={`w-4 h-4 -rotate-45 ${darkMode?"invert":""}`} src={moon} alt="" />
      <h3 className="text-xs font-bold">Dark Mode</h3></div>
    </div>
  );
};

export default NavBar;

import React, { useContext } from "react";
import moon from "../../assets/moon.png"
import { FlagProvContext } from "../../context/FlagProv";

const NavBar = () => {
  const {toogleDarkMode,darkMode } =
    useContext(FlagProvContext);
  return (
    <div  className={`flex justify-between gap-5 ${darkMode?"bg-slate-700 text-white":"bg-white"} px-3 py-8 `} >
      <div className=""><h3 className="text-sm font-bold">Where in the world?</h3></div>
      <div onClick={toogleDarkMode} className="flex gap-2 hover:cursor-pointer"><img className={`w-4 h-4 -rotate-45 ${darkMode?"invert":""}`} src={moon} alt="" />
      <h3 className="text-xs font-bold">Dark Mode</h3>
      <p className="text-xs">V 2.0</p></div>
    </div>
  );
};

export default NavBar;

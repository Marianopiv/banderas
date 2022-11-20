import React from "react";
import moon from "../../assets/moon.png"

const NavBar = () => {
  return (
    <div className="flex justify-between gap-5">
      <div className=""><h3 className="text-sm font-bold">Where in the world</h3></div>
      <div className="flex gap-2"><img className="w-4 h-4 -rotate-45" src={moon} alt="" />
      <h3 className="text-xs font-bold">Dark Mode</h3></div>
    </div>
  );
};

export default NavBar;

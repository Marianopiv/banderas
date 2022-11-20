import React, { useContext } from "react";
import { FlagProvContext } from "../../context/FlagProv";
import { darkClasses } from "../../config/config";

const FlagComp = ({ name, flag, region, population, capital }) => {

  const {darkMode } =
    useContext(FlagProvContext);
    
  const flagData = [
    { name: "Population:", info: population },
    { name: "Region:", info: region },
    { name: "Capital:", info: capital },
  ];
  return (
    <div className={`rounded-lg my-2 w-64 border-2 ${darkMode?darkClasses:"bg-white"} `}>
      <img className="h-40 w-64 rounded-lg" src={flag} alt="" />
      <div className="flex flex-col ml-10">
        <h2 className="text-xl w-54 font-bold  py-4">{name}</h2>
        <div className="flex flex-col py-1">
          {flagData.map(({ name, info }) => (
            <div key={name} className="flex py-1 px-1">
              <p className="font-bold">{name}</p>
              <p>{info}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlagComp;

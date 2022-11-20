import React from "react";

const FlagComp = ({ name, flag, region, population, capital }) => {
  const flagData = [
    { name: "Population:", info: population },
    { name: "Region:", info: region },
    { name: "Capital:", info: capital },
  ];
  return (
    <div className="rounded-lg bg-white my-2 border-2">
      <img className="h-40 w-64 rounded-lg" src={flag} alt="" />
      <div className="flex flex-col ml-10">
        <h2 className="text-xl font-bold py-4">{name}</h2>
        <div className="flex flex-col py-1">
          {flagData.map(({ name, info }) => (
            <div className="flex py-1 px-1">
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

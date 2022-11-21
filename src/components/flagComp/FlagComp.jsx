import React, { useContext } from "react";
import { FlagProvContext } from "../../context/FlagProv";
import { darkClasses } from "../../config/config";
import { Link } from "react-router-dom";
import FlagDetail from "../../UI/FlagDetail";

const FlagComp = ({ name, flag, region, population, capital }) => {
  const { darkMode, chosen } = useContext(FlagProvContext);

  const flagData = [
    { name: "Population:", info: population },
    { name: "Region:", info: region },
    { name: "Capital:", info: capital },
  ];

  if (chosen) {
    const { population, region, subregion, capital, tld } = chosen;

    return (
      <>
        <FlagDetail text="Population" data={population} />
        <FlagDetail text="Region" data={region} />
        <FlagDetail text="Subregion" data={subregion} />
        <FlagDetail text="Capital" data={capital} />
        <FlagDetail text="Top Level Domain" data={tld} />
        <div className="flex">
          <p className="font-bold">Currencies:</p>
          {Object.values(chosen.currencies).map(({ name, symbol }) => (
            <h3 key={name}>
              {name} Symbol:{symbol}
            </h3>
          ))}
        </div>
        <div className="flex">
          <p className="font-bold">Languages:</p>
          {Object.values(chosen.languages).map((item) => item)}
        </div>
        <h2 className="text xl">Border countries</h2>
      </>
    );
  }
  return (
    <Link to={`/dynamicPage/${name}`}>
      <div
        className={`rounded-lg my-2 w-64 border-2 ${
          darkMode ? darkClasses : "bg-white"
        } `}
      >
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
    </Link>
  );
};

export default FlagComp;

/* Como hacerlo sin repetir componentes const details = [
  { text: "population", data: population },
  { text: "region", data: region },
  { text: "subRegion", data: subregion },
  { text: "Capital", data: capital },
  { text: "Top", data: tld },
]; */

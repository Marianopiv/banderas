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
    const {tld } = chosen;

    /* const details = [
      { text: "population", data: population },
      { text: "region", data: region },
      { text: "subRegion", data: subregion },
      { text: "Capital", data: capital },
      { text: "Top", data: tld },
    ]; */

    return (
      <>
        {/* {details.map(({ text, data }) => {
          <FlagDetail text={text} data={data} />;
        })} */}
        <div className="text-xs md:h-96 w-96 pl-4 gap-4 flex flex-col md:pt-48 md:pl-20">
          <FlagDetail text="Top Level Domain" data={tld} />
          <div className="flex ">
            <p className="font-bold">Currencies:</p>
            {Object.values(chosen.currencies).map(({ name, symbol }) => (
              <h3 key={name}>
                {name} Symbol:{symbol}
              </h3>
            ))}
          </div>
          <div className="flex">
            <p className="font-bold">Languages:</p>
            {Object.values(chosen.languages).map((item) => item + " ")}
          </div>
        </div>
        
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

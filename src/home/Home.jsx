import React, { useContext, useEffect, useState } from "react";
import FlagComp from "../components/flagComp/FlagComp";
import NavBar from "../components/navBar/NavBar";
import { FlagProvContext } from "../context/FlagProv";

const Home = () => {
  const { fetchData, flags, fetchFilter, flagSelect, setFlagSelect } =
    useContext(FlagProvContext);

  useEffect(() => {
    fetchData();
  }, [flagSelect]);

  const handleRegion = (e) => {
    const {value} = e.target
    if (value != "") {
      fetchFilter("region", value);
    }
  };

  console.log(flagSelect);
  return (
    <>
      <NavBar />
      <div className="bg-gray-50 flex flex-col gap-4">
        <div className="flex flex-wrap  gap-10 mt-10 h-fit">
          <div className="flex">
            <button
              onClick={() => fetchFilter("name", flagSelect)}
              className="w-8 text-gray-400"
            >
              🔍︎
            </button>
            <input
              onChange={(e) => setFlagSelect(e.target.value)}
              className="text-xs w-5/6 p-3 border-2 border-gray-100 rounded-md"
              type="text"
              placeholder="   Search for a country..."
            />
          </div>
        </div>
        <div>
          <select
            className="text-xs m-2 p-3 border-gray-100 border-2 rounded-md"
            name=""
            id=""
            onClick={(e) => handleRegion(e)}
            placeholder="Filter by region"
          >
            <option value=""> Filter by region</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="flex justify-center flex-wrap">
          {!flags
            ? "Loading"
            : flags.map(
                ({ name, flags, region, population, capital }, index) => (
                  <>
                    <FlagComp
                      key={index}
                      name={name.common}
                      flag={flags.png}
                      region={region}
                      population={population}
                      capital={capital}
                    />
                  </>
                )
              )}
        </div>
      </div>
    </>
  );
};

export default Home;

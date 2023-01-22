import React, { useCallback, useContext, useEffect } from "react";
import FlagComp from "../components/flagComp/FlagComp";
import { FlagProvContext } from "../context/FlagProv";
import { regionNames, darkClasses } from "../config/config";
import _ from "lodash";
import "./App.css"

const Home = () => {
  const {
    fetchData,
    flags,
    fetchFilter,
    flagSelect,
    setFlagSelect,
    darkMode,
    handleRegion,
  } = useContext(FlagProvContext);

  useEffect(() => {
    fetchData();
  }, [flagSelect]);

  const handleChange = (e) => {
    setFlagSelect(e.target.value);
  };

  const debounceFunction = useCallback(_.debounce(handleChange,500),[])
  return (

      <div
        className={`bg-gray-50 flex flex-col gap-4 ${
          darkMode ? " bg-slate-800 text-white" : "bg-white"
        } `}
      >
        <div className="flex flex-wrap gap-10 md:gap-0 mt-10 h-fit">
          <div className="flex">
            <div className="flex ">
              <button
                onClick={() => fetchFilter("name", flagSelect)}
                className={` text-gray-400  ${
                  darkMode ? darkClasses : "bg-white"
                }`}
              >
                🔍︎
              </button>
            </div>
            <input
              onChange={debounceFunction}
              className={`text-xs w-5/6 p-3 border-2  rounded-md ${
                darkMode ? darkClasses : "bg-white border-gray-100"
              }`}
              type="text"
              placeholder="Search for a country..."
            />
          </div>
        </div>
        <div>
          <select
            className={`text-xs m-2 p-3  border-2 rounded-md ${
              darkMode ? darkClasses : "bg-white border-gray-100 dark:text-black"
            } `}
            name=""
            id=""
            onClick={(e) => handleRegion(e)}
            placeholder="Filter by region"
          >
            <option value=""> Filter by region</option>
            {regionNames.map((item) => (
              <option className="rounded-md" key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center md:justify-between sm:gap-10 md:gap-10 flex-wrap">
          {!flags
            ? <> <h1 className="text-black dark:text-black h-screen">LOADER</h1>
            </>
            : flags.map(
                ({ name, flags, region, population, capital }, index) => (
                  <FlagComp
                    key={index}
                    name={name.common}
                    flag={flags.png}
                    region={region}
                    population={population}
                    capital={capital}
                  />
                )
              )}
        </div>
      </div>
  );
};

export default Home;

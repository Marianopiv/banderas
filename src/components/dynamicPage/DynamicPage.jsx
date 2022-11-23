import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { chosenData, darkClasses } from "../../config/config";
import { FlagProvContext } from "../../context/FlagProv";
import FlagDetail from "../../UI/FlagDetail";
import FlagComp from "../flagComp/FlagComp";
import "./dynamic.css"

const DynamicPage = () => {
  const { flags, chosen, setChosen, darkMode } = useContext(FlagProvContext);

  const { name } = useParams();

  const handleFlagDetail = () => {
    if (flags.length > 0) {
      const result = flags.find((item) => item.name.common === name);

      const utilData = {};
      Object.entries(result).map((item) => {
        if (chosenData.includes(item[0])) {
          utilData[item[0]] = item[1];
        }
      });
      setChosen(utilData);
    }
  };

  useEffect(() => {
    if (!chosen) {
      handleFlagDetail();
    }
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    setChosen(null);
    navigate("/");
  };
  return (
    <div>
      {chosen && (
        <>
          <div
            className={`customHeight flex  flex-col md:flex-row justify-center md:justify-around gap-8 p-3 ${
              darkMode ? "bg-slate-800 border-black text-white" : "bg-gray-50 "
            } `}
          >
            <div className="mt-4 md:absolute md:left-4">
              <button
                onClick={handleNavigate}
                className={`border-2 text-xs  first-letter ${
                  darkMode ? darkClasses : "bg-white border-gray-500"
                }`}
              >
                Back
              </button>
            </div>
            <div className="flex justify-center md:w-96 md:h-58 md:items-center">
              <img className="w-60 md:w-96 md:h-58" src={chosen.flags.png} />
            </div>
            <div className="p-4 flex flex-col gap-4 md:justify-center">
              <div className="flex flex-col md:flex-row md:items-center  text-xs font-light">
                <div className="flex gap-2 flex-col">
                  <h2 className="text-2xl font-bold mb-4 md:mb-12 ">
                    {chosen.name.common}
                  </h2>
                  <p className="font-bold">Native name:</p>
                  {Object.values(chosen.name.nativeName).map(
                    ({ common }, index) => (
                      <h3 key={index}>{common}</h3>
                    )
                  )}
                  <FlagDetail text="Population" data={chosen.population} />
                  <FlagDetail text="Region" data={chosen.region} />
                  <FlagDetail text="Subregion" data={chosen.subregion} />
                  <FlagDetail text="Capital" data={chosen.capital} />
                </div>
              </div>
            </div>
            <div className="flex md:justify-center flex-col">
              <FlagComp />
            </div>
          </div>
          <div className={`text-xs w-full md:pb-16  flex flex-wrap first-letter ${
                  darkMode ? "bg-slate-800  text-white" : "bg-gray-50 border-gray-500"
                }`}>
            <FlagDetail text="Border Countries" data={chosen.borders} />
          </div>
        </>
      )}
    </div>
  );
};

export default DynamicPage;

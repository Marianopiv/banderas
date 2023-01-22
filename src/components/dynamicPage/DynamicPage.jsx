import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {darkClasses } from "../../config/config";
import { FlagProvContext } from "../../context/FlagProv";
import { dynamicObject } from "../../helper";
import FlagDetail from "../../UI/FlagDetail";
import FlagComp from "../flagComp/FlagComp";
import config from "../../config.json"
import "./dynamic.css";
const DynamicPage = () => {
  const { chosen, setChosen, darkMode, handleFlagDetail } =
    useContext(FlagProvContext);

  const { name } = useParams();

  useEffect(() => {
    if (!chosen) {
      handleFlagDetail(name);
    }
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    setChosen(null);
    navigate("/");
  };

  if (chosen) {
    const {borders, flags, name } =
      chosen;
    return (
      <>
        <div
          className={`customHeight flex  flex-col md:flex-row justify-center md:justify-around gap-8 p-3 ${
            darkMode ? "bg-slate-800 border-black text-white" : "bg-gray-50 dark:text-white "
          } `}
        >
          <div className="mt-24 md:absolute md:left-4">
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
            <img className="w-60 md:w-96 md:h-58" src={flags.png} />
          </div>
          <div className="pl-4 flex flex-col gap-4 md:justify-center">
            <div className="flex flex-col md:flex-row md:items-center  text-xs font-light">
              <div className="flex gap-2 flex-col">
                <h2 className="text-2xl font-bold mb-4 md:mb-12 ">
                  {chosen.name.common}
                </h2>
                <p className="font-bold">Native name:</p>
                {Object.values(name.nativeName).map(({ common }, index) => (
                  <h3 key={index}>{common}</h3>
                ))}

                {dynamicObject(chosen, config.bandera.banderaItemInfo).map(({ text, data },index) => (
                  <FlagDetail key={index} text={text} data={data} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex md:justify-center flex-col">
            <FlagComp />
          </div>
        </div>
        <div
          className={`text-xs w-full py-4 pt-20 md:pt-0 md:mt-0 md:pb-16  flex flex-wrap first-letter ${
            darkMode ? "bg-slate-800  text-white" : "bg-gray-50 border-gray-500"
          }`}
        >
          <FlagDetail text="Border Countries" data={borders} />
        </div>
      </>
    );
  }
};

export default DynamicPage;

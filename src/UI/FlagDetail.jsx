import React, { useContext } from "react";
import { darkClasses } from "../config/config";
import { FlagProvContext } from "../context/FlagProv";
import { handleBorders } from "../helper";

const FlagDetail = ({ text, data }) => {
  if (text === "Border Countries" && data) {
    const { darkMode, fullBorders } = useContext(FlagProvContext);

    return (
      <div className="flex pl-4 md:pl-0 md:gap-8 flex-col w-full md:flex-row md:items-center md:justify-end md:mr-4 mt-8 md:mt-0">
        <p className="text-xs font-bold md:mx-4">{text}:</p>
        <div className="flex justify-center gap-6 mt-4 flex-wrap">
          {handleBorders(fullBorders, data) &&
            handleBorders(fullBorders, data).map((item, index) => (
              <button
                key={index}
                className={`px-2 py-1 rounded-md border-2 md:mb-2 text-xs  first-letter ${
                  darkMode ? darkClasses : "bg-white border-gray-500"
                }`}
              >
                {" "}
                {item.name.common}
              </button>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex py-1">
      <p className="font-bold text-xs capitalize">
        {text === "Border Countries" ? "" : text}
      </p>
      <p>{data}</p>
    </div>
  );
};

export default FlagDetail;

//Helper qeu por un lado agarre los paises, por otro lado arranque los iniciales, y me devuelva esos items, y despues lo guardo en otra variable de arrays y lo devuelvo, SIN ESTADOS, hacerlo pasar por parametros desde el helper.

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { darkClasses } from "../config/config";
import { FlagProvContext } from "../context/FlagProv";

const FlagDetail = ({ text, data }) => {
  if (text === "Border Countries" && data) {
    const { darkMode } = useContext(FlagProvContext);
    const [fullBorders, setFullBorders] = useState(null);
    const [borderFound, setBorderFound] = useState(null);

    const fetchDataBase = async () => {
      try {
        const result = await axios.get("https://restcountries.com/v3.1/all");
        setFullBorders(result.data);
        if (fullBorders) {
        }
      } catch (error) {
        console.log("no anduvo");
      }
    };

    const handleBorders = () => {
      if (fullBorders) {
        setBorderFound(
          fullBorders.filter((item) => data.includes(item.cca3) && item)
        );
      }
    };

    useEffect(() => {
      fetchDataBase();
    }, []);

    useEffect(() => {
      handleBorders();
    }, [fullBorders]);

    return (
      <div className="flex pl-4 md:pl-0 md:gap-8 flex-col w-full md:flex-row md:items-center md:justify-end md:mr-4 mt-8 md:mt-0">
        <p className="text-xs font-bold md:mx-4">{text}: </p>
        <div className="flex justify-center gap-6 mt-4 flex-wrap">
          {borderFound ? (
            borderFound.map((item,index) => (
              <button key={index}
                className={`px-2 py-1 rounded-md border-2 md:mb-2 text-xs  first-letter ${
                  darkMode ? darkClasses : "bg-white border-gray-500"
                }`}
              >
                {" "}
                {item.name.common}
              </button>
            ))
          ) : (
            <p>None</p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex py-1">
      <p className="font-bold text-xs">{text}: </p>
      <p>{data}</p>
    </div>
  );
};

export default FlagDetail;

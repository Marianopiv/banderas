import axios from "axios";
import React, { useEffect, useState } from "react";

const FlagDetail = ({ text, data }) => {

  if (text === "Border Countries" && data) {
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
      <div className="flex flex-col mt-8">
        <p className="font-bold">{text}: </p>
        <div className="flex justify-center gap-4 flex-wrap">
        {borderFound && borderFound.map((item) => <button className="border-gray-200 border-2 px-2"> {item.name.common}</button>)}
        </div>
       
      </div>
    );
  }
  return (
    <div className="flex py-1">
      <p className="font-bold">{text}: </p>
      <p>{data}</p>
    </div>
  );
};

export default FlagDetail;

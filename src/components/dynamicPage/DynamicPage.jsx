import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FlagProvContext } from "../../context/FlagProv";
import FlagComp from "../flagComp/FlagComp";

const DynamicPage = () => {
  const { flags, chosen, setChosen } = useContext(FlagProvContext);

  const { name } = useParams();

  const handleFlagDetail = () => {
    if (flags.length > 0) {
      const result = flags.find((item) => item.name.common === name);
      setChosen(result);
      console.log(result);
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
          <div className="flex flex-col justify-center gap-8 p-3 bg-gray-50 ">
            <div className="mt-10">
              <button
                onClick={handleNavigate}
                className="border-2 border-gray-500"
              >
                Back
              </button>
            </div>
            <div className="flex justify-center">
              <img className="w-60" src={chosen.flags.png} />
            </div>
            <div className="p-4 flex flex-col gap-4">
              <h2 className="text-2xl font-bold "> {chosen.name.common}</h2>
              <div className="flex flex-col text-xs font-light">
                <div className="flex">
                  <p className="font-bold">Native name:</p>
                  {Object.values(chosen.name.nativeName).map((item) => (
                    <h3>
                      {Object.entries(item).find(
                        (item) => item[0] === "common"
                      )}
                    </h3>
                  ))}
                </div>
                <div className="flex flex-col">
                  <FlagComp />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DynamicPage;

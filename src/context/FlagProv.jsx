import React, { createContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { chosenData } from "../config/config";
export const FlagProvContext = createContext();



const FlagProv = ({ children }) => {
  const [flags, setFlags] = useState(null);
  const [flagSelect, setFlagSelect] = useState('')
  const [darkMode, setdarkMode] = useState(false)
  const [chosen, setChosen] = useState(null);


  const fetchData = async () => {
    try {
      const result = await axios.get("https://restcountries.com/v3.1/all");
      setFlags(result.data);
    } catch (error) {
    }
  };

  const fetchFilter = async (section,name) => {
    try {
      const result = await axios.get(`https://restcountries.com/v3.1/${section}/${name}`)
      setFlags(result.data)
    } catch (error) {
      Swal.fire({
        background:`${darkMode?'#202D36':'white'}`,
        color:`${darkMode?'white':''}`,
        text: 'Not found',
        icon: 'error',
        confirmButtonText: 'ok'
      })
      
    }
  } 

  const handleRegion = (e) => {
    const { value } = e.target;
    if (value != "") {
      fetchFilter("region", value);
    }
  };

  const toogleDarkMode = () => {
    setdarkMode(!darkMode)

  }

  const handleFlagDetail = (name) => {
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
  return (<FlagProvContext.Provider value={{fetchData,flags,setFlags,fetchFilter,toogleDarkMode,darkMode,flagSelect,setFlagSelect,handleRegion,chosen,setChosen,handleFlagDetail}}>{children}</FlagProvContext.Provider>)
};

export default FlagProv;

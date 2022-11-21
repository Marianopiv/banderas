import React, { createContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const FlagProvContext = createContext();

const FlagProv = ({ children }) => {
  const [flags, setFlags] = useState(null);
  const [flagSelect, setFlagSelect] = useState('')
  const [darkMode, setdarkMode] = useState(false)
  const [chosen, setChosen] = useState(null);

  const fetchData = async () => {
    try {
      const result = await axios.get("https://restcountries.com/v3.1/all");
      console.log(result);
      setFlags(result.data);
    } catch (error) {
      console.log("no anduvo");
    }
  };

  const fetchFilter = async (section,name) => {
    try {
      const result = await axios.get(`https://restcountries.com/v3.1/${section}/${name}`)
      console.log(result.data)
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
  return (<FlagProvContext.Provider value={{fetchData,flags,setFlags,fetchFilter,toogleDarkMode,darkMode,flagSelect,setFlagSelect,handleRegion,chosen,setChosen}}>{children}</FlagProvContext.Provider>)
};

export default FlagProv;

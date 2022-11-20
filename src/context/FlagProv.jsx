import React, { createContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const FlagProvContext = createContext();

const FlagProv = ({ children }) => {
  const [flags, setFlags] = useState(null);
  const [flagSelect, setFlagSelect] = useState('')

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
        title: 'Error!',
        text: 'not found',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  } 


  return (<FlagProvContext.Provider value={{fetchData,flags,setFlags,fetchFilter,flagSelect,setFlagSelect}}>{children}</FlagProvContext.Provider>)
};

export default FlagProv;

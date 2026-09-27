import React, { createContext, useState } from "react";
import axios from "axios";

export const FlagProvContext = createContext();

const FlagProv = ({ children }) => {
  const [flags, setFlags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await axios.get("/api/countries");
      setFlags(result.data);
    } catch (fetchError) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlagProvContext.Provider value={{ fetchData, flags, loading, error }}>
      {children}
    </FlagProvContext.Provider>
  );
};

export default FlagProv;

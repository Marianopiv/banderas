import React, { useContext, useEffect, useState } from "react";
import FlagComp from "../components/flagComp/FlagComp";
import NavBar from "../components/navBar/NavBar";
import { FlagProvContext } from "../context/FlagProv";

const Home = () => {
  const { fetchData, flags, loading, error } = useContext(FlagProvContext);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const visibleFlags = (flags || []).filter((country) =>
    country.name.common.toLowerCase().includes(search.trim().toLowerCase()) &&
    (!region || country.region === region)
  );

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 flex flex-col gap-4 min-h-screen">
        <div className="flex flex-wrap gap-10 mt-10 h-fit">
          <div className="flex">
            <span aria-hidden="true" className="w-8 text-gray-400 p-2">🔍︎</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search for a country"
              className="text-xs w-5/6 p-3 border-2 border-gray-100 rounded-md"
              type="search"
              placeholder="Search for a country..."
            />
          </div>
        </div>
        <div>
          <select
            className="text-xs m-2 p-3 border-gray-100 border-2 rounded-md"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            aria-label="Filter by region"
          >
            <option value="">Filter by region</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="flex justify-center flex-wrap" aria-live="polite">
          {loading && <p>Loading countries...</p>}
          {error && <p>Couldn't load countries. <button className="underline" onClick={fetchData}>Try again</button></p>}
          {!loading && !error && flags && (
            visibleFlags.length ? visibleFlags.map((country) => (
              <FlagComp
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.png}
                region={country.region}
                population={country.population}
                capital={country.capital?.join(", ") || "—"}
              />
            )) : <p>No countries found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

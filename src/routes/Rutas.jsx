import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicPage from "../components/dynamicPage/DynamicPage";
import NavBar from "../components/navBar/NavBar";
import FlagProv from "../context/FlagProv";
import Home from "../home/Home";
import WithNavbar from "./layout/WithNavBar";

const Rutas = () => {
  return (
    <>
      <BrowserRouter>
        <FlagProv>
          <Routes>
            <Route path="/" element={<WithNavbar/>}>
            <Route path="/" element={<Home />} />
            <Route path="/dynamicPage/:name" element={<DynamicPage />} />
            </Route>
          </Routes>
        </FlagProv>
      </BrowserRouter>
    </>
  );
};

export default Rutas;

import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import FlagProv from '../context/FlagProv'
import Home from '../home/Home'

const Rutas = () => {
  return (
    <>
        
            <BrowserRouter>
            <FlagProv>
            <Routes>
            <Route path="/" element={<Home/>}/>
            </Routes>
            </FlagProv>
            </BrowserRouter>
    </>
  )
}

export default Rutas
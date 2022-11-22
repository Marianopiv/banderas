import React from 'react'

import {Outlet} from 'react-router-dom'
import NavBar from '../../components/navBar/NavBar'

const WithNavbar = () => {
  return (
    <>
    <NavBar />
    {/*  Outlet representa las rutas 'x' */}
    <Outlet />
    </>
  )
}

export default WithNavbar
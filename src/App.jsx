import { useState } from 'react'
import './App.css'
import NavBar from './components/navBar/NavBar'
import Home from './home/Home'
import Rutas from './routes/Rutas'

function App() {

  return (
    <div className="App">
      <Rutas/>
    </div>
  )
}

export default App

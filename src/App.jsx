import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Cadastro from './Pages/Cadastro'
import Login from './Pages/Login'
import ListarUsuarios from './Pages/Listar'

import './App.css'




function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Cadastro />}/> 
        <Route path='/login' element={<Login />}/> 
        <Route path='/listar-usuarios' element={<ListarUsuarios />}/>

      </Routes>

    </BrowserRouter>
  )
}

export default App

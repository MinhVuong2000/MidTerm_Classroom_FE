
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


export default function RouterURL() {
  return (
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
  )
}
import ReactDOM from 'react-dom';
import Classes from '../Classes/Classes';
import Detail from '../Detail/Detail';
import React, {Component} from 'react'
import {
  BrowserRouter,
  Link,
  Routes,
  Route
} from "react-router-dom";



export default function RouterURL() {
  return (

      <BrowserRouter>
        <Routes>
        <Route path='/' component={Classes} />
        <Route path='/detail' component={Detail} />
        <Route component={Error} />
        </Routes>
      </BrowserRouter>
  )
}
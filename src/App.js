import ReactDOM from 'react-dom';
import Classes from './Components/Classes/Classes';
import FormDialog from './Components/FormDialog/FormDialog';
import Header from './Components/Header/Header';
import ClassDetail from './Components/ClassDetail/ClassDetail';
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import Detail from './Components/Detail/Detail';
import React, { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import RouterURL from './Components/RouterURL/RouterURL';

export default function App() {
    return (
            <div>
              <Header/>
              {/* <FormDialog sx={{display:"flex", justifyContent:"flex-end", marginTop:10}}/> */}
              <ClassDetail/>
            </div>
          )
}


// export default function App() {
//   return (

//     <div>
//       <RouterURL></RouterURL>
//     </div>
//   )
// }
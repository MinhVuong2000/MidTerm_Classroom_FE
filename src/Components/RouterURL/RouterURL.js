import ReactDOM from 'react-dom';
import Classes from '../Classes/Classes';
import Detail from '../Detail/Detail';
import ClassDetail from '../ClassDetail/ClassDetail';
import NotFound from '../NotFound/NotFound';
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
          <Route exact path='/' element={<Classes/>} />
          <Route path='/detail' element={<Detail/>} />
          <Route path='/notfound' component={<NotFound/>} />
        </Routes>
      </BrowserRouter>
  )
}

// const routes = [
//     {
//         path : '/',
//         exact : true,
//         main : () => <Classes />
//     },
//     {
//         path : '/detail',
//         exact : false,
//         main : () => <Detail />
//     },
//     {
//         path : '/notfound',
//         exact : false,
//         main : () => <NotFound />
//     },
//     // {
//     //     path : '/products',
//     //     exact : false,
//     //     main : ({ match, location }) => <Products match={match} location={location} />
//     // }
// ];

// export default routes;
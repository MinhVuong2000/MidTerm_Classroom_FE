import ReactDOM from 'react-dom';
import Classes from '../Classes/Classes';
import Detail from '../Detail/Detail';
import ClassInvite from '../ClassInvite/ClassInvite';
import ClassDetail from '../ClassDetail/ClassDetail';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
//import App_Login from '../App_Login/App_Login';
import LogOut from '../LogOut/LogOut';
import Profile from '../Profile/Profile';
import React, { Component } from 'react'
import {
  BrowserRouter,
  Link,
  Routes,
  Route
} from "react-router-dom";
import Member from '../ClassDetail/Member/Member';
import { Switch } from '@mui/material';



export default function RouterURL() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Classes />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/notfound' element={<NotFound />} />
        <Route path='/classes/:idclass' element={<ClassDetail/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/logout' element={<LogOut />} />
        <Route path='/classes/inviteclass/:nameclass' element={<ClassInvite/>} />
      </Routes>
    </BrowserRouter>
  )
}
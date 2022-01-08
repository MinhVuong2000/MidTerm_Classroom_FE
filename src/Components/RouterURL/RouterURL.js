import Classes from '../Classes/Classes';
import Detail from '../Detail/Detail';
import ClassInvite from '../ClassInvite/ClassInvite';
import ClassDetail from '../ClassDetail/ClassDetail';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ForgetPassword from '../Login/ForgetPassword';
import ForgetPasswordSendOTP from '../Login/ForgetPasswordSendOTP';
import RenewPassword from '../Login/RenewPassword';
import LogOut from '../LogOut/LogOut';
import Profile from '../Profile/Profile';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


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
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/forget-password/send-otp/' element={<ForgetPasswordSendOTP />} />
        <Route path='/renew-password/' element={<RenewPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/logout' element={<LogOut />} />
        <Route path='/classes/inviteclass/:nameclass' element={<ClassInvite/>} />
      </Routes>
    </BrowserRouter>
  )
}
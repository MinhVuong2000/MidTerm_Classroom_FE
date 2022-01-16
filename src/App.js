import React from 'react'
import RouterURL from './Components/RouterURL/RouterURL';
import Header from './Components/Header/Header';
import { DOMAIN_API, DOMAIN_SOCKET } from './config/const';
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

export default function App() {
    const [isLogined, setIsLogined] = useState(localStorage.getItem('access_token')!='undefined');
    const [socket, setSocket] = useState(null);

    console.log(localStorage.getItem('access_token'));

    // const socket = io(DOMAIN_SOCKET[4]==='s' ? DOMAIN_API : DOMAIN_SOCKET,
    //   {
    //     withCredentials: true,
    //     // extraHeaders: {
    //     //     "x-access-token": localStorage.getItem('access_token'),
    //     // }
    //   }
    // )
    useEffect(() => {
      setSocket(io(DOMAIN_SOCKET[4]==='s' ? DOMAIN_API : DOMAIN_SOCKET,
        {
          withCredentials: true,
          // extraHeaders: {
          //     "x-access-token": localStorage.getItem('access_token'),
          // }
        }
    ));
    }, []);
  
    useEffect(() => {
      socket?.emit("newUser", localStorage.getItem('access_token'));
    }, [socket]);

    return (
      <div>
        {isLogined && <Header socket={socket} isLogined={isLogined}/>}

        <RouterURL socket={socket} setIsLogined={setIsLogined}/>
      </div>
    )
}
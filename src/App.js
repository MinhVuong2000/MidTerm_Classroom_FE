import React from 'react'
import RouterURL from './Components/RouterURL/RouterURL';
import Header from './Components/Header/Header';
import { DOMAIN_API, DOMAIN_SOCKET } from './config/const';
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const [isLogined, setIsLogined] = useState(localStorage.getItem('access_token')!='undefined');
    const [socket, setSocket] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
      setSocket(io(DOMAIN_SOCKET,
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
          {isLogined && <Header socket={socket} isLogined={isLogined} navigate={navigate}/>}

          <RouterURL socket={socket} setIsLogined={setIsLogined}/>
        </div>
    )
}

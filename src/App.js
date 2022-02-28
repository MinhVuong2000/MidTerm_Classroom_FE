import React from 'react'
import RouterURL from './Components/RouterURL/RouterURL';
import Header from './Components/Header/Header';
import { DOMAIN_API, DOMAIN_SOCKET } from './config/const';
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const [isLogined, setIsLogined] = useState(true);
    return (
        <div>
          <RouterURL/>
        </div>
    )
}

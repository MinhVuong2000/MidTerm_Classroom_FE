import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate, Navigate, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ClassDetail from '../ClassDetail/ClassDetail';
//import { New } from './News/New';

import { DOMAIN_API } from '../../config/const';
import { SentimentNeutralOutlined } from '@mui/icons-material';
export default function ClassInvite({addUser}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [idclass, setIDClass] = useState(0);
    const [item, setItem] = useState([]);
    const {nameclass} = useParams();
    let actoken = localStorage.getItem('access_token');
    const navigate = useNavigate();
    useEffect(() => {
        fetch(DOMAIN_API+`classes/inviteclass/${nameclass}`,{
            method: "GET",
            headers: new Headers({
                "x-access-token": actoken
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result != null){
                    setItem(result);
                    setIDClass(result.id);
                    let path = '/classes/' + result.id;
                    navigate(path);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])
    let urlclass = '/classes/' + idclass;
    //console.log(urlclass);
    console.log(item);
    if(localStorage.getItem('access_token') == null){
        return(
            <Navigate to="/login" />
        )
    }
    return(
        <Navigate to={urlclass} />
    )
      
}
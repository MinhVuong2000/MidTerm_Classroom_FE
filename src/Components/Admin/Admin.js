import * as React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Navigate, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//-----
import ListAdmin from './ListAdmin/ListAdmin';
import ListUser from './ListUser/ListUser';
import ListClass from './ListClass/ListClass';

export default function Admin() {
    const [value, setValue] = React.useState(0);
    
    const [isShowAdmins, setIsShowAdmins] = React.useState(true)
    const [isShowUsers, setIsShowUsers] = React.useState(false)
    const [isShowClasses, setIsShowClasses] = React.useState(false)
    


    const handleChange = (event, newValue) => {

        if (newValue == "0") {
            setIsShowAdmins(true);
            setIsShowUsers(false);
            setIsShowClasses(false);
        
        }
        if (newValue == "1") {
            setIsShowAdmins(false);
            setIsShowUsers(true);
            setIsShowClasses(false);
           
        }
        if (newValue == "2") {
            setIsShowAdmins(false);
            setIsShowUsers(false);
            setIsShowClasses(true);
           
        }
        setValue(newValue);
    };

    useEffect(() => {
        handleChange()
    }, []);



   


    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab active label="Danh sách Admin" />
                <Tab label="Danh sách người dùng" />
                <Tab label="Danh sách lớp học" />
            </Tabs>
            <div>
                {isShowAdmins && < ListAdmin/>}
                {isShowUsers && < ListUser />}
                {isShowClasses && < ListClass />}
                
            </div>
        </Box>
    );
    }

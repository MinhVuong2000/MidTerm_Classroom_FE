import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
<<<<<<< HEAD
import { Navigate, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
=======
import  { Navigate } from 'react-router-dom';
>>>>>>> 4ec6238e1ee115a7e0cabc06d069c587cf32ace7
import Classroom from "../Classroom/Classroom";
import {DOMAIN_API}  from '../../config/const';



export default function Classes(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    console.log("===================================")
    
    let actoken = localStorage.getItem('access_token');
    console.log(actoken);
    
    useEffect(() => {
        fetch(DOMAIN_API+"classes",{
            method: "GET",
            headers: new Headers({
                "x-access-token": actoken
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
<<<<<<< HEAD
                if(result == null){
                    setError(1);
                }
                else{
                    console.log(result)
                    setIsLoaded(true);
                    setItems(result);
                }
                
=======
                console.log(result)
                setIsLoaded(true);
                setItems(result.message?null:result);
>>>>>>> 4ec6238e1ee115a7e0cabc06d069c587cf32ace7
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            
        )
    }, [])
    
    if (error) {
        return (
            <Navigate to="/login"/>
        );
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (items!==null)
            return (
                <Box sx={{ flexGrow: 1, 
                            mx: 'auto',
                            p: 1,
                            m: 1,
                            textAlign: 'center',
                            borderRadius: 1,
                        }}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        {items.map(item => 
                            <Grid item xs={12} sm={6} md={3}>
                                <Classroom title={item.class_name} description={item.description} idclass={item.id} />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            )
        else{
            return (
                <div>
                    <Navigate to="/login"/>
                </div>
            )
        }
    }
}
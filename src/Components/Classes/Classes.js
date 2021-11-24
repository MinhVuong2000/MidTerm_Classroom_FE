import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Classroom from "../Classroom/Classroom";
import {DOMAIN_API}  from '../../config/const';



export default function Classes(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    console.log("===================================")
    
    let actoken = localStorage.getItem('access_token');
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
                console.log(result)
                setIsLoaded(true);
                setItems(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
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
        );
    }
}
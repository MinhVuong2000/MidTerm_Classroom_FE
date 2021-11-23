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
    const data=[
        {
            ID: "1",
            ClassName: "Class1"
        },
        {
            ID: "2",
            ClassName: "Class2"
        },
        {
            ID: "3",
            ClassName: "Class3"
        },
        {
            ID: "4",
            ClassName: "Class4"
        },
        {
            ID: "5",
            ClassName: "Class5"
        },
        {
            ID: "6",
            ClassName: "Class6"
        }


    ]
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        // fetch(DOMAIN_API+"classes")
        // .then(res => res.json())
        // .then(
        //     (result) => {
        //     setIsLoaded(true);
        //     setItems(result);
        //     },
        //     // Note: it's important to handle errors here
        //     // instead of a catch() block so that we don't swallow
        //     // exceptions from actual bugs in components.
        //     (error) => {
        //     setIsLoaded(true);
        //     setError(error);
        //     }
        // )
            setIsLoaded(true);
            setItems(data);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            setIsLoaded(true);
            setError(error);
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
                    {items.map(item => (
                        <Grid item xs={12} sm={6} md={3}>
                            <Classroom key={item.ID} title={item.ClassName}>
                            </Classroom>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }
}
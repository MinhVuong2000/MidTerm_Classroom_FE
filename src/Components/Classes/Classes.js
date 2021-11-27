import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Navigate} from 'react-router-dom';
import Classroom from "../Classroom/Classroom";
import {DOMAIN_API}  from '../../config/const';
import FormDialog from '../FormDialog/FormDialog';


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
        .then(res => {
            console.log(res.status)
            console.log(res)
            if (res.status == 401){
                console.log('res.status == 401');
                setItems('401');
            }
            if (res.status == 400){
                console.log('res.status == 400');
                setItems('400');
            }
            else res.json()})
        .then(
            (result) => {
                console.log('items:', items);
                console.log("result:",result);
                if (items!='401' && items!='400'){setItems(result);}
                setIsLoaded(true);
            },
            (error) => {
                console.log("Error");
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (items=='401'){
            return (
                <div>
                    <Navigate to="/login"/>
                </div>
            )
        }
        else if (items=='400'){
            return (
                <div>
                    <Navigate to="/logout"/>
                </div>
            )
        }
        else {
            console.log("kiem tra item []",items)
            if(items.length == 0){
                return <div>Bạn chưa tham gia lớp nào!
                    <FormDialog sx={{display:"flex", justifyContent:"flex-end", marginTop:10}}/>    
                </div>;
            }
            else{
                return (
                    <div>
                        <FormDialog sx={{display:"flex", justifyContent:"flex-end", marginTop:10}}/>    
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
                    </div>
                    
                )
                
            }
        }
    }
}
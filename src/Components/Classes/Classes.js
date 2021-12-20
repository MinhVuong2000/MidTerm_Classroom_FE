import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Navigate} from 'react-router-dom';
import Classroom from "../Classroom/Classroom";
import { DOMAIN_API, ENTER_ID_UNI_TITLE, ENTER_ID_UNI_DESC }  from '../../config/const';
import FormDialog from '../FormDialog/FormDialog';
import AlertDialog from '../AlertDialog/AlertDialog';


export default function Classes(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [hasIdUni, setHasIdUni] = useState(true);
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
        .then(res =>res.json())
        .then(
            (result) => {
                console.log('items:', items);
                console.log("result:",result);
                if (result===null){
                    setItems(result);
                    setIsLoaded(true);
                }
                else if(result.message == 'not enroll class'){
                    setItems([]);
                    setIsLoaded(true);
                }
                else{
                    setItems(result);
                    setIsLoaded(true);
                }
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
            if (items === null){
                console.log(hasIdUni);
                return (
                    <div>
                        {hasIdUni ? 
                        <AlertDialog title={ENTER_ID_UNI_TITLE} msg={ENTER_ID_UNI_DESC} callback={() => {setHasIdUni(false)}}/>
                         : <Navigate to='/profile'/>
                        }
                    </div>
                )
            }
            if(items.length == 0){
                return <div>Bạn chưa tham gia lớp nào!
                    <FormDialog sx={{display:"flex", justifyContent:"flex-end", marginTop:10}} setItems={setItems}/>    
                </div>;
            }
            else{
                return (
                    <div>
                        <FormDialog sx={{display:"flex", justifyContent:"flex-end", marginTop:10}} setItems={setItems}/>    
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
                                        <Classroom title={item.class_name} description={item.description} idclass={item.id} setItems={setItems}/>
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
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, BrowserRouter as Router, Routes, Route, Link , useParams} from 'react-router-dom';
import Classroom from "../../Classroom/Classroom";
import {DOMAIN_API}  from '../../../config/const';
import FormDialog from '../../FormDialog/FormDialog';
import OneAssignment from './OneAssignment/OneAssignment';

function HandleAdd(event){
    return null;
}

function handleDelete(event){
    return null;
}



export default function Assignments({idclass}){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [assignmentNameAdded, setAssignmentNameAdded] = useState(null);
    const [assignmentPointAdded, setAssignmentPointAdded] = useState(null);
    
    let actoken = localStorage.getItem('access_token');
    console.log(actoken);
    
    useEffect(() => {
        fetch(DOMAIN_API+`classes/detail/${idclass}/assignments`,{
            method: "GET",
            headers: new Headers({
                "x-access-token": actoken
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                if(result != null){
                    if(result.message){
                        setItems([]);
                        setIsLoaded(true);
                    }
                    else{
                        setIsLoaded(true);
                        setItems(result);
                    }
                    
                }
                if(result==null){
                    setItems(null);
                    setIsLoaded(true);
                }
                
            },
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
        if (items!==null){
            console.log("kiem tra item []",items)
            if(items.length == 0){
                return <div>Không có bất kì bài tập nào cho lớp này!
                    <FormDialog sx={{display:"flex", justifyContent:"flex-end", marginTop:10}}/>    
                </div>;
            }
            else{
                return (
                    <div>
                        <Box component='form'>
                            <TextField 
                                required
                                autoFocus
                                margin="normal"
                                id="assignmentName"
                                label="Tên bài tập muốn thêm"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={assignmentNameAdded}
                                onChange={e => setAssignmentNameAdded(e.target.value)}/>
                            <TextField 
                                required
                                margin="normal"
                                id="assignmentPoint"
                                label="Điểm số của bài tập muốn thêm"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={assignmentPointAdded}
                                onChange={e => setAssignmentPointAdded(e.target.value)}/>
                            <Button onClick={HandleAdd}>Thêm bài tập</Button>
                        </Box>
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
                                        <OneAssignment name={item.name} point={item.point}/>
                                        <Button variant="contained" startIcon={<EditIcon />}>
                                        Chỉnh sửa
                                        </Button>
                                        <Button onClick={handleDelete} variant="contained" color='error' startIcon={<DeleteIcon />}>
                                        Xoá
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </div>
                )
            }
        }
        else{
            return (
                <div>
                    <Navigate to="/login"/>
                </div>
            )
        }
    }
}
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, BrowserRouter as Router, Routes, Route, Link , useParams} from 'react-router-dom';
import Classroom from "../../Classroom/Classroom";
import {DOMAIN_API,
        ERROR_PERMISSIONS_TITLE,
        ERROR_PERMISSIONS_DESC,
        NOT_NULL_VALUE_ADD_ASSIGNMENT_TITLE,
        NOT_NULL_VALUE_ADD_ASSIGNMENT_DESC,
        ERROR_TYPE_POINT_TITLE,
        ERROR_TYPE_POINT_DESC,
    }  from '../../../config/const';
import AlertDialog from '../../AlertDialog/AlertDialog';
import OneAssignment from './OneAssignment/OneAssignment'; 


function isNumericPositive(val) {
    return /[1-9][0-9]*/.test(val);
}

export default function Assignments({idclass}){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [assignmentNameAdded, setAssignmentNameAdded] = useState('');
    const [assignmentPointAdded, setAssignmentPointAdded] = useState('');
    const [openErrorPermission, setOpenErrorPermission] = useState(false);
    const [openNotValueAdd, setOpenNotValueAdd] = useState(false);
    const [openNotTypePoint, setOpenNotTypePoint] = useState(false);
    
    let actoken = localStorage.getItem('access_token');

    function HandleAdd(){
        console.log(assignmentNameAdded,assignmentPointAdded)
        if (assignmentNameAdded === "" || assignmentPointAdded===''){
            setOpenNotValueAdd(() => {return true});
            return;
        }
        if (!isNumericPositive(assignmentPointAdded)){
            setOpenNotTypePoint(() => {return true});
            return;
        }
        const url = DOMAIN_API + `classes/detail/${idclass}/assignments`;
        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ name:assignmentNameAdded, point:assignmentPointAdded})
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if (result=='400' || result=='401')
                    setItems(result)
                else {
                    if (result=='403'){
                        setOpenErrorPermission(()=> {return true;})
                    }
                    else{
                        setItems(result);
                        setAssignmentNameAdded('');
                        setAssignmentPointAdded('');
                    }
                }
            })
            .catch(error => console.log('Form submit error', error))
    }

    async function handleDelete(id_assignment){
        const url = DOMAIN_API + `classes/detail/${idclass}/assignments/detail/${id_assignment}`;
        const requestOptions = {
            method: 'DELETE',
            headers: new Headers({
                "x-access-token": actoken
            })
        };
        await fetch(url, requestOptions)
            .then(res => res.json())
            .then((result) => {
                console.log("result fetch delete assignment",result)
                if (result=='400' ||result=='401')
                    setItems(result)
                else if (result=='403'){
                    setOpenErrorPermission(()=> {return true;})
                }
                else{
                    const new_items = []
                    for(let i=0; i<items.length;i++){
                        if (items[i].id != id_assignment){
                            new_items.push(items[i]);
                        }
                    }
                    setItems(new_items)
                    setAssignmentNameAdded('');
                    setAssignmentPointAdded('');
                }
            })
            .catch(error => console.log('Form submit error', error))
    }
    
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
                console.log('items:', items);
                console.log("result:",result);
                setItems(result);
                setIsLoaded(true);
            },
            (error) => {
                console.log("Error");
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
        console.log("kiem tra item []",items)
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
            if(items.length == 0){
                return <div>Không có bất kì bài tập nào cho lớp này!
                    {openErrorPermission && <AlertDialog title={ERROR_PERMISSIONS_TITLE} msg={ERROR_PERMISSIONS_DESC} callback={() => {setOpenErrorPermission(() => {return false})}}/>}
                    {openNotValueAdd && <AlertDialog title={NOT_NULL_VALUE_ADD_ASSIGNMENT_TITLE} msg={NOT_NULL_VALUE_ADD_ASSIGNMENT_DESC} callback={() => {setOpenNotValueAdd(() => {return false})}}/>}
                    {openNotTypePoint && <AlertDialog title={ERROR_TYPE_POINT_TITLE} msg={ERROR_TYPE_POINT_DESC} callback={() => {setOpenNotTypePoint(() => {return false})}}/>}
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
                </div>;
            }
            else{
                return (
                    <div>
                        {openErrorPermission && <AlertDialog title={ERROR_PERMISSIONS_TITLE} msg={ERROR_PERMISSIONS_DESC} callback={() => {setOpenErrorPermission(() => {return false})}}/>}
                        {openNotValueAdd && <AlertDialog title={NOT_NULL_VALUE_ADD_ASSIGNMENT_TITLE} msg={NOT_NULL_VALUE_ADD_ASSIGNMENT_DESC} callback={() => {setOpenNotValueAdd(() => {return false})}}/>}
                        {openNotTypePoint && <AlertDialog title={ERROR_TYPE_POINT_TITLE} msg={ERROR_TYPE_POINT_DESC} callback={() => {setOpenNotTypePoint(() => {return false})}}/>}
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
                                        <Button onClick={() => handleDelete(item.id)} variant="contained" color='error' startIcon={<DeleteIcon />}>
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
    }
}
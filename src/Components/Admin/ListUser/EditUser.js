import * as React from 'react';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import AlertDialog from '../../AlertDialog/AlertDialog';
import SaveIcon from '@mui/icons-material/Save';
import { DOMAIN_API, 
    ENTER_PASSWORD_TITLE, ENTER_PASSWORD_DESC ,
    ENTER_MSSV_TITLE, ENTER_MSSV_DESC,
    EXISTED_MSSV_TITLE, EXISTED_MSSV_DESC,
    SUCCESS_PASSWORD_TITLE, SUCCESS_PASSWORD_DESC,
    SUCCESS_PROFILE_TITLE, SUCCESS_PROFILE_DESC } from '../../../config/const';
export default function EditUser(props) {
    const { isOpen, isClose, data } = props;
    console.log("data edit user of admin ne: ",data)
    const [open, setOpen] = React.useState(isOpen);
    const [MSSV, setMSSV] = useState(null);
    const [openNullMSSV, setOpenNullMSSV] = useState(false);
    const [openExistedMSSV, setOpenExistedMSSV] = useState(false);
    const [openSuccessChangeProfile, setOpenSuccessChangeProfile] = useState(false);
    const [openSuccessUnmap, setOpenSuccessUnmap] = useState(false);
    let actoken = localStorage.getItem('access_token');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        isClose(false);
    };
    function handleSaveEditStudentID(){
        if (MSSV === '' || MSSV===null){
            setOpenNullMSSV(true);
            return;
        }
        fetch(DOMAIN_API + `is-available-mssv?mssv=` + MSSV, {
            method: 'GET',
            headers: new Headers({
                "x-access-token": actoken,
            }),
        }).then(res =>res.json())
        .then(
            (result) => {
                console.log(result)
                if (result===false)
                    setOpenExistedMSSV(true)
                else{
                    setOpenSuccessChangeProfile(true);
                    const url = DOMAIN_API + `users/admin-update-profile`;
                    
                    const requestOptions = {
                    method: 'PATCH',
                    headers: new Headers({
                        "x-access-token": actoken,
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        id: data.id,
                        id_uni: MSSV.toString(),
                    })
                    };
                    fetch(url, requestOptions)
                    .catch(error => console.log('Form submit error', error))
                    data.id_uni = MSSV.toString();
                    setOpenSuccessChangeProfile(true);
                }
            },
            (error) => {
                console.log("Error", error);
            })
        
    }
    function handleUnmapStudentID(){
        fetch(DOMAIN_API + `users/unmapstudentid`, {
            method: "PATCH",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id: data.id
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Kết quả unmap thành công? ", result);
                    data.id_uni = null;
                    setMSSV(null)
                    setOpenSuccessUnmap(true);
                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error Danh sach cac assignment updateshowstate");

                }
            )
    }
    return (
        <div className="d-flex justify-content-center">
            <Dialog fullWidth open={isOpen} onClose={handleClose}>
                {openExistedMSSV && <AlertDialog title={EXISTED_MSSV_TITLE} msg={EXISTED_MSSV_DESC} callback={() => {setOpenExistedMSSV(false)}}/>}
                {openNullMSSV && <AlertDialog title={ENTER_MSSV_TITLE} msg={ENTER_MSSV_DESC} callback={() => {setOpenNullMSSV(false)}}/>}
                {openSuccessChangeProfile && <AlertDialog title={SUCCESS_PROFILE_TITLE} msg={SUCCESS_PROFILE_DESC} callback={() => {setOpenSuccessChangeProfile(false)}}/>}
                {openSuccessUnmap && <AlertDialog title='UNMAP THÀNH CÔNG' msg='Bạn đã unmap tài khoản này với Student ID cũ thành công' callback={() => {setOpenSuccessUnmap(false)}}/>}
                              
                <DialogTitle style={{ fontSize: "20px" }}>Manage Student ID </DialogTitle>
                <div style={{ paddingLeft: "25px" }}>  User: {data.full_name} - Student ID: {data.id_uni}
                {data.id_uni && 
                        <Button
                            variant="text" 
                            color='error'
                            onClick={handleUnmapStudentID}>
                            Unmap Student ID
                        </Button>
                        }
                </div>
                <form >
                    <DialogContent>
                        
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <TextField
                                    id="MSSV"
                                    label="Student ID"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={MSSV!=null ? MSSV : ''} 
                                    onChange={e => setMSSV(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4} sx={{ pb: 0, mb: 0 }}>
                            <Button
                                sx={{ pb: 0, mb:0 }}
                                variant="outlined" endIcon={<SaveIcon />}
                                onClick={handleSaveEditStudentID}>
                                Save 
                            </Button>
                            </Grid>
                        </Grid>
                        
                        
                        
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => isClose(false)} variant="contained" color="secondary">Close</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

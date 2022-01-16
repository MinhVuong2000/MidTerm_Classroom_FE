import * as React from 'react';
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
import { DOMAIN_API } from '../../../config/const';
import { useState, useEffect } from "react";
export default function AddNewAdmin(props) {
    const { isOpen, isClose, setListAdminInfo } = props;
    const [open, setOpen] = React.useState(isOpen);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    let actoken = localStorage.getItem('access_token');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        isClose(false);
    };
    function handleChangeUsername(event) {
        setUsername(event.target.value)
    }
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }
    function handleChangeFullname(event) {
        setFullname(event.target.value)
    }
    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        fetch(DOMAIN_API+`is-available-admin`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
        })
        .then(res => res.json())
        .then(
            (result)=>{
                console.log(result);
                if(result == true){
                    if (username !== '' && password !== '' && email!=='' && fullname!=='') {
                        const url = DOMAIN_API + "registeradmin";
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ username, password, fullname, email })
                        };
                        fetch(url, requestOptions)
                        .then(res => res.json())
                        .then((result) => {
                            console.log(result);
                            if(result != false){
                                setListAdminInfo(result)
                                setOpen(false);
                                isClose(false);
                            }
                        })
                        .catch(error => console.log('Form submit error', error))
                    }
                    else{
                        if(username == '') window.alert("Username không được trống!");
                        else{
                            if(password == '') window.alert("Password không được trống!");
                            else{
                                if(email == '') window.alert("Email không được trống!");
                                else{
                                    if(fullname == '') window.alert("Họ tên không được trống!");
                                }
                            }
                        }
                    }
                }
                else{
                   window.alert(result.message);
                }
            }
        )
    };
    return (
        <div>
            <Dialog fullWidth open={isOpen} onClose={handleClose}>
                <DialogTitle style={{ fontSize: "20px" }}>Create New Admin</DialogTitle>
                <form >
                    <DialogContent>

                        {/* ============================================ */}

                        <Grid item xs={12}>

                            <TextField
                                value={username} onChange={handleChangeUsername}
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="user_name"
                                label="User Name"
                                type="text"
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12}>

                            <TextField
                                value={password} onChange={handleChangePassword}
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="password"
                                label="Password"
                                type="text"
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12}>

                            <TextField
                                value={fullname} onChange={handleChangeFullname}
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="name"
                                label="Fullname"
                                type="text"
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12}>

                            <TextField
                                value={email} onChange={handleChangeEmail}
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="mail"
                                label="Email"
                                type="text"
                            />
                        </Grid>
                        <br />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => isClose(false)} variant="contained" color="secondary">Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" color="success">Add</Button>

                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

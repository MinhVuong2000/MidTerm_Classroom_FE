import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { DOMAIN_API, DOMAIN_FE } from '../../../config/const';
import DownloadButton from '../../DownloadButton/DownloadButton';
import StudentListImport from '../../ImportFile/StudentListImport/StudentListImport';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function Member({ idclass, isTeacher, class_name }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [checkTeacher, setCheckTeacher] = useState(false);

    const actions = [
        { icon: <FileDownloadIcon />, name: 'Download templatte', operation: 'download_template' },

        { icon: <UploadIcon />, name: 'Upload file', operation: 'upload_file' },

        //   { icon: <PrintIcon />, name: 'Print' },
        //   { icon: <ShareIcon />, name: 'Share' },
    ];

    function handleClickDownUp(e, operation) {
        e.preventDefault();
        if (operation == "download_template") {
            alert("hihi")

        } else if (operation == "upload_file") {
            alert("huhu")

        }
    };

    let actoken = localStorage.access_token;
    const url = DOMAIN_API + `classes/detail/${idclass}`;
    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (email !== '') {
            const url2 = DOMAIN_API + `classes/sendinvite/${class_name}`;

            fetch(url2, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', "x-access-token": actoken },
                body: JSON.stringify({ email })
            })
                .then(res => res.json())
                .then((result) => {
                    if (result == true) {
                        window.alert("Da gui thanh cong");
                    }
                    else {
                        window.alert("Gui that bai");
                    }
                })
                .catch(error => console.log('Form submit error', error))
        }
        else {
            window.alert("Email kh??ng ???????c tr???ng!");
        }
    }
    function handleSubmitTeacher(event) {
        event.preventDefault();
        if (email !== '') {
            const url2 = DOMAIN_API + `classes/sendinviteteacher/${class_name}`;

            fetch(url2, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', "x-access-token": actoken },
                body: JSON.stringify({ email })
            })
                .then(res => res.json())
                .then((result) => {
                    if (result == true) {
                        window.alert("Da gui thanh cong");
                    }
                    else {
                        window.alert("Gui that bai");
                    }
                })
                .catch(error => console.log('Form submit error', error))
        }
        else {
            window.alert("Email kh??ng ???????c tr???ng!");
        }
    }
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: new Headers({
                "x-access-token": actoken
            })
        })
            .then(res => res.json())
            .then(
                (result) => {

                    if (result != null) {
                        if (result.message) {
                            console.log(result.message);
                            setIsLoaded(true);
                        }
                        else {
                            setIsLoaded(true);
                            setTeachers(result.list_teacher);
                            setStudents(result.list_student);
                            if (result.isTeacher) {
                                setCheckTeacher(true);
                            }
                        }
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
        if (checkTeacher) {
            return (
                <div  style={{padding: "20px"}}>
                <div className="row"> 
                <div className="col-md-2">
                <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1,  left: 16 }}>
                    <div style={{paddingBottom:"10px"}}>
                    <DownloadButton purpose='student_list' />
                    </div>
                    <div>                   
                    <StudentListImport setStudents={setStudents} students_ids={students.map(student => student.id_uni_user)} id_class={idclass} />
                    </div>
                    </Box>
                </div>
                    
                    <div className="col-md-10" >
                        <div className="card" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                            
                            <div className="row" >
                                <div className='card-header'>
                                    <form>
                                        <h3>M???i th??nh vi??n m???i</h3>

                                        <div className="form-group">
                                            <label>Nh???p Email mu???n m???i</label>
                                            <input type="text" name="email" id="username" className="form-control" placeholder="Nh???p Email" value={email} onChange={handleChangeEmail} />
                                        </div>
                                        <button type="submit" onClick={handleSubmitTeacher} style={{ marginTop: "10px",marginRight: "20px"}} className="btn btn-primary btn-block">M???i gi??o vi??n</button>
                                        <button type="submit" onClick={handleSubmit} style={{ marginTop: "10px" }} className="btn btn-primary btn-block">M???i h???c sinh</button>
                                    </form>
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <h3>Danh s??ch th??nh vi??n</h3>
                                </div>
                                <div>

                                    <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                                        Gi???ng vi??n
                                    </Typography>
                                    <Grid container spacing={2}  >

                                        {teachers.map(teacher =>
                                            <Grid item xs={12} md={6}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            Ava
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText>{teacher.full_name}</ListItemText>
                                                </ListItem>
                                            </Grid>
                                        )}
                                    </Grid>



                                </div>
                                <div>



                                    <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                                        Sinh vi??n
                                    </Typography>
                                    <Grid container spacing={2}  >
                                        {students.map(std =>
                                            <Grid item xs={6}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            Ava
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText>{std.full_name_user}</ListItemText>
                                                </ListItem>
                                            </Grid>
                                        )}

                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )
        }
        else {
            return (
                <div className="container">
                <div className="row" >
                   <div style={{ marginTop: "10px" }}>
                                    <h3>Danh s??ch th??nh vi??n</h3>
                                </div>
                                <div>
                                    <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                                        Gi???ng vi??n
                                    </Typography>
                                    <Grid container spacing={2}  >
                                        {teachers.map(teacher =>
                                            <Grid item xs={12} md={6}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            Ava
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText>{teacher.full_name}</ListItemText>
                                                </ListItem>
                                            </Grid>
                                        )}
                                    </Grid>



                                </div>
                                <div>
                                    <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                                        Sinh vi??n
                                    </Typography>
                                    <Grid container spacing={2}  >
                                        {students.map(std =>
                                            <Grid item xs={6}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            Ava
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText>{std.full_name_user}</ListItemText>
                                                </ListItem>
                                            </Grid>
                                        )}

                                    </Grid>
                                </div>
                </div>
                </div>
            )
        }

    }
}

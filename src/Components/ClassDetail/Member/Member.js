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
                headers: { 'Content-Type': 'application/json' },
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
            window.alert("Email không được trống!");
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
        console.log('is teacher true ne', checkTeacher);
        console.log('List student', students);
        if (checkTeacher) {
            return (
                <div className='container'>
                    <div className="card" style={{paddingLeft: "10px", paddingRight: "10px"}}>
                    <DownloadButton purpose='student_list'/>
                    <StudentListImport setStudents={setStudents} students_ids={students.map(student=>student.id_uni_user)} id_class={idclass}/>
                    <div className="row" >
                        <div className='card-header'>
                        <form>
                            <h3>Mời bạn bè</h3>

                            <div className="form-group">
                                <label>Nhập Email muốn mời</label>
                                <input type="text" name="email" id="username" className="form-control" placeholder="Nhập Email" value={email} onChange={handleChangeEmail} />
                            </div>
                            <button type="submit" onClick={handleSubmit} style={{marginTop: "10px"}} className="btn btn-primary btn-block">Mời</button>

                        </form>
                        </div>
                        <div style={{marginTop: "10px"}}>
                        <h3>Danh sách thành viên</h3>
                        </div>
                        <Grid container spacing={2}>
                        
                            <Grid item xs={12} md={6}>
                                <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                                    Giảng viên
                                </Typography>
                                <Demo>
                                    <List >
                                        {teachers.map(teacher =>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        Ava
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>{teacher.full_name}</ListItemText>
                                            </ListItem>
                                        )}
                                    </List>
                                </Demo>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                                    Sinh viên
                                </Typography>
                                <Demo>
                                    <List>
                                        {students.map(std =>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        Ava
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>{std.full_name_user}</ListItemText>
                                            </ListItem>
                                        )}
                                    </List>
                                </Demo>
                            </Grid>
                        </Grid>
                    </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="row" >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                Giảng viên
                            </Typography>
                            <Demo>
                                <List >
                                    {teachers.map(teacher =>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    Ava
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>{teacher.full_name}</ListItemText>
                                        </ListItem>
                                    )}
                                </List>
                            </Demo>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                Sinh viên
                            </Typography>
                            <Demo>
                                <List>
                                    {students.map(std =>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    Ava
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>{std.full_name_user}</ListItemText>
                                        </ListItem>
                                    )}
                                </List>
                            </Demo>
                        </Grid>
                    </Grid>
                </div>
            )
        }

    }
}

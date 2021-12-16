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
import GradeAssignmentImport from '../../ImportFile/GradeAssignmentImport/GradeAssignmentImport';
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
                    <DownloadButton purpose='grade_assignment'/>
                    <GradeAssignmentImport setStudents={setStudents} students_ids={students.map(student=>student.id_uni)} id_class={idclass} id_assignment={4}/>
                    <div className="row" >
                        
                        <div style={{marginTop: "10px"}}>
                        <h3>Danh sách thành viên</h3>
                        </div>
                        <Grid container spacing={2}>
                        
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
                                                <ListItemText>{std.full_name}</ListItemText>
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
                                            <ListItemText>{std.full_name}</ListItemText>
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

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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

export default function Member({teachers, students}) {
    /*const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);*/

    /*useEffect(() => {
        fetch(`http://localhost:3000/classes/detail/${idclass}`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              console.log(result);
              setTeachers(result.list_teacher);
              setStudents(result.list_student);
              setItems(result);
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
                
        }}*/
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

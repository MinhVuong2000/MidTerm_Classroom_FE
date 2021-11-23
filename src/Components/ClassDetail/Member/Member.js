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

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}
useEffect(() => {
    fetch("http://localhost:3000/classes/2")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          
          let liststudent = {};
          let listteacher = {};

          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function Member() {
    return (
        <div className="row" >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Giảng viên
                    </Typography>
                    <Demo>
                        <List >
                            {generate(
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            Ava
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>Nguyễn Văn A</ListItemText>
                                    
                                </ListItem>,
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
                            {generate(
                                <ListItem

                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            Ava
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>Nguyễn Văn B</ListItemText>
                                </ListItem>,
                            )}
                        </List>
                    </Demo>
                </Grid>
            </Grid>

        </div>
    )
}

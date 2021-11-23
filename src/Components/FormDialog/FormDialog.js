import * as React from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertDialog from '../AlertDialog/AlertDialog';
import Tooltip from '@mui/material/Tooltip';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


import {
    DOMAIN_API, DOMAIN_FE,
    EXISTED_CLASS_TITLE, EXISTED_CLASS_DESC,
    NOT_NULL_CLASS_TITLE, NOT_NULL_CLASS_DESC,
    ADD_SUCCESS_TITLE, ADD_SUCCESS_DESC
} from '../../config/const'

const $ = require("jquery");


export default function FormDialog({ sx }) {
    //   const [openForm, setOpenForm] = React.useState(false);
    //   const [openNotNullNameClass, setOpenNotNullNameClass] = React.useState(false);
    //   const [openExistedClass, setOpenExistedClass] = React.useState(false);
    //   const [openAddSuccess, setOpenAddSuccess] = React.useState(false);
    //   const [classAdded, setClassAdded] = React.useState("");

    //   const handleClickOpen = () => {
    //     setOpenForm((openForm) => {return true});
    //   };

    //   const handleClose = () => {
    //     setOpenForm((openForm) => {return false});
    //   };

    //   const handleAdd = () => {
    //     if (classAdded === ""){
    //         setOpenNotNullNameClass((openNotNullNameClass) => {return true});
    //     }
    //     else {
    //         $.getJSON(DOMAIN_API+`classes/isExistedClassName?checked_name=${classAdded}`, function(data){
    //             if (data===true){
    //                 setOpenExistedClass((openExistedClass) => {return true});
    //             }
    //             else{
    //             const data = {'class_name':classAdded}
    //             $.post(DOMAIN_API+`classes/`, data, function(data){
    //                 setOpenAddSuccess((openAddSuccess) => {return true});
    //             })
    //             }
    //         })
    //     }
    //   };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={sx}>
            {/* <Tooltip title="Add">
        <Button variant="outlined" onClick={handleClickOpen}>
        <AddCircleOutlineRoundedIcon color="primary" />
        </Button>
      </Tooltip>
      {openExistedClass && <AlertDialog title={EXISTED_CLASS_TITLE.replace("{}",classAdded)} msg={EXISTED_CLASS_DESC} callback={() => {setOpenExistedClass((openExistedClass) => {return false})}}/>}
      {openNotNullNameClass && <AlertDialog title={NOT_NULL_CLASS_TITLE} msg={NOT_NULL_CLASS_DESC} callback={() => {setOpenNotNullNameClass((openNotNullNameClass) => {return false})}}/>}
      {openAddSuccess && <AlertDialog title={ADD_SUCCESS_TITLE} msg={ADD_SUCCESS_DESC.replace("{}",classAdded)} callback={() => {document.location.href = DOMAIN_FE;}}/>}
      <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>Add new Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new classroom, please enter its name here. It is display name for this new class
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="className"
            label="Class's Name"
            type="text"
            fullWidth
            variant="standard"
            value={classAdded}
            onChange={e => setClassAdded(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog> */}


            {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="Action">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 0 }}>
                        <Fab color="light" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </IconButton>
                </Tooltip>
            </Box> */}
            {/* <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            //transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu> */}
        </div>
    );
}

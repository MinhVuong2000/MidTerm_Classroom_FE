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


export default function AddNewAdmin(props) {
    const { isOpen, isClose } = props;
    const [open, setOpen] = React.useState(isOpen);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        isClose(false);
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
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="name"
                                label="Name"
                                type="text"
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12}>

                            <TextField
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
                        <Button onClick={() => isClose(false)} variant="contained" color="success">Add</Button>

                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

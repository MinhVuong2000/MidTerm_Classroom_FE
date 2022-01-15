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


export default function DetailUser(props) {
    const { isOpen, isClose, data } = props;
    console.log("data ne: ",data)
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
                <DialogTitle style={{ fontSize: "20px" }}>Detail User </DialogTitle>
                <form >
                    <DialogContent>

                        {/* ============================================ */}

                        <Grid item xs={12}>

                            <TextField
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="full_name"
                                label="Full Name"
                                type="text"
                                defaultValue={data.full_name}
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12}>

                            <TextField
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="studentID"
                                label="Student ID"
                                type="text"
                                defaultValue={data.id_uni}
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12}>

                            <TextField
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="email"
                                label="Email"
                                type="text"
                                defaultValue={data.email}
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
                        </Grid>
                        <br /><Grid item xs={12}>

                        <TextField
                            variant="standard"
                            sx={{ width: 550 }}
                            id="outlined-helperText"
                            name="createTime"
                            label="Create time"
                            type="text"
                            defaultValue={data.create_time}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        </Grid>
                        <br />
                        <Grid item xs={12}>

                            <TextField
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="address"
                                label="Address"
                                type="text"
                                defaultValue={data.address}
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
                        </Grid>
                        <br />
                        <Grid item xs={12}>

                            <TextField
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="phone"
                                label="Phone"
                                type="text"
                                defaultValue={data.phone}
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
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

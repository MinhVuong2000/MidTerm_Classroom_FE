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


export default function DetailClass(props) {
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
                <DialogTitle style={{ fontSize: "20px" }}>Detail Class</DialogTitle>
                <form >
                    <DialogContent>

                        {/* ============================================ */}

                        <Grid item xs={12}>

                            <TextField
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="classname"
                                label="Classname"
                                type="text"
                                defaultValue={data.class_name}
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
                                name="description"
                                label="Description"
                                type="text"
                                defaultValue={data.description}
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
                                name="code"
                                label="Code"
                                type="text"
                                defaultValue={data.code}
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
                        </Grid>
                        <br/>
                        <Grid item xs={12}>

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


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => isClose(false)} variant="contained" color="secondary">Close</Button>
                       

                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

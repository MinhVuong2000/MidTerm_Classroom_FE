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
import { DOMAIN_API, DOMAIN_FE,
    EXISTED_CLASS_TITLE, EXISTED_CLASS_DESC,
    NOT_NULL_CLASS_TITLE, NOT_NULL_CLASS_DESC,
    ADD_SUCCESS_TITLE, ADD_SUCCESS_DESC
} from '../../config/const'

const $ = require("jquery");


export default function FormDialog({sx}) {
  const [openForm, setOpenForm] = React.useState(false);
  const [openNotNullNameClass, setOpenNotNullNameClass] = React.useState(false);
  const [openExistedClass, setOpenExistedClass] = React.useState(false);
  const [openAddSuccess, setOpenAddSuccess] = React.useState(false);
  const [classAdded, setClassAdded] = React.useState("");

  const handleClickOpen = () => {
    setOpenForm((openForm) => {return true});
  };

  const handleClose = () => {
    setOpenForm((openForm) => {return false});
  };

  const handleAdd = () => {
    if (classAdded === ""){
        setOpenNotNullNameClass((openNotNullNameClass) => {return true});
    }
    else {
        $.getJSON(DOMAIN_API+`classes/isExistedClassName?checked_name=${classAdded}`, function(data){
            if (data===true){
                setOpenExistedClass((openExistedClass) => {return true});
            }
            else{
            const data = {'class_name':classAdded}
            $.post(DOMAIN_API+`classes/`, data, function(data){
                setOpenAddSuccess((openAddSuccess) => {return true});
            })
            }
        })
    }
  };
  
  return (
    <div style={sx}>
      <Tooltip title="Add">
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
      </Dialog>
    </div>
  );
}

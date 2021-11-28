import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertDialog from '../AlertDialog/AlertDialog';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DOMAIN_API, DOMAIN_FE,
    EXISTED_CLASS_TITLE, EXISTED_CLASS_DESC,
    NOT_NULL_CLASS_TITLE, NOT_NULL_CLASS_DESC,
    ADD_SUCCESS_TITLE, ADD_SUCCESS_DESC
} from '../../config/const'

const $ = require("jquery");


export default function FormDialog({sx, setItems}) {
  const [openForm, setOpenForm] = useState(false);
  const [openNotNullNameClass, setOpenNotNullNameClass] = useState(false);
  const [openExistedClass, setOpenExistedClass] = useState(false);
  const [openAddSuccess, setOpenAddSuccess] = useState(false);
  const [classAdded, setClassAdded] = useState("");
  const [description, setDescription] = useState("");

  const handleClickOpen = () => {
    setOpenForm(() => {return true});
  };

  const handleClose = () => {
    setOpenForm(() => {return false});
  };

  const handleAdd = () => {
    if (classAdded === ""){
        setOpenNotNullNameClass(() => {return true});
    }
    else {
        $.ajax({
            url: DOMAIN_API+`classes/isExistedClassName?checked_name=${classAdded}`,
            type: 'get',
            headers: {
              "x-access-token": localStorage.getItem('access_token')
            },
            success: function(data){
              if (data===true){
                  setOpenExistedClass(() => {return true});
              }
              else{
              const data = {'class_name':classAdded, 'description': description}
              $.ajax({
                url: DOMAIN_API+`classes/`,
                type: 'post',
                data: data,
                headers: {
                  "x-access-token": localStorage.getItem('access_token')
                },
                dataType: 'json',
                success: function (data) {
                  setOpenAddSuccess(() => {return true});
                  setItems(data);
                }
              });
            }
          }
        })
    }
  };
  
  return (
    <div style={sx}>
      <Tooltip title="Create Class">
        <Button variant="outlined" onClick={handleClickOpen}>
        <AddCircleOutlineIcon color="primary" /> Create Class
        </Button>
      </Tooltip>
      {openExistedClass && <AlertDialog title={EXISTED_CLASS_TITLE.replace("{}",classAdded)} msg={EXISTED_CLASS_DESC} callback={() => {setOpenExistedClass((openExistedClass) => {return false})}}/>}
      {openNotNullNameClass && <AlertDialog title={NOT_NULL_CLASS_TITLE} msg={NOT_NULL_CLASS_DESC} callback={() => {setOpenNotNullNameClass((openNotNullNameClass) => {return false})}}/>}
      {openAddSuccess && <AlertDialog title={ADD_SUCCESS_TITLE} msg={ADD_SUCCESS_DESC.replace("{}",classAdded)} callback={handleClose}/>}
      <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>Thêm lớp mới</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập tên và miêu tả về lớp bạn muốn thêm tại đây.
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
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={e => setDescription(e.target.value)}
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

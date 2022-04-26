import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AlertDialog from '../AlertDialog/AlertDialog';
import Tooltip from '@mui/material/Tooltip';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DOMAIN_API, NOT_NULL_CLASS_CODE,NOT_EXIST_CLASS_CODE
} from '../../config/const'

const $ = require("jquery");


export default function JoinClass({sx, setItems}) {
  const [openForm, setOpenForm] = useState(false);
  const [openNotNullClassCode, setOpenNotNullClassCode] = useState(false);
  const [openNotExistedClass, setOpenNotExistedClass] = useState(false);
  const [classCode, setClassCode] = useState("");

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpenForm(() => {return true});
  };

  const handleClose = () => {
    setOpenForm(() => {return false});
  };

  const handleAdd = () => {
    if (classCode === ""){
        setOpenNotNullClassCode(() => {return true});
    }
    else {
        $.ajax({
            url: DOMAIN_API+`classes/isExistedClassCode?checked_code=${classCode}`,
            type: 'get',
            headers: {
              "x-access-token": localStorage.getItem('access_token')
            },
            success: function(data){
              console.log("@@@@@@@@@@idclass: ", data);
              if (data===false){
                setOpenNotExistedClass(() => {return true});
              }
              else{
                  let idclass = data;
                  let path = '/classes/' + data;
                  navigate(path);
              }
          }
        })
    }
  };
  
  return (
    <div style={sx}>
      <Tooltip title="Join Class">
        <Button variant="outlined" onClick={handleClickOpen}>
        <ArrowBackIcon color="primary" /> Tham gia lớp học
        </Button>
      </Tooltip>
      {openNotExistedClass && <AlertDialog title={NOT_EXIST_CLASS_CODE.replace("{}",classCode)} msg={NOT_EXIST_CLASS_CODE} callback={() => {setOpenNotExistedClass((openNotExistedClass) => {return false})}}/>}
      {openNotNullClassCode && <AlertDialog title={NOT_NULL_CLASS_CODE} msg={NOT_NULL_CLASS_CODE} callback={() => {setOpenNotNullClassCode((openNotNullClassCode) => {return false})}}/>}
      <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>Tham gia lớp học bằng mã code</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="className"
            label="Mã của lớp học"
            type="text"
            fullWidth
            variant="standard"
            value={classCode}
            onChange={e => setClassCode(e.target.value)}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleAdd}>Tham gia</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

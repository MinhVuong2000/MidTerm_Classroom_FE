import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, TextField } from '@mui/material';
import { DOMAIN_API, DOMAIN_FE } from '../../../config/const';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({ rowSelected, Swi, idclass }) {
  console.log("Data truyền vào:   ",rowSelected)
  const tam = []
  for (var i = 0; i < rowSelected[0].listGrade.length - 1; i++) {
    /*if(rowSelected[0].listGrade[i].gradeAssignment == null){
      rowSelected[0].listGrade[i].gradeAssignment = '';
    }*/
    tam.push(rowSelected[0].listGrade[i]);
  }
  
  //listAssign - Là cái list cần lấy ----------------------------------------------------------------
  const [listAssign, setListAssign] = React.useState(tam);
  console.log("Data sau khi xử lý:   ",listAssign)
  const [open, setOpen] = React.useState(true);
  const [nameStudent, setNameStudent]=React.useState(rowSelected[0].name);
  const [idStudent, setidStudent]=React.useState(rowSelected[0].idUserStudent);
  const handleClose = () => {
    setOpen(false);
    Swi(false, 0);
  };
  const handleChange = (event, index) => {
    const clonedData = [...listAssign];
    //console.log("cloneData: ", clonedData)
    clonedData[index].gradeAssignment = event.target.value;
    setListAssign(clonedData);
  };

  const handleClickUpdateGrade = () => {
    console.log("idclass trong edit diem: ", idclass);
    const url = DOMAIN_API + `classes/detail/${idclass}/assignments/updategradestudent`;
    const actoken = localStorage.getItem('access_token');
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
          "x-access-token": actoken,
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
          update_user_grade: listAssign,
          id_class: idclass,
          id_uni_user: idStudent
      })
    };
    fetch(url, requestOptions)
    .then(res => res.json())
    .then((result) => {
        console.log(result)
        setOpen(false);
        Swi(false, 0);
    })
    .catch(error => console.log('Form submit error', error))
    
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Chỉnh sửa điểm học viên
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          
          Student: {nameStudent}
          <Box component='form' className="container" style={{ paddingTop: "10px" }}>
            <div className="card" style={{ padding: "15px" }}>
              
              {listAssign.map((arr, index) =>
                <TextField
                  key={index}
                  margin="normal"
                  id={index}
                  label={arr.nameAssignment}
                  type="input"
                  fullWidth
                  variant="standard"
                  value={arr.gradeAssignment}
                  name={arr.nameAssignment}
                  onChange={(e) => handleChange(e, index)}

                />)
              }

              <Button onClick={handleClickUpdateGrade}>Cập nhật</Button>
            </div>
          </Box>

        </List>
      </Dialog>
    </div>
  );
}

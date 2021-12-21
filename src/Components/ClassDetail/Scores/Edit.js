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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({ rowSelected, Swi }) {
  console.log("Data truyền vào:   ",rowSelected)
  var tam = []
  for (var i = 0; i < rowSelected[0].listGrade.length - 1; i++) {
    tam.push(rowSelected[0].listGrade[i]);
  }
  // const [listAssign, setListAssign] = React.useState(rowSelected[0].listGrade);

  //listAssign - Là cái list cần lấy ----------------------------------------------------------------
  const [listAssign, setListAssign] = React.useState(tam);
  console.log("Data sau khi xử lý:   ",listAssign)
  const [open, setOpen] = React.useState(true);
  const [nameStudent, setNameStudent]=React.useState(rowSelected[0].name);


  const handleClose = () => {
    setOpen(false);
    Swi(false, 0);
  };
  const handleChange = (event, index) => {
    // console.log("event nè", event.target.name)
    // console.log("key nè", event.target.id)
    // console.log("value nè", event.target.value)
    //console.log("index nè", index)
    //setName(event.target.value);
    // var temp=listAssign;
    //temp[0].gradeAssignment=9;
    //listAssign[event.target.id].gradeAssignment=event.target.value
    //console.log("list hiện tại nè", listAssign)
    // setListAssign(temp);

    const clonedData = [...listAssign];
    //console.log("clonedData hiện tại nè", clonedData[index])
    clonedData[index].gradeAssignment = event.target.value;
    setListAssign(clonedData);

  };


  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              Lưu
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {/* <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem> */}
          Student: {nameStudent}
          <Box component='form' className="container" style={{ paddingTop: "10px" }}>
            <div className="card" style={{ padding: "15px" }}>
              {/* <TextField
                id="outlined-name"
                label="Name"
                value={name}
                onChange={handleChange}
              /> */}
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

                // value={assignmentNameAdded}
                // onChange={e => setAssignmentNameAdded(e.target.value)} 
                />)
              }

              <Button >Cập nhật</Button>
            </div>
          </Box>

        </List>
      </Dialog>
    </div>
  );
}

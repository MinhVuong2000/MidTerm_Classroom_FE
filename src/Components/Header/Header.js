import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { lightGreen, pink } from '@mui/material/colors';
import { Navigate, Link, useNavigate   } from 'react-router-dom';



export default function PrimarySearchAppBar() {

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
      },
    },  
  });

  function handleClickLogin() {
    navigate('/login');
  }

 

  return (
    <div sx={{ flexGrow: 1 }}  >
      <AppBar position="static" theme={theme}>
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' },fontWeight: 'bold', color:"#1b5e20"}}
          >
            KOLsMarketing
          </Typography>
          <Typography  
           noWrap
           component="div"
           sx={{ fontWeight: 'bold', marginLeft:"30px", color:"#212121"}}>
          Cơ hội
          </Typography>
          <Typography
           noWrap
           component="div"
           sx={{ fontWeight: 'bold', marginLeft:"30px", color:"#212121"}}>
          Nhãn hàng
          </Typography>
          
          
          <Box sx={{ flexGrow: 1 }} >
          
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button style={{textTransform: 'capitalize'}} variant="contained" color="success" onClick={handleClickLogin}>
            Đăng nhập </Button>
            <Button style={{marginLeft: "10px",  textTransform: 'capitalize'}} variant="outlined" color="success">Đăng ký</Button>
            <Button style={{marginLeft: "10px", textTransform: 'capitalize'}} variant="contained" color="success">Đăng tin & Tìm KOLs</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

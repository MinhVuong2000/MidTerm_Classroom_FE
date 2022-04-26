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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import './header.css'

import Check from '@mui/icons-material/Check';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LogOutComponent from '../LogOut/LogOut';
import { DOMAIN_API } from '../../config/const';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({ socket, isLogined, navigate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notification, setNotification] = React.useState(null);
  const [listNotifications, setListNotifications] = React.useState([]);
  const [unreadNotiCount, setUnreadNotiCount] = React.useState(0);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const open = Boolean(anchorEl);
  const openNoti = Boolean(notification);

  function HandleLogout() {
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("check_admin");
    // window.location.reload();
    navigate('/logout');
    // return <LogOutComponent socket={socket} />
  }

  React.useEffect(() => {
    console.log('Get noti from db');
    fetch(DOMAIN_API + `users/notifications`, {
      method: "GET",
      headers: new Headers({
        "x-access-token": localStorage.getItem('access_token'),
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (!(result === '400' || result === '401' || result === '403')) {
            console.log("Get noti: ", result);
            setListNotifications(result);
            setUnreadNotiCount(result.filter((noti) => noti.status === 0).length)
          }
        },
        (error) => {
          console.log("Error get notifications", error);
        }
      )
  }, [socket])

  React.useEffect(() => {
    console.log('socket in header', socket);
    socket?.on("getNotifications", (data) => {
      setListNotifications((prev) => [data, ...prev]);
      setUnreadNotiCount((prev) => prev + 1);
    });

  }, [socket]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Notification
  const handleClickNoti = (event) => {
    setNotification(event.currentTarget);
  };
  const handleCloseNoti = () => {
    setNotification(null);
  };

  const handleMarkAllasRead = () => {
    if (unreadNotiCount !== 0) {
      setUnreadNotiCount(0);
      setListNotifications(prev => {
        const new_notis = prev.slice();
        for (let i = 0; i < new_notis.length; i++)
          new_notis[i].status = 1;
        return new_notis;
      })
      console.log('List notis after mark all as read', listNotifications)
      fetch(DOMAIN_API + `users/notifications-mark-all-as-read`, {
        method: "PATCH",
        headers: new Headers({
          "x-access-token": localStorage.getItem('access_token'),
        }),
      })
    }
  }
  const handleMarkOneasRead = (status, id, id_class) => {
    if (status === 0) {
      setUnreadNotiCount(prev => prev - 1);
      console.log('List notis after mark one as read', id, ":", listNotifications)
      fetch(DOMAIN_API + `users/notifications-mark-one-as-read`, {
        method: "PATCH",
        headers: new Headers({
          "x-access-token": localStorage.getItem('access_token'),
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          id: id,
        })
      })
        .then(res => res.json())
        .then(
          (result) => {
            console.log("Success mark one as read", id, ":", result);
            setListNotifications(prev => {
              const new_notis = prev.slice()
              for (let i = 0; i < new_notis.length; i++) {
                if (new_notis[i].id === id) {
                  new_notis[i].status = 1;
                }
              }
              return new_notis;
            });
            // window.location.href = `/classes/${id_class}`;
          },
          (error) => {
            console.log("Error mark one as read", id, ":", error);

          }
        )
    }
  }

  const menuId = 'primary-search-account-menu';
  const menuNotiId = 'notification-menu';
  const renderMenu = (
    <Menu
      id={menuId}
      keepMounted
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
      <MenuItem onClick={() => navigate('/profile')} style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }} >
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        Profile

      </MenuItem>
      {/* <MenuItem >Create class</MenuItem>
      <Divider />
      <MenuItem >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem> */}
      <MenuItem onClick={e => HandleLogout(socket)}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const renderNotification = (
    <Menu
      id={menuNotiId}
      keepMounted
      anchorEl={notification}
      open={openNoti}
      onClose={handleCloseNoti}
      onClick={handleCloseNoti}
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
      <div className="d-flex justify-content-center"
        style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }}>
        Thông báo
      </div>
      <Divider />
      <Divider />
      {listNotifications.length === 0 ?
        <MenuItem >
          <div >
            <Typography variant="body2" noWrap sx={{ textOverflow: "ellipsis", width: '400px', overflow: 'hidden', fontSize: "16px", fontWeight: "bold" }}  >
              Không có thông báo
            </Typography>
          </div>
        </MenuItem>
        :
        <div>
          {listNotifications.map(noti =>
            <MenuItem onClick={() => handleMarkOneasRead(noti.status, noti.id, noti.id_class)} style={{ color: noti.status === 1 ? 'gray' : 'black' }}>
              <div>
                <Typography variant="body2" noWrap sx={{ textOverflow: "ellipsis", width: '400px', overflow: 'hidden', fontSize: "16px", fontWeight: "bold" }}  >
                  {`${noti.class_name}`}
                </Typography>
                <Typography variant="body2" noWrap sx={{ textOverflow: "ellipsis", width: '400px', overflow: 'hidden' }} >
                  {`${noti.message}`}
                  <br />
                </Typography>
              </div>
            </MenuItem>
          )}
          <Divider />
          <MenuItem onClick={handleMarkAllasRead}>
            <ListItemIcon style={{ color: unreadNotiCount !== 0 ? "blue" : 'gray' }}>
              <Check />Đánh dấu đã đọc
            </ListItemIcon>
          </MenuItem>
        </div>
      }
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography

            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >

            <Link onClick={() => navigate('/')} style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>Classroom TVT</Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <IconButton
              size="large"
              aria-label={`show ${unreadNotiCount} new notifications`}
              color="inherit"
              onClick={handleClickNoti}
            >
              <Badge badgeContent={unreadNotiCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>


            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              // aria-controls={mobileMenuId}
              aria-haspopup="true"
             // onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {renderNotification}
      {renderMenu}
    </Box>
  );
}

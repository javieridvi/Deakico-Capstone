import { Button, ButtonGroup, Grid, Typography, IconButton, Menu, MenuItem, Link, Box, Divider} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import authService from "../../../services/auth/auth.service";
import userService from "../../../services/user.service";


export default function Account() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [loggedIn, setLoggedIn] = useState(undefined);
  const [currUser, setCurrUser] = useState(undefined);

  const checkLoggedIn = () => {
    setLoggedIn(authService.isLoggedIn());
  }
  
  const checkCurrUser = () => {
    setCurrUser(userService.getUser()?.then((res) => {
      setCurrUser(res.data);
    }).catch((err) => {
      console.log(err);
    }));
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    location.reload();
  }

  function MenuLink(props) {
    return (
      <MenuItem onClick={props.onClick}>
        <Link href={props.link} underline='none'>{props.children}</Link>
      </MenuItem>

    );
  };

  useEffect(() => {
    checkLoggedIn();    
    checkCurrUser();
    console.log(loggedIn);
  }, [])

  return typeof (loggedIn !== 'undefined') ? (
      loggedIn ? (
      <>
        <Typography>Welcome, {currUser.username}</Typography>
        <IconButton
              id="basic-button"
              color='primary'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <AccountCircleIcon fontSize='large' />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {/* <MenuLink link='/admin' onClick={handleClose}>Profile</MenuLink> */}
              <MenuLink onClick={handleLogout}>Log Out</MenuLink>  
              {/* <Divider />
              <MenuLink link='/' onClick={handleClose}>Home</MenuLink>
              <MenuLink link='/personal-feed' onClick={handleClose}>Services</MenuLink>
              <MenuLink link='/personal-feed' onClick={handleClose}>Products</MenuLink>
              <MenuLink link='/about' onClick={handleClose}>About</MenuLink> */}
            </Menu>
      </>
      ) : (
          <ButtonGroup variant="outlined">
            <Button href='/login'>

              Log in
            </Button>
            <Button href='/signup' variant='contained'>
              Sign Up
            </Button>
          </ButtonGroup>
      ) 
  ) : null
}
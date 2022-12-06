import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Divider, Grid, IconButton, Link, Menu, MenuItem, Toolbar } from '@mui/material';
import * as React from 'react';
import authService from "../../../services/auth/auth.service";
import Account from './Account';
import LogoName from './logo-name';
import NavBar from './Navbar';


export default function Header() {

  const [loggedIn, setLoggedIn] = React.useState(undefined);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const checkLoggedIn = () => {
    setLoggedIn(authService.isLoggedIn());
  }  
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function MenuLink(props) {
    return (
      <MenuItem onClick={props.onClick}>
        <Link href={props.link} underline='none'>{props.children}</Link>
      </MenuItem>

    );
  };

  const handleLogout = () => {
    authService.logout();
    location.reload();
  }

  React.useEffect(() => {
    checkLoggedIn();    
    //console.log(loggedIn);
  }, [])

  const renderAccount = () => {
    if(loggedIn) {
      return (
        <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuLink link='/admin' onClick={handleClose}>Profile</MenuLink>
              <MenuLink onClick={handleLogout}>Log Out</MenuLink> 
              <Box component='div' display={{ xs: 'block', lg: 'none' }}>
                <Divider />
                <MenuLink link='/' onClick={handleClose}>Home</MenuLink>
                <MenuLink link='/feed' onClick={handleClose}>Services</MenuLink>
                <MenuLink link='/feed' onClick={handleClose}>Products</MenuLink>
                <MenuLink link='/about' onClick={handleClose}>About</MenuLink>
              </Box>
            </Menu>
      )
    } else {
      return (<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuLink link='/login' onClick={handleClose}>Log In</MenuLink>
        <MenuLink link='/signup' onClick={handleClose}>Sign Up</MenuLink>
        <MenuLink link='/admin' onClick={handleClose}>Profile</MenuLink>
        <Box component='div' display={{ xs: 'block', lg: 'none' }}>
          <Divider />
          <MenuLink link='/' onClick={handleClose}>Home</MenuLink>
          <MenuLink link='/personal-feed' onClick={handleClose}>Services</MenuLink>
          <MenuLink link='/personal-feed' onClick={handleClose}>Products</MenuLink>
          <MenuLink link='/about' onClick={handleClose}>About</MenuLink>
        </Box>
      </Menu>)
    }
  }

  return (
    <AppBar color='secondary' sx={{ position: 'sticky' }}>
      <Toolbar>
        <Grid container
          columns={{ xs: 4, sm: 8, md: 10, lg: 12 }}
          spacing={{ xs: 2, md: 1 }}
          display='flex'
          flexWrap='nowrap'
          justifyContent='space-between'
        >
          <Grid item
            xs={1}
            sm={'auto'}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <LogoName />
          </Grid>
          {/* <Grid item
            xs={2}
            md={4}
            lg={2}

            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow='2'
          >
            <Search />
          </Grid> */}
          <Grid item
            lg={3}
            display={{ xs: 'none', lg: 'flex' }}
            justifyContent="center"
            alignItems="center"
          >
          <NavBar />
          </Grid>
          <Grid item
            xs={2}
            display={{ xs: 'none', xl: "flex" }}
            justifyContent="center"
            alignItems="center"
          >
            <Account />
          </Grid>
          <Grid item
            xs={1}
            display={{ xs: 'flex', xl: "none" }}
            justifyContent="flex-end"
            alignItems="center"
          >
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
            {renderAccount()}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
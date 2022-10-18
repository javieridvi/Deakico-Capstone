import * as React from 'react';
import { AppBar, Box, Button, Divider, Grid, IconButton, Link, Menu, MenuItem, Toolbar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Account from './Account';
import LogoName from './logo-name';
import NavBar from './Navbar';
import Search from './search';


export default function Header() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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

  return (
    <AppBar color='secondary' sx={{position: 'relative'}}>
      <Toolbar>
        <Grid container 
          columns={{ xs: 4, sm: 8 , md: 10, lg: 12}}
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
          <Grid item
            xs={'auto'}
            md={4}
            lg={'auto'}

            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow='2'
          >
            <Search />
          </Grid>
          <Grid item xs={'auto'}
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
            <Menu
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
              <Box component='div' display={{ xs: 'block', lg: 'none' }}>
                <Divider />
                <MenuLink link='/' onClick={handleClose}>Home</MenuLink>
                <MenuLink link='/#' onClick={handleClose}>Services</MenuLink>
                <MenuLink link='/#' onClick={handleClose}>Products</MenuLink>
                <MenuLink link='/#' onClick={handleClose}>About</MenuLink>
              </Box>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
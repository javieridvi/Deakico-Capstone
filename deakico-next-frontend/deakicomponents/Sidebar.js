import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import userService from '../services/user.service';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MainSidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

//render switch function to display icons accordingly
  function renderSwitch(param) {
    switch(param) {
      case 'Dashboard':
        return <DashboardIcon/>;
      case 'Requests':
        return <RequestPageIcon/>;
      case 'Reviews':
        return <RateReviewIcon/>;
      case 'Profile':
        return <AccountBoxIcon/>;
      case 'Settings':
        return <SettingsIcon/>;
      case 'Events':
        return <LocalActivityIcon/>;
      default:
        return <SettingsIcon/>;
    }
  }

  //render switch function to display icons accordingly
  function redirectSwitch(param) {
    switch(param) {
      case 'Dashboard':
        return '/dashboard';
      case 'Requests':
        return '#';
      case 'Reviews':
        return '#';
      case 'Profile':
        return '/admin';
      case 'Settings':
        return '#';
      case 'Events':
        return '#';
      default:
        return '#';
    }
  }

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const checkUser = () => {
    userService.getUser().then((res) => {
      setIsLoggedIn(res.data.pa_id? true : false);
    }).catch((err) => {
      console.log(err);
      setIsLoggedIn(false);
    });
  };

  React.useEffect(() => {
    checkUser();
  }, []);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}> */}
        {/* <Toolbar> */}
        <Box 
        position='fixed' 
        top='0'
        paddingTop='70px'
        paddingLeft='15px'
        >
            <IconButton
            size='large'
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            
          >
            <MenuIcon fontSize='100px'/>
          </IconButton>
        </Box>
          
          {/* <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography> */}
        {/* </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} color='primary'>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        {isLoggedIn == true 
        ? <>
          <Divider />
            <List>
              {['Dashboard', 'Reviews', 'Requests', 'Profile'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton href={redirectSwitch(text)}>
                    <ListItemIcon>
                      {renderSwitch(text)}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List> 
          </>
        : <>
          </>
        }

        <Divider />
        <List>
          {['Settings', 'Events'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton href={redirectSwitch(text)}>
                <ListItemIcon>
                {renderSwitch(text)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* <Main open={open}> */}
        <DrawerHeader />
        {/** Whatever is inside here (Main component) will be passed through props and displayed in dashboard page
         * and it will adapt size with the sidebar's opening.
         * I (José) advice not to use any dynamic call to the api through this component yet, as we don't know what problems
         * it might cause. For now just display static data inside here.
         */}
      {/* </Main> */}
    </Box>
  );
}
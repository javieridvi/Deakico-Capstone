import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//Icons for Sidebar
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import Dashboard from './Dashboard/dashboard';
import Profile from './profile/profile';

import userService from '../../services/user.service';
import Follows from './follows';
import Liked from './liked';
import Review from './Review/review';
import Settings from './settings';
import { CircularProgress, Skeleton } from '@mui/material';
import DashboardTable from '../Table';

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

  const [component, setComponent] = React.useState();
  const handleClick = (text) => {
    setComponent(text);
  }

  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currUser, setCurrUser] = React.useState(null);
  const [flag, setFlag] = React.useState(false);

  const checkUser = () => {
    userService.getUser().then((res) => {
      console.log(res.data)
      setIsLoggedIn(res.data.pa_id? true : false);
      setCurrUser(res?.data);
      setFlag(true);
    }).catch((err) => {
      console.log(err);
      setIsLoggedIn(false)
    });
  };
  
  React.useEffect(() => {
    checkUser();
  }, []);

//render switch function to display icons accordingly
  function renderIcon(param) {
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
      case 'Liked Items':
        return <FavoriteIcon/>;
      case 'My Follows':
        return <GroupAddIcon/>;
      default:
        return <SettingsIcon/>;
    }
  }

  //render switch function to display icons accordingly
  //To-Do: pass user data through all of these components
  function renderSwitch(param) {
    switch(param) {
      case 'Dashboard':
        return (<Dashboard user={currUser}/>);
      case 'Reviews':
        return (<Review user={currUser}/>); //user not needed
      case 'Liked Items':
        return (<Liked user={currUser}/>); //user not needed
      case 'My Follows':
        return (<Follows user={currUser}/>); //user not needed
      case 'Requests':
        return (<DashboardTable userType='user'/>);
      case 'Profile':
        return (<Profile user={currUser}/>); 
      case 'Settings':
        return <Settings user={currUser}/>;
      case 'Events':
        return (<></>);
      default:
        return (<Profile user={currUser}/>);
    }
  }

if(!flag) {
  // return (
  //   <Box
  //   alignContent='center'
  //   >
  //     <CircularProgress
  //     size='50%'/>
  //   </Box>
  // ); 
  return (null);
} else 
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
              {['Dashboard', 'Reviews', 'Profile'].map((text, index) => (
                <ListItem key={text} disablePadding>
                      <ListItemButton onClick={() => {setComponent(text)} } > {/** onClick render option */}
                        <ListItemIcon>
                          {renderIcon(text)}
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
          {['Liked Items', 'My Follows', 'Requests', 'Settings', 'Events'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => {setComponent(text)} }>
                <ListItemIcon>
                {renderIcon(text)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader /> 
        
        {/** Whatever is inside here (Main component) will be passed through props and displayed in dashboard page
         * and it will adapt size with the sidebar's opening.
         * I (José) advice not to use any dynamic call to the api through this component yet, as we don't know what problems
         * it might cause. For now just display static data inside here.
         */}        
         {renderSwitch(component)}
      </Main>
    </Box>
   

    
  );
}
import { Box, Fab, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { LogInPopUp } from "../deakicomponents/Modal";
import { ProductCard } from "../deakicomponents/Reusable/Card";

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function Test() {
  // Modal **
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  function handleLogInOpen(title) {
    setModalTitle(title);
    setOpen(true);
  };
  const handleLogInClose = () => {

    setOpen(false)
  };

  const [drawer, setDrawer] = useState(false);
  const [drawerList, setDrawerList] = useState(['item']);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(open);
  }

  function addItem() {
    setDrawerList(state => [...state, 'item'])
  }

  function listProduct() {
    console.log('item');
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '200px',
          minHeight: '100px',
          backgroundColor: 'white',
          textAlign: 'left',
          overflowWrap: 'break-word',
          padding: '1.5rem',
        }}
      >
        < Typography variant="h6" >Dozen Glazed Donut</Typography>
        <Typography variant="button">$12.00</Typography>
        <Typography variant="caption">Quantity: 1</Typography>
        <Divider />
      </Box>
    )
  }

  /*
  req_id
  req_totalprice
  i_id
  u_id
  status
  disabled
  req_date
  */

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Fab color="primary" aria-label="add" onClick={toggleDrawer(true)} >
        <InboxIcon />
      </Fab>
      <Fab color="primary" aria-label="add" onClick={addItem} >
        <MailIcon />
      </Fab>

      <Drawer
        anchor={"right"}
        open={drawer}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: '200px' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {drawerList.map((ele, index) => (
              <Box key={index} disablePadding>
                {listProduct()}
              </Box>
            ))}
          </Box>
          <Divider />
        </Box>
      </Drawer>

      {/* <ProductCard
        id={7}
        title={"Dozen Glazed Donut"}
        description={"12 glazed donut box."}
        price={"$12.00"}
        category={"pastry"}
        rating={"4.4"}
        provider={1}
        liked={true}
        LogIn={handleLogInOpen}
        src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
      /> */}
      {
        open ? (
          <LogInPopUp
            open={open}
            handleClose={handleLogInClose}
            title={'Follow ' + modalTitle + ' to make it easier to keep up with them on Deakico.'}
            message={'Sign up to follow your favorite providers.'}
          />) : null
      }
    </Box>
  )
}

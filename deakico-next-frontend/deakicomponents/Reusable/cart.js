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

export default function Cart(props) {

  const [drawer, setDrawer] = useState(false);
  const [drawerList, setDrawerList] = useState(['item']);
  const List = props.list;

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(open);
  }

  function addItem() {
    setDrawerList(state => [...state, 'item'])
  }

  function listProduct(props) {
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
        < Typography variant="h6" >{props.name}</Typography>
        <Typography variant="button">{props.price}</Typography>
        <Typography variant="caption">{props.quantity}</Typography>
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
              <Box key={ele.name} disablePadding>
                <listProduct/>
              </Box>
            ))}
          </Box>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  )
}

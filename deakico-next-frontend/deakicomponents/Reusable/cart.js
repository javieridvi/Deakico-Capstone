import { Box, Button, ButtonBase, Fab, Typography } from "@mui/material";
import { useState } from "react";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';

export default function Cart(props) {

  const [drawer, setDrawer] = useState(false);
  const List = props.list;


  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(open);
  }

  function ListProduct(props) {
    const [quantity, setQuantity] = useState(1);
    const buttonStyle = {
      width: '40px',
      height: '40px',
      border: 'solid 2px rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
    }
    console.log('item added');
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <ButtonBase
            sx={{

            }}
          >-</ButtonBase>
          <div>
            <Typography variant="caption">{quantity}</Typography>
          </div>
          <ButtonBase
            sx={{

            }}
          >+</ButtonBase>
        </Box>
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

  // Doesn't render until first item is added
  if (List.length < 1) {
    return null;
  } else {
    console.log('cart.js Cart has item');
    return (
      <Box
        className="Cart"
        sx={{
          position: "absolute",
          width: '100px',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={toggleDrawer(true)}
          sx={{
            position: 'fixed',
            right: { xs: 0, lg: 'calc(50% - 576px)' },
            bottom: 0,
            margin: '1rem',
          }}
        >
          <ShoppingCartIcon />
        </Fab>
        <Drawer
          anchor={"right"}
          open={drawer}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: '200px' }}
            role="presentation"
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {List.map((ele) => (
                <Box key={ele.name} disablePadding>
                  <ListProduct
                    name={ele.name}
                    price={ele.price}
                  />
                </Box>
              ))}
            </Box>
            <Divider />
            <Box className="Total"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 1rem',
              }}
            >
              <Typography variant="h6" >Total</Typography>
              <Typography variant="h6" >Total</Typography>
            </Box>
            <Divider />
          </Box>
        </Drawer>
      </Box>
    )
  }
}

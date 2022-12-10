import { Box, Button, ButtonBase, Fab, InputBase, Typography } from "@mui/material";
import { useState } from "react";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import requestService from '../../services/request.service';

export default function Cart(props) {
  const List = props.list; // List of items added to cart
  const remove = props.remove; // function to remove an item
  const changeQty = props.changeQty; // function to change the quantity of an item
  const provider = props.paId; // provider of current cart items
  let Total = "$0.00"; // Total price of request
  
  // Total **
  function TotalPrice() {
    let total = 0;
    List.forEach(item => {
      total = total + item.quantity * Number(item.price.replace(/[^0-9-]+/g, "")) / 100;
    });
    total = (total).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    Total = total;
    return (<Typography variant="h6" >{total}</Typography>);
  }
  // ** Total

  // Drawer **
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(open);
  }
  // ** Drawer

  // Product List **
  function ListProduct(props) {
    const quantity = props.quantity;
    const buttonStyle = {
      width: '35px',
      height: '35px',
      border: 'solid 2px rgba(0, 0, 0, 0.16)',
      '&:disabled': {
        color: '#cfcfcf',
      }
    }
    const inputStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '0.75rem',
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 'auto',
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
            marginTop: '.5rem',
          }}
        >
          <ButtonBase
            disabled={quantity == 1}
            onClick={() => changeQty(props.index, (quantity - 1))}
            sx={buttonStyle}
          >-</ButtonBase>
          <Box
            sx={[buttonStyle, inputStyle]}
          >
            {quantity}
          </Box>
          <ButtonBase
            onClick={() => changeQty(props.index, (quantity + 1))}
            sx={buttonStyle}
          >+</ButtonBase>
        </Box>
        <div>
          <ButtonBase
            onClick={() => remove(props.index)}
            sx={{
              marginTop: '0.375rem',
              borderRadius: '0.25rem',
              padding: '2px 4px',
              left: '-4px',
            }} >
            <Typography variant="caption" color={'#6e6e6e'} >Remove</Typography>
          </ButtonBase>

        </div>
      </Box>
    )
  }
  // ** Product List

  // Send Request **
  function prepareRequest(){
    let reqItems = List.map(item => {
      return {
        i_id: item.id,
        qty: item.quantity,
        priceAtReq: item.price,
      }
    })    

    const fullRequest ={
      request: {
        pa_id: provider,
        req_totalprice: Total,
      },
      articleList: reqItems,
    }
    console.log('cart.js Request to send >');
    console.log(fullRequest);
    requestService.insertRequest(fullRequest).then(res => {
      console.log('cart.js Request successful >');
      console.log(res);
    }).catch(err =>{
      console.log('Error at cart.js >');
      console.log(err);
    })
  }
  // ** Send Request
  /*
  Request: 
  req_totalprice?: number; set
  pa_id?: number; set
  u_id?: number;
  req_id?: number;
  status?: string;
  req_date?: Date;
  disabled?: boolean;

  ArticleList: 
    req_id?: number;
    i_id?: number;
    qty?: number;
    priceAtReq?: number;
  */

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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {List.map((ele, index) => (
              <Box key={ele.name}>
                <ListProduct
                  index={index}
                  name={ele.name}
                  price={ele.price}
                  quantity={ele.quantity}
                />
                <Divider />
              </Box>
            ))}
          </Box>
          <Box>
            <Box className="Total"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 1rem',
                margin: '1rem 0',
              }}
            >
              <Typography variant="h6" >Total</Typography>
              <TotalPrice />
            </Box>
            <Divider />
            <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              <ButtonBase
              onClick={()=> prepareRequest()}
                sx={{
                  width: '80%',
                  height: '2.25rem',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  marginTop: '1rem',
                  borderRadius: '1.125rem',
                  backgroundColor: 'rgb(102, 105, 110)',
                }}
              >
                MAKE REQUEST
              </ButtonBase>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

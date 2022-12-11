import { Box, Button, ButtonBase, Fab, InputBase, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import requestService from '../../services/request.service';
import authService from "../../services/auth/auth.service";
import { useRouter } from "next/router";
import { LogInPopUp } from "../Modal";

export default function Cart(props) {
  const List = props.list; // List of items added to cart
  const remove = props.remove; // function to remove an item
  const empty = props.empty;
  const changeQty = props.changeQty; // function to change the quantity of an item
  const provider = props.paId; // provider of current cart items
  let Total = "$0.00"; // Total price of request

  // Total **
  function TotalPrice({fontSize}) {
    let total = 0;
    List.forEach(item => {
      total = total + item.quantity * Number(item.price.replace(/[^0-9-]+/g, "")) / 100;
    });
    total = (total).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    Total = total;
    return (<Typography variant="h6" fontSize={'700'}>{total}</Typography>);
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

  // Modal**
  const [userIsAuth, setUserIsAuth] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const modalTxt = {
    ttl: 'Log In to start making requests',
    msg: 'This is the best way to keep of your requests',
  }
  function prepareRequest() {
    // console.log('cart.js prepare request');
    // console.log('cart.js prepare request');
    if (authService.isLoggedIn()) {
      authService.checkToken().then(res => {
        if (res.data) {
          setUserIsAuth(true);
        }
        setDrawer(false);
        setOpenModal(true);
      })
    } else {
      setDrawer(false);
      setOpenModal(true);
    }
  };
  const handleLogInClose = () => setOpenModal(false);

  // Request Bag **  
  function Bag(props) {

    const rowStyle = {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.5rem 1rem',
    }

    const qtypriceStyle = {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
    }

    // Send Request **
    function makeRequest() {
      let reqItems = List.map(item => {
        return {
          i_id: item.id,
          qty: item.quantity,
          priceAtReq: item.price,
        }
      })

      const fullRequest = {
        request: {
          pa_id: provider,
          req_totalprice: Total,
        },
        articleList: reqItems,
      }
      // console.log('cart.js Request to send >');
      // console.log(fullRequest);
      requestService.insertRequest(fullRequest).then(res => {
        console.log('cart.js Request successful >');
        // console.log(res);
        empty();
      }).catch(err => {
        if(err.response.status === 401){
          setUserIsAuth(false);
        }
        // console.log('Error at cart.js >');
        // console.log(err);
      })
    }
    // ** Send Request

    return (
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="Request-Bag"
          sx={{
            position: 'absolute',
            width: 'clamp(300px, 80%, 600px)',
            height: 'auto',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            border: 'solid 1px #eeeeee',
            borderRadius: '1rem',
            backgroundColor: 'white',
            paddingBottom: '1rem',
            overflow: 'clip',
          }}
        >
          <Box className="Bag-Headers"
            sx={[
              rowStyle, {
                height: '40px',
                backgroundColor: '#eeeeee',
                borderBottom: 'solid 1px #eeeeee',
              }]}
          >
            <Box
              sx={{
                flex: '3',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="caption">ITEM</Typography>

            </Box>
            <Box
              sx={[
                qtypriceStyle, {
                  justifyContent: 'center',
                }]}
            >
              <Typography variant="caption">QUANTITY</Typography>
            </Box>
            <Box
              sx={[
                qtypriceStyle, {
                  justifyContent: 'flex-end',
                  paddingLeft: '1rem',
                }]}
            >
              <Typography variant="caption">PRICE</Typography>
            </Box>
          </Box>
          {List.map((item) => (
            <Box className="Bag-Item"
              key={item.name}
              sx={[
                rowStyle, {
                  height: 'auto',
                  borderBottom: 'solid 1px #eeeeee',
                }]}
            >
              <Box sx={{ flex: '3', wordWrap: 'break-word' }}>
                <Typography variant="h6">{item.name}</Typography>
              </Box>
              <Box sx={[qtypriceStyle, { justifyContent: 'center', }]}>
                <Typography variant="caption" fontSize={'1rem'}>{item.quantity}</Typography>
              </Box>
              <Box sx={[qtypriceStyle, { justifyContent: 'flex-end', }]}>
                <Typography variant="caption">{item.price}</Typography>
              </Box>
            </Box>
          ))}
          <Box className="Bag-Total"
            sx={[
              rowStyle, {
                height: 'auto',
                borderBottom: 'solid 1px #eeeeee',
              }]}
          >
            <Typography variant="h6" fontWeight={'700'}>Total</Typography>
            {/* <Typography variant="h6" fontWeight={'700'}>{Total}</Typography> */}
              <TotalPrice fontSize={700}/>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ButtonBase
              onClick={() => makeRequest()}
              sx={{
                width: '50%',
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
      </Modal>
    )
  }
  // ** Request Bag
  // ** Modal

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
        // onClick={toggleDrawer(true)}
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
                onClick={() => prepareRequest()}
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
                CHECK BAG
              </ButtonBase>
            </Box>
          </Box>
        </Box>
      </Drawer>
      {openModal ?
        userIsAuth ?
          <Bag
            open={openModal}
            handleClose={handleLogInClose}
          /> :
          <LogInPopUp
            open={openModal}
            handleClose={handleLogInClose}
            title={modalTxt.ttl}
            message={modalTxt.msg}
          /> :
        null
      }
    </Box>
  )
}

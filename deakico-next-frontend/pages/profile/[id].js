import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material';
import Profile from '../../deakicomponents/Reusable/profile';
import Cart from '../../deakicomponents/Reusable/cart';


export default function index() {
  // Profile **
  const [providerId, setProviderId] = useState({ id: null, ready: false });
  const router = useRouter();
  useEffect(() => {
    if (router.query.id != undefined) {
      setProviderId({ id: router.query.id, ready: true });
    }
  }, [router.query])
  // ** Profile

  // Cart **
  const [cartList, setCartlist] = useState([]);
  function addToCart(item) {
    const inCart = cartList.some((cartItem, index) => {
      if (cartItem.id === item.id) {
        changeItemQuantity(index, (cartItem.quantity + 1));
        return true;
      }
      return false;
    })
    if (!inCart) {
      item.quantity = 1;
      setCartlist(list => [...list, item]);
    }
  }

  function changeItemQuantity(index, qty) {
    setCartlist(list =>
      list.map((item, indx) => {
        if (indx === index) {
          return { ...item, quantity: qty };
        }
        return item;
      }),
    );
  }

  function removeItem(index) {
    setCartlist(list =>
      list.filter((item, indx) => {
        return indx != index;
      })
    );
  }

  // ** Cart

  return (
    <>

      <Head>
        <title> Provider </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div>

        <main>
          {!providerId.ready ?
            (<CircularProgress />) :
            (<Box
              sx={{
                position: 'relative',
              }}
            >
              <Profile paId={providerId.id} request={addToCart} />
              {cartList.length > 0 ?
                (<Cart list={cartList} changeQty={changeItemQuantity} remove={removeItem} paId={providerId.id} />)
                : null
              }
            </Box>)
          }
        </main>

      </div>

    </>
  )
}

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
      console.log('[id].js query id is: ' + router.query.id);
      setProviderId({ id: router.query.id, ready: true });
    }
  }, [router.query])
  // ** Profile

  // Cart **
  const [cartList, setCartlist] = useState([]);
  function addToCart(item) {
    /*
    item = {
      id: ,
      name: ,
      price; ,
    }
    */
    console.log('[id].js CartList before item >');
    console.log(cartList);
    console.log('[id].js Item added is >');
    console.log(item);
    setCartlist(list => [...list, item]);
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
              <Cart list={cartList} />
              <Profile paId={providerId.id} request={addToCart} />
            </Box>)
          }
        </main>

      </div>

    </>
  )
}

import Head from 'next/head';
import * as React from 'react';
import { Box } from '@mui/material';
import LogIn from './logIn';


export default function LogFunc() {

  //Same as sign up index, only change is title, can be optimized later on
  return (
    <>
      <Head>
        <title>Log in</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box 
      sx={{
        minHeight: '100vh',
        backgroundColor:'#363740',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
      >
          <LogIn />
      </Box>
    </>)
}

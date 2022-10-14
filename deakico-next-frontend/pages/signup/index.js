import Head from 'next/head';
import * as React from 'react';
import { Box } from '@mui/material';
import SignUp from './signUp';


export default function SignFunc() {


  return (
    <>
      <Head>
        <title>Sign Up </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#363740',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <SignUp />
      </Box>
    </>)
}
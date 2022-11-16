import Head from 'next/head';
import * as React from 'react';
import { Box } from '@mui/material';
import ProviderSignUp from './providerSignUp';


export default function ProviderSignFunc() {


  return (
    <>
      <Head>
        <title>Register as a Provider</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#363740',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '5em 1.5em'
        }}
      >
        <ProviderSignUp />
      </Box>
    </>)
}
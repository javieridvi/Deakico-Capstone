import Head from 'next/head';
import * as React from 'react';
import { Box } from '@mui/material';
import Dashboard from './dashboard';

export default function DashboardFunc() {


  return (
    <>
      <Head>
        <title>Dashboard</title>
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
        <Dashboard />
      </Box>
    </>)
}
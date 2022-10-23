import Head from 'next/head';
import * as React from 'react';
import { Box } from '@mui/material';
import PersonalFeed from './PersonalFeed';


export default function FeedFunc() {

  //Same as sign up index, only change is title, can be optimized later on
  return (
    <>
      <Head>
        <title>Personal Feed</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box 
      sx={{
        minHeight: '100vh',
        backgroundColor:'white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
      >
          <PersonalFeed />
      </Box>
    </>)
}

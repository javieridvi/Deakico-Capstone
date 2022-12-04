import Head from 'next/head';
import * as React from 'react';
import { Box } from '@mui/material';
import Search from '../../deakicomponents/Search/SearchFeed';


export default function FeedFunc(props) {

  //Same as sign up index, only change is title, can be optimized later on
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <Box
        className='Container'
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#f1f1f1'
        }}
      >
        <Search />
      </Box>
    </>
  )
}

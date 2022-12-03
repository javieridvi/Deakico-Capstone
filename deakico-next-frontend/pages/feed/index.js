import Head from 'next/head';
import * as React from 'react';
import { Box } from '@mui/material';
import Feed from './Feed';


export default function FeedFunc(props) {

  let feed = <Feed type={0} />;
  if (props.type == 'products') {
    feed = <Feed type={1}/>
  }
  //Same as sign up index, only change is title, can be optimized later on
  return (
    // <>
    //   <Head>
    //     <title>Personal Feed</title>
    //     {/* <meta name="viewport" content="initial-scale=1, width=device-width" /> */}
    //   </Head>
    //   </>
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
      {feed}
    </Box>
  )
}

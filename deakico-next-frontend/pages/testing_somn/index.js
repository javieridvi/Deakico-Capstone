import Head from 'next/head';
import * as React from 'react';
import { Box } from '@mui/material';
import Testing from './testing';
import itemService from '../../services/item.service';

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const products = await itemService.getItemByType('product');
   // const services = await itemService.getItemByType('service');
    const prodData = products.data;
   // const servData = await services.data;
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
          prodData,
         // services: servData,
        },
      }
    }

export default function TestingFunc({ prodData }) {

    return (
      <>
        <Head>
          <title>Testing </title>
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
            <div>
                <ol>
                    {prodData.map((e) => {
                        return (
                            <li>
                                {e.i_id}
                            </li>
                        )
                    })}
                </ol>
                
            </div>
          <Testing />
        </Box>
      </>)
  }

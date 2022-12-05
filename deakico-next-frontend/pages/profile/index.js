import React from 'react'
import Head from 'next/head';
import Profile from '../../deakicomponents/Reusable/profile';


export default function index() {
  return (
    <>
   
   <Head>
        <title> Provider </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
   </Head>

     <div>

    <main>
        <Profile/>      
    </main>

    </div>
    
    </>
  )
}

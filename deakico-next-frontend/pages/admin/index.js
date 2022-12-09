import React from 'react'
import Head from 'next/head';
import Profile from './profile';
import MainSidebar from '../../deakicomponents/Sidebar/Sidebar';


export default function index() {
  return (
    <>
   
   <Head>
        <title> Profile </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
   </Head>

     <div>

    <main>
        <MainSidebar/>
        {/* <Profile/>       */}

    </main>

    </div>
    
    </>
  )
}

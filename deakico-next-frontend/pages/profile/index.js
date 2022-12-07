import React from 'react'
import Head from 'next/head';
import Profile from '../../deakicomponents/Reusable/profile';
import { useRouter } from 'next/router';


export default function index() {
  const id = parseInt(useRouter().query.id);
// console.log(id);
  return (
    <>
   
   <Head>
        <title> Provider </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
   </Head>

     <div>

    <main>
        {Profile(id)}      
    </main>

    </div>
    
    </>
  )
}

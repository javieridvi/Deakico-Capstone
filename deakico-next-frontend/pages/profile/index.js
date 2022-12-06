import React from 'react'
import Head from 'next/head';
import Profile from '../../deakicomponents/Reusable/profile';
import { useRouter } from 'next/router';


export default function index() {
  const id = parseFloat(useRouter().query.id).toFixed(1);
console.log(id);
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

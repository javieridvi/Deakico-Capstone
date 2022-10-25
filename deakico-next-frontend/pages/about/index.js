import React from 'react'
import About from './about'
import Head from 'next/head';

export default function index() {
  return (

    <div>
      <Head>
      <title> About </title>
      </Head>
      <About/>
    </div>
  )
}

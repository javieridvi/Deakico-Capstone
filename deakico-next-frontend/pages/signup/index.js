import Head from 'next/head'
import Header from '../../deakicomponents/Header';
import * as React from 'react';

import styles from './style.module.css'
import SignUp from './signUp';


export default function Test() {

  return (
    <>
      <Head>
        <title>Sign Up </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className={styles.container} >
        <Header />
        <div className={styles.logInContainer} >
          <SignUp />
        </div>
      </div>
    </>)
}

import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import Profile from '../../deakicomponents/Reusable/profile';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';


export default function index() {
  const [providerId, setProviderId] = useState({ id: null, ready: false });
  const router = useRouter();
  useEffect(() => {
    if (router.query.id != undefined) {
      console.log('[id].js query id is: ' + router.query.id);
      setProviderId({ id: router.query.id, ready: true });
    }
  }, [router.query])
  return (
    <>

      <Head>
        <title> Provider </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <div>

        <main>
          {providerId.ready ?
              (<Profile paId={providerId.id} />) : (<CircularProgress />)
          }
        </main>

      </div>

    </>
  )
}

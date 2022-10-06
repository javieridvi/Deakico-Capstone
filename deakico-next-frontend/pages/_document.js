import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@mui/material';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon//favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon//favicon-16x16.png"/>
        <link rel="manifest" href="/favicon//site.webmanifest"/>
        <link rel="mask-icon" href="/favicon//safari-pinned-tab.svg" color="#ea498c"/>
        <meta name="msapplication-TileColor" content="#00aba9"/>
        <meta name="theme-color" content="#363740"/>
      </Head>
      <body>
        <CssBaseline/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
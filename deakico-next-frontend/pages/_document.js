import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@mui/material';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Estos links son para que salga el Favicon y las diferentes ocaciones que se puedes usar ese logo circular, use este site https://realfavicongenerator.net/ */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon//favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon//favicon-16x16.png"/>
        <link rel="manifest" href="/favicon//site.webmanifest"/>
        <link rel="mask-icon" href="/favicon//safari-pinned-tab.svg" color="#ea498c"/>
        <meta name="msapplication-TileColor" content="#00aba9"/>
        <meta name="theme-color" content="#363740"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@200;400&display=swap"
          rel="stylesheet"
          />
      </Head>
      <body>
        <CssBaseline/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import './styles/global.css'

function MyApp({Component, pageProps}) {

  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#EA498C',
      },
      secondary: {
        main: '#BCEFDD',
      },
    },
  })

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
}

export default MyApp
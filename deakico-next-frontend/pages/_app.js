import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import Layout from '../deakicomponents/Layout/Layout'

function MyApp({ Component, pageProps }) {

  // El cambia los colores de los componentes de MUI. EL primary es el rosita y el secondary es el verde que usamos
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
  /*Missing: 
  Layout>Footer
  Profile Settings
  Side bar menu
  Request functions, handling and managing page 
  Review Page
  Personal feed page
  Provider Dashboard page
  */
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
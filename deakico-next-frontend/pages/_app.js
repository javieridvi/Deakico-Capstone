import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import Layout from '../deakicomponents/Layout/Layout'

function MyApp({ Component, pageProps }) {

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
  Home/General page
  SignIn/Up functions
  Profile Settings
  Provider page
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
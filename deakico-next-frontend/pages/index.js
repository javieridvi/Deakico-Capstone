import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'

export default function Home() {


  // Para navegar rapido a todas las paginas sera removido y reemplazado luego  

  return (
    <Box component='html'>
      <Head>
        <title>Home</title>
      </Head>

      <Box component='main'
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Typography component='h1' variant='h1'>Home landing page missing</Typography>

      </Box>
    </Box>
  )
}

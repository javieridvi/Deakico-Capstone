import { Box } from '@mui/system'
import Head from 'next/head'
import Home from './home/index'

export default function Main() {
 

  // Para navegar rapido a todas las paginas sera removido y reemplazado luego  

  return (
    <Box component='main'>
      <Head>
        <title>Home</title>
      </Head>

      <Box component='div'
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Home/>
      </Box>
    </Box>
  )
}

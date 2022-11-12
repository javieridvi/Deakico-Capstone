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
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f1f1f1',
        }}
      >
        <Home/>
      </Box>
    </Box>
  )
}

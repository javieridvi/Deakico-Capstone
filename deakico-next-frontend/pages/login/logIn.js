import { Button, Container, Link, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import authService from '../../services/auth/auth.service';
import { useRouter } from 'next/router'
import BasicModal from '../../deakicomponents/Modal';

export default function LogIn() {

  // const router = useRouter();

  const [open, setOpen] = React.useState(false); //modal use states

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    authService.login(data.get('email'), data.get('password')).then(
      () => {
        //on successful login, redirect to Home Page
        //router.replace('/'); //router is conflicting with how we render in Home Page
        location.assign('/')
      }).catch((err) => {
        //console.log(err);
        setOpen(true); //opens error modal
      }
    )
  };

  return (
    <Container
      component='main'
      maxWidth={false}
      sx={{ 
        maxWidth: { xs: '23em', sm: '28em' },
        backdropFilter: 'blur(10px)',
      }}
    >
      <BasicModal 
      open={open} 
      handleClose={() => {setOpen(false)}} 
      title="Unauthorized User" 
      message="Invalid Email or Password." 
      />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          backgroundColor: 'rgba(255,255,255, 0.5)',
          borderRadius: '1em',
          padding: '2em 1.5em',
          backgroundImage: 'linear-gradient(to bottom right, rgba(188,239,221, 0.4), rgba(255,255,255,0.8))',
          boxShadow: '10px 10px 10px rgba(30,30,30,0.5)', }}
      >
        <img src='/Deakico-Icon.svg' alt='Deakico Icon' height={'60px'} />

        <Typography component='h2' variant='h5' color='text.disabled'
          sx={{
            fontWeight: 'bold'
          }}
        >
          Deakico.
        </Typography>
        <Stack
          sx={{
            alignItems: 'center'
          }}
        >
          <Typography component='h1' variant='h5'
            sx={{
              fontWeight: 'bold'
            }}
          >
            Log In to Dashboard
          </Typography>
          <Typography variant='caption' color='text.disabled'
            sx={{
              fontWeight: 'medium',
              paddingBottom: '2em',
            }}
          >
            Enter your email and password below
          </Typography>
        </Stack>
        <Stack component="form" onSubmit={handleSubmit}
          sx={{
            minWidth: '100%'
          }}
        >
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email Address'
            autoComplete='email'
            margin='dense'
          />
          <TextField
            id='password'
            name='password'
            label='Password'
            type='password'
            autoComplete='current-password'
            margin='normal'
          />
          <Button type='submit' variant='contained'
            sx={{
              marginTop: 2,
              marginBottom: 1,
              marginLeft: 2,
              marginRight: 2,
              boxShadow: '0px 4px 12px rgba(55, 81, 255, 0.24)',
            }}
          >
            Log In
          </Button>
        </Stack>
        <Typography variant='body1' color='text.disabled'>
          Don't have an account? <Link href='/signup' underline='hover' >Sign up</Link>
        </Typography>
      </Stack>
    </Container>
  )
}

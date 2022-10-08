import * as React from 'react';
import { Typography, Container, TextField, Button, Link, Stack, styled } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function LogIn() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component='main' maxWidth={false} sx={{ maxWidth: { xs: '23em', sm: '28em' } }} >
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}
        sx={{
          backgroundColor: 'white',
          borderRadius: '1em',
          padding: '2em 1.5em',
        }}
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
            label='Email Address'
            autoComplete='email'
            margin='dense'
          />
          <TextField
            id='password'
            name='password'
            label='Password'
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
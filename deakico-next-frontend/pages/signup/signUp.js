import { Button, Container, CssBaseline, Link, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import authService from '../../services/auth/auth.service';
import BasicModal from '../../deakicomponents/Modal';


export default function SignUp() {

  const [open, setOpen] = React.useState(false); //modal use states

  // Esta funcion es del template. lo que hace es log al console
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //confirm that passwords are the same
    const pass = data.get('password');
    const confPass = data.get('confirm-password');
    if(!validatePassword(pass, confPass)) {
      return; //return if invalid password
    }
    
    //register api endpoint 
    authService.register(
      data.get('firstName'),
      data.get('lastName'),
      data.get('email'),
      data.get('username'),
      data.get('password'),).then(
      () => {
        authService.login(
          data.get('email'),
          data.get('password')).then(() => {}).catch((err) => {console.log(err.response.data)})

        location.assign('/'); //return to home page
      }, (err) => {
        setOpen(true); //opens error modal
      }
    )
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

    //for confirm password validation
    const [passwordMsg, setPasswordMsg] = React.useState("");
    const [error, setError] = React.useState(false);

    //Arbitrary black list of password users should not use
    const passBlacklist = [
      'password',
      'PASSWORD',
      'password123',
      'password321',
      '123password',
      '321password'
    ]

    //return true if passwords are the same, false otherwise
    //add logical conditions to make passwords stronger
    const validatePassword = (pass, confPass) => {
      if((pass === confPass) 
      && (pass != "" || confPass != "") 
      && (!passBlacklist.includes(pass))) {
        setError(false);
        return true; //valid password
      }
      else {
        setPasswordMsg("Password not valid!");
        setError(true);
        return false; //invalid password
      }
    }

  return (
    <Container 
      component="main"
      maxWidth={false} 
      maxHeight={false}

      sx={{
        backgroundColor: 'rgba(255,255,255, 0.5)',
        borderRadius: '1em',
        padding: '2em 1.5em',
        maxWidth: { xs: '23em', sm: '28em' },
        backdropFilter: 'blur(10px)',
        backgroundImage: 'linear-gradient(to bottom right, rgba(188,239,221, 0.4), rgba(255,255,255,0.8))',
        boxShadow: '10px 10px 10px rgba(30,30,30,0.5)',
      }}>
      <CssBaseline />

      {/**Error Modal */}
      <BasicModal
      open={open} 
      handleClose={() => {setOpen(false)}} 
      title="Email or Username already taken" 
      message="Either the Email or Username you're trying to use has been taken. Please use other options." 
      />

      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '20%'
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
          >Register with Deakico.</Typography>
          <Typography
            variant='caption'
            color='text.disabled'
            sx={{
              fontWeight: 'medium',
              paddingBottom: '2em',
            }}
          >Enter your info down below</Typography>
        </Stack>
        <Stack component="form" container spacing={2} onSubmit={handleSubmit}
          sx={{
            mt: 3,
            minWidth: '100%'
          }}
        >
          <Stack item sx={{ size: { sm: 'small', lg: 'normal' } }}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              autoComplete="given-name"
              required
              fullWidth
              autoFocus
            />
          </Stack>
          <Stack item  >
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              autoComplete="family-name"
              required
              fullWidth
            />
          </Stack>
          <Stack item >
            <TextField
              id="email"
              name="email"
              type= "email"
              label="Email Address"
              autoComplete="email"
              required
              fullWidth
            />
          </Stack>
          <Stack item >
            <TextField
              id="username"
              name="username"
              label="Username"
              required
              fullWidth
            />
          </Stack>
          <Stack item >
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
              error={error}
              helperText={passwordMsg}
              required
              fullWidth
            />
          </Stack>
          <Stack item >
            <TextField
              id="confirm-password"
              name="confirm-password"
              type="password"
              label="Confirm Password"
              autoComplete="new-password"
              error={error}
              helperText={passwordMsg}
              required
              fullWidth
            />
          </Stack>
          <Stack item>
            <Button type="submit" variant="contained"
              sx={{
                marginLeft: 2,
                marginRight: 2,
                boxShadow: '0px 4px 12px rgba(55, 81, 255, 0.24)',
              }}
            >
              Register
            </Button>
          </Stack>
        </Stack>
        <Stack container justifyContent="center">
          <Stack item>
            <Typography variant='body1' color='text.disabled' >
              Already have an account? <Link href="/login" underline='hover' >Log in</Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
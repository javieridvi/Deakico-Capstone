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

    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const username = data.get('username');    
    const pass = data.get('password');
    const confPass = data.get('confirm-password');

    //function calls
    const validFName = validateFirstName(firstName);
    const validLName = validateLastName(lastName);
    const validUName = validateUsername(username);
    const validPass = validatePassword(pass, confPass);
    if(!(validFName && validLName && validUName && validPass)) {
      return; //return if invalid any
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
    const [passError, setPassError] = React.useState(false);
    //for Names validation
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [firstNameMsg, setFirstNameMsg] = React.useState("");
    const [lastNameError, setLastNameError] = React.useState(false);
    const [lastNameMsg, setLastNameMsg] = React.useState("");
    //for usernames validation
    const [uNameError, setUNameError] = React.useState(false);
    const [uNameMsg, setUNameMsg] = React.useState(false);

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
        setPasswordMsg("");
        setPassError(false);
        return true; //valid password
      }
      else {
        setPasswordMsg("Password invalid or mismatch!");
        setPassError(true);
        return false; //invalid password
      }
    }

  const validateFirstName = (name) => {
    var nameRegex = /^[a-zA-Z\-]{3,16}$/; //regular expression to match FirstName/LastName
    if(name.match(nameRegex)) {
      setFirstNameMsg("");
      setFirstNameError(false)
      return true; //valid FirstName/LastName
    } 
    setFirstNameMsg("Invalid First Name! Must be 3-16 characters long, and may contain only letters.");
    setFirstNameError(true);
    return false; //invalid FirstName/LastName
  }

  const validateLastName = (name) => {
    var nameRegex = /^[a-zA-Z\-]{3,16}$/; //regular expression to match FirstName/LastName
    if(name.match(nameRegex)) {
      setLastNameMsg("");
      setLastNameError(false)
      return true; //valid FirstName/LastName
    } 
    setLastNameMsg("Invalid Last Name! Must be 3-16 characters long, and may contain only letters.");
    setLastNameError(true);
    return false; //invalid FirstName/LastName
  }

  const validateUsername = (username) => {
    var usernameRegex = /^[a-zA-Z0-9\._-]{3,16}$/; //regular expression to match usernames
    if(username.match(usernameRegex)) {
      setUNameMsg("");
      setUNameError(false);
      return true; //valid username
    }
    setUNameMsg("Invalid Username! Must be 3-16 characters long, and may contain letters, numbers and/or '-', '_', '.'.");
    setUNameError(true);
    return false; //invalid username
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
              error={firstNameError}
              helperText={firstNameMsg}
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
              error={lastNameError}
              helperText={lastNameMsg}
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
              error={uNameError}
              helperText={uNameMsg}
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
              error={passError}
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
              error={passError}
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
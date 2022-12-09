import { Button, Container, CssBaseline, Link, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import providerService from '../../services/provider.service';
import userService from '../../services/user.service';
import authService from '../../services/auth/auth.service';


export default function ProviderSignUp() {

  const [currUser, setCurrUser] = React.useState(undefined);
  const [category, setCategory] = React.useState('');

  //for confirm password validation
  const [passwordMsg, setPasswordMsg] = React.useState("This is your regular account's password.");
  const [error, setError] = React.useState(false);


  const checkCurrUser = () => {
    setCurrUser(userService.getUser()?.then((res) => {
      setCurrUser(res.data);
    }).catch((err) => {
      console.log(err);
    }));
  }

  const categories = [
    'hair',
    'pastry',
    'food',
    'clothing',
    'cleaning',
    'jewelry',
    'other',
  ]


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
    //then register, once the user is validated
    const payload = {
          pa_companyname: data.get('companyName'),
          pa_desc: data.get('description'),
          pa_category: category,
        };
    const email = currUser?.email;
    const password = data.get('password');

    authService.login(email, password).then(() => {
       providerService.insertProvider(payload).then(
        () => {
          window.location.reload(); //this reloads the page
        }, (err) => {
          console.log(err.response.data);
        }
      )
    }).catch((err) => {
      console.log("Unauthorized!");
    })
   
  }
  
  React.useEffect(() => {   
    checkCurrUser();
  }, [])

  //return true if passwords are the same, false otherwise
  const validatePassword = (pass, confPass) => {
    if((pass === confPass) && (pass != "" || confPass != "")) {
      setPasswordMsg("This is your regular account's password.");
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
          >Register as a Provider</Typography>
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
              id="companyName"
              name="companyName"
              label="Company"
              autoComplete="given-name"
              required
              fullWidth
              autoFocus
            />
          </Stack>
          <Stack item  >
            <TextField
              id="description"
              name="description"
              label="Company Description"
              type='text'
              required
              fullWidth
              multiline
            />
          </Stack>
          <Stack item  >
          <TextField
              id="category"
              name="category"
              label="Company Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              fullWidth
              select
            >
            {categories.map((cat, i) => {
              return (
                <MenuItem key={i+1} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</MenuItem>
              )
            })}
          </TextField>
          </Stack>
          <Stack item >
            <TextField
              id="email"
              name="email"
              type= "email"
              label="Email"
              defaultValue={"Login required"}
              autoComplete="email"
              value={currUser?.email}
              required 
              disabled
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
import { Button, Container, CssBaseline, Link, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import providerService from '../../services/provider.service';
import userService from '../../services/user.service';
import authService from '../../services/auth/auth.service';
import BasicModal from '../../deakicomponents/Modal';


export default function ProviderSignUp() {

  const [currUser, setCurrUser] = React.useState(undefined);
  const [category, setCategory] = React.useState('');
  const [compType, setCompType] = React.useState(''); //company type use state
  const [open, setOpen] = React.useState(false); //modal use states
  const [modalState, setModalState] = React.useState({
    title: '',
    message: '',
    onClose: ()=>{},
  })



  //for confirm password validation
  const [passwordMsg, setPasswordMsg] = React.useState("This is your regular account's password.");
  const [error, setError] = React.useState(false);
  //for Company Name validation
  const [compNameMsg, setCompNameMsg] = React.useState("");
  const [compNameErr, setCompNameErr] = React.useState(false);


  const checkCurrUser = () => {
    setCurrUser(userService.getUser()?.then((res) => {
      if(res.data.pa_id) {
        setModalState({
          title: 'Already Registered',
          message: 'Oops! It looks like you already registered as a provider.',
          onClose: () => {
            location.assign('/admin'); //redirects to here after verifying that the user is a provider already
          }
        })
        setOpen(true);
        return;
      }
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

  const companyTypes = [
    'product',
    'service', 
    'both',
  ]

  // Esta funcion es del template. lo que hace es log al console
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //confirm that passwords are the same
    const pass = data.get('password');
    const confPass = data.get('confirm-password');
    const compName = data.get('companyName');
    
    const validPass = validatePassword(pass, confPass);
    const validCompName = validateCompName(compName);
    if(!(validPass && validCompName)){
      return; //return if invalid any
    }

    //then register, once the user is validated
    const payload = {
          pa_companyname: data.get('companyName'),
          pa_desc: data.get('description'),
          pa_category: category,
          pa_type: compType,
        };
    const email = currUser?.email;
    const password = data.get('password');

    authService.login(email, password).then(() => {
       providerService.insertProvider(payload).then(
        () => {
          window.location.reload(); //this reloads the page
        }, (err) => {
          setModalState({
            title: 'Company Name Taken',
            message: 'The company name you enter is taken. Please try another name.',
            onClose: () => {
              setOpen(false);
              setModalState({title: '', message: ''});
            }
          })
          setOpen(true);
        }
      )
    }).catch((err) => {
      setModalState({
        title: 'Error in login!',
        message: 'There was an error during login. Please check your credentials.',
        onClose: () => {
          setOpen(false);
          setModalState({title: '', message: ''});
        }
      })
      setOpen(true);
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

  const validateCompName = (compName) => {
    var compNameRegex = /^[a-zA-Z0-9\&-\s]+$/;
    if(compName.match(compNameRegex)){
      setCompNameMsg("");
      setCompNameErr(false);
      return; //valid password
    }
    setCompNameMsg("Invalid Company Name! May contain letters, numbers and/or '-', '&'.");
    setCompNameErr(true);
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
      handleClose={modalState.onClose} 
      title={modalState.title}
      message={modalState.message} 
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
              error={compNameErr}
              helperText={compNameMsg}
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
              id="company-type"
              name="company-type"
              label="Company Type"
              value={compType}
              onChange={(e) => setCompType(e.target.value)}
              required
              fullWidth
              select
            >
            {companyTypes.map((type, i) => {
              return (
                <MenuItem key={i+1} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
              )
            })}
          </TextField>
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
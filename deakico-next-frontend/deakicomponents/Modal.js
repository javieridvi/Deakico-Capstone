import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField, MenuItem } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  borderRadius: '5px',
  outline: 0,
  boxShadow: 24,
  padding: 4,
};

const bstyle = {
  width: '80%',
}

export default function BasicModal(props) {

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography align='center' id="modal-modal-description" sx={{ mt: 2 }}>
            {props.message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export function LogInPopUp(props) {

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
        spacing={2}
          sx={
            [style,
              {
                width: 'min(90%, 500px)',
                maxHeight: '489px',
                borderRadius: '1rem',
                // margin: '1rem'
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',  
              }]
          }
        >
          <Typography 
          variant="h6" 
          component="h2"
          align='center'
          id="modal-modal-title"
          sx={{
            fontWeight: '800',
            fontSize: '1.625rem'
          }}
          >
            {props.title}
          </Typography>
          <Typography 
          variant='caption'
          align='center'
          id="modal-modal-description"
          sx={{
            fontSize: '1rem'
          }}
          >
            {props.message}
          </Typography>
          <div
          align='center'
          >
            <Button href='/login' variant='contained' sx={bstyle}>
              Log in
            </Button>
          </div>
          <div
          align='center'
          >
            <Button href='/signup' variant='outlined' sx={bstyle}>
              Sign Up
            </Button>
          </div>
        </Stack>
      </Modal>
    </div>
  );
}

export function ConfirmationPopup(props) {

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
        spacing={2}
          sx={
            [style,
              {
                width: 'min(90%, 500px)',
                maxHeight: '489px',
                borderRadius: '1rem',
                // margin: '1rem'
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',  
              }]
          }
        >
          <Typography 
          variant="h6" 
          component="h2"
          align='center'
          id="modal-modal-title"
          sx={{
            fontWeight: '800',
            fontSize: '1.625rem'
          }}
          >
            {props.title}
          </Typography>
          <Typography 
          variant='caption'
          align='center'
          id="modal-modal-description"
          sx={{
            fontSize: '1rem'
          }}
          >
            {props.message}
          </Typography>
          <div
          align='center'
          >
            <Button id='confirm' color='error' onClick={props.handleClick}  variant='contained' sx={{width: '50%'}}>
              Yes, Delete
            </Button>
          </div>
          <div
          align='center'
          >
            <Button id='deny' color='success' onClick={props.handleClick} variant='outlined' sx={{width: '50%'}}>
              Not yet!
            </Button>
          </div>
        </Stack>
      </Modal>
    </div>
  );
}

export function FormPopup(props) {

  const categories = [
    'hair',
    'pastry',
    'food',
    'clothing',
    'cleaning',
    'jewelry',
    'other',
  ]

  const [category, setCategory] = React.useState('');


const renderFields = () => {
    switch(props.modalType) {
    case 'password':
      return(
        <>
          <Stack item >
            <TextField
              id="old-password"
              name="old-password"
              type="password"
              label="Old Password"
              autoComplete="new-password"
              error={props.validationError}
              helperText={props.errorMessage}
              required
              fullWidth
            />
          </Stack>
        <Stack item >
            <TextField
              id="new-password"
              name="new-password"
              type="password"
              label="New Password"
              autoComplete="new-password"
              error={props.validationError}
              helperText={props.errorMessage}
              required
              fullWidth
            />
          </Stack>
          <Stack item >
            <TextField
              id="confirm-password"
              name="confirm-password"
              type="password"
              label="Confirm New Password"
              autoComplete="new-password"
              error={props.validationError}
              helperText={props.errorMessage}
              required
              fullWidth
            />
          </Stack>
        </>
      );
    case 'username':
      return(
        <>
          <Stack item >
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
              error={props.validationError}
              helperText={props.errorMessage}
              required
              fullWidth
            />
          </Stack>
        <Stack item >
            <TextField
              id="new-username"
              name="new-username"
              label="New Username"
              error={props.validationError}
              helperText={props.errorMessage}
              required
              fullWidth
            />
          </Stack>
        </>
      );
    case 'full-name':
      return(
        <>
          <Stack item >
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
              error={props.validationError}
              helperText={props.errorMessage}
              required
              fullWidth
            />
          </Stack>
        <Stack item >
            <TextField
              id="new-first-name"
              name="new-first-name"
              label="New First Name"
              error={props.validationError}
              helperText={props.errorMessage}
              required
              fullWidth
            />
          </Stack>
          <Stack item >
            <TextField
              id="new-last-name"
              name="new-last-name"
              label="New Last Name"
              error={props.validationError}
              helperText={props.errorMessage}
              required
              fullWidth
            />
          </Stack>
        </>
      );
    case 'company-name':
      return(
        <>
        <Stack item >
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="new-password"
            error={props.validationError}
            helperText={props.errorMessage}
            required
            fullWidth
          />
        </Stack>
      <Stack item >
          <TextField
            id="new-company-name"
            name="new-company-name"
            label="New Company Name"
            error={props.validationError}
            helperText={props.errorMessage}
            required
            fullWidth
          />
        </Stack>
      </>
      );
  }

}

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
        spacing={2}
          sx={
            [style,
              {
                width: 'min(90%, 500px)',
                maxHeight: '489px',
                borderRadius: '1rem',
                // margin: '1rem'
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',  
              }]
          }
        >
          <Typography 
          variant="h6" 
          component="h2"
          align='center'
          id="modal-modal-title"
          sx={{
            fontWeight: '800',
            fontSize: '1.625rem'
          }}
          >
            {props.title}
          </Typography>
          <Typography 
          variant='caption'
          align='center'
          id="modal-modal-description"
          sx={{
            fontSize: '1rem'
          }}
          >
            {props.message}
          </Typography>
          <Stack component="form" onSubmit={props.handleClick}
          sx={{
            minWidth: '100%',
            "& >* " : {marginBottom: '10px'}
          }}
        >

          {//render depending on modal type
          renderFields()
          }
          
          <Button color='success' type='submit'  variant='outlined' 
          // sx={{width: '50%'}}
            sx={{
              marginTop: 2,
              marginBottom: 1,
              marginLeft: 2,
              marginRight: 2,
              boxShadow: '0px 4px 12px rgba(55, 81, 255, 0.24)',
            }}
          >
            Submit
          </Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}
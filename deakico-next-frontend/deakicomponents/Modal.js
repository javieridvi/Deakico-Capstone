import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';

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
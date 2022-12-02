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
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

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

              }]
          }
        >
          <Typography 
          variant="h6" 
          component="h2"
          align='center'
          id="modal-modal-title" 
          >
            {props.title}
          </Typography>
          <Typography 
          align='center'
          id="modal-modal-description"
          >
            {props.message}
          </Typography>
          <div
          align='center'
          >
            <Button href='/login' variant='contained'>
              Log in
            </Button>
          </div>
          <div
          align='center'
          >
            <Button href='/signup' variant='outlined'>
              Sign Up
            </Button>
          </div>
        </Stack>
      </Modal>
    </div>
  );
}
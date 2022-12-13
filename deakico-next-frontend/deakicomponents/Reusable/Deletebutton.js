import {React, useState} from 'react'
import { Dialog, DialogTitle , DialogContentText , Button, Typography,Box,Modal, DialogActions } from '@mui/material'
import itemService from '../../services/item.service';
import Profile from '../Sidebar/profile/profile';

export default function Deletebutton(props) {

//no hace nada rn mejor se haga desde profile cree una funcion de HandleDelete2
// function handleDeletion(id){
//   console.log("handle delete id:"+ id);
//   itemService.deleteItem(id);

// }

  return (
    <div id='handle-delete-modal'>
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{backgroundColor:'black', color:'white', width:'25rem', height:'10rem', p:"1rem", position: 'absolute',
  top: '40%',
  left: '38%', textAlign:'center', borderRadius:'1rem', }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'700',mb:'1.2rem'}}>
            delete item
        </Typography>
        <Typography id="modal-modal-description" >
         Are you sure you want to delete this product?
        </Typography>
        <Box sx={{textAlign:'center', mt:'1rem'}}>
        <Button id={props.id} onClick={props.delete}>Yes</Button><Button onClick={props.close}>No</Button>
        </Box>
      </Box>
    </Modal>
  </div>
  );
}

import { Typography, Button, Grid,Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Select , Slider, Rating, Stack, Input, TextField,} from '@mui/material';
import { Container, Box, } from '@mui/system';
import{React, useState, useRef, useEffect, useCallback} from 'react';
import Image from 'next/image';

import axios from 'axios' ;
import {ReviewForm} from './reviewButton';
import {CardView} from './CardView' ;
import { rootShouldForwardProp } from '@mui/material/styles/styled';
// import ReactDOM from 'react-dom/client';

  

export default function Review() {

  // function clickHander(){
  //   let arr = []
  //   arr.push(
  //     {CardView}
  //   )
  // }
 
  // const [{items}, setItems] = useState ({items : []})
  // // const addItem = () => {
  // //   items.push()
  // // }
  // const element = <CardView name= '@gracie' r_rating= {3} />;

 const [open, setOpen] = useState(false); //modal use states

  const handleClickOpen = () => {
    console.log("Open") ;
    setOpen(true); // opens modal
  }
 
  const handleClose = (e, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  }
   
  return (
    <>
        <Box sx={{
            position:'inherit',
            m:'0', 
            p:'0',
            backgroundColor:'black',
            height:'17rem',
            width: 1, display:'flex', justifyContent:'center',   m:'0', p:'0 ', mt:'0', mb:'2rem', 
        }}> 
                <Typography variant='h2'  sx={{
                    textAlign:'center', color:'white', ml:'6rem' , alignContent:'center', mt:'6rem', fontFamily:'Comfortaa', fontStyle: 'normal', 
                }}> Review It !
                </Typography>
                <div className='reviewPic' >
                    <Image  
                    src="/reviewIt.png"
                     width={150}
                     height={150}
                    >    
                    </Image>
                </div>
        </Box>
        {/* <style jsx>{`
        .reviewPic{
        margin-top: 36px }
        textarea { resize: none}
       `}</style>
      */}
        <Container>
       
<Button onClick={handleClickOpen}> AQUI</Button>
<ReviewForm 
 open = {open}
//  handleClose={() => {setOpen(false)}} 
handleClose= {handleClose}
 title = "-Company Name-"

/>

 {/* REVIEW CARDS  */}
    <Container className="grid-reviews " >
    <Grid container item spacing={2} sx={{
      // m:'10px',
      display:'flex',
     flexDirection:'row',
     justifyContent:'center',
    }}>
  
    {/* <Grid item xs={4}> */}
      <CardView sx={{  m:'4rem', }}/>
      {/* </Grid> */}

      <CardView/>
     {/* <TESTING PURPOSE> */}
      <CardView name= '@gracie' r_rating= {3}  r_message="Cool"/> 
      <CardView name= '@gracie' r_rating= {5}  r_message="awesome"/> 
      <CardView name= '@gracie' r_rating= {4}  r_message="Gr8"/> 

   </Grid>
    </Container>
  
  </Container>

  </>
  
  )
}

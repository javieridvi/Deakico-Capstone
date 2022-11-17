import { Typography, Button, Grid,Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Select , Slider, Rating,Pagination, Stack, Input, TextField, debounce} from '@mui/material';
import { Container, Box, } from '@mui/system';
import{React, useState, useRef, useEffect, useCallback} from 'react';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios' ;
import {ReviewForm} from './reviewButton';
import {CardView} from './CardView' ;

  

export default function Review() {
  
  const cards = [{
  name : "Pedro",
   img : " product" , 
  r_rating : 5 , 
   r_message : "The best"
}
  ]
  const handleClickOpen = () => {
    console.log("Open") ;
         }; 
   
  // const AddCard = () => {
  // CardView(cards.name, cards.img, cards.r_rating, cards.r_message)
  // }

  return (
    
        <Container >
        <Box sx={{
            position:'inherit',
            m:'0', 
            p:'0',
            backgroundColor:'black',
            height:'17rem',
            width: 1, display:'flex', justifyContent:'center',   m:'0', p:'0 ', mt:'0', mb:'2rem', 
        }}> 
                <Typography variant='h2'  sx={{
                    textAlign:'center', color:'white', justifyContent:'center', ml:'6rem' , alignContent:'center', mt:'6rem', fontFamily:'Comfortaa', fontStyle: 'normal', 
                }}> Review It 
                </Typography>
                <div className='reviewPic' >
                    <Image  
                    src="/reviewIt.png"
                     width={150}
                     height={100}
                    >    
                    </Image>
                </div>
        </Box>
        <style jsx>{`
        .reviewPic{
        margin-top: 36px }
        textarea { resize: none}
       `}</style>
     
        <Container>
       
<Button > AQUI</Button>
<ReviewForm/>
        </Container>

 {/* REVIEW CARDS  */}
    <Container className="grid-reviews " justifyContent='center'>
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

   </Grid>
    </Container>
  
  </Container>

  
  
  )
}

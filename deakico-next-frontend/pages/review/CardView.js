import React from 'react'
import {Box, Button, Typography,Rating} from '@mui/material'
import { borderRadius, height, textAlign } from '@mui/system'


//  const image = props.src;
//  const rating = props.number;  // hasta 5 
// const description = props;

CardView.defaultProps= {
 name : "@fulanita" ,
 img : 'url("Grace.png")' ,
 r_rating : 4.5 ,
 r_message : "LOVE IT !, justo lo que buscaba",
}


export function CardView({name, img, r_rating, r_message}){

  return (
    <div>
 <Box sx={{
       backgroundColor:'black',
        display: 'block',
        flexWrap: 'wrap',
          m: 2,
          width: 250,
          height: 400,
          color:'white',
          borderRadius: 2 ,
          justifyContent:'center',
          alignItems:'center',
          textAlign:'center',
    
          
          // boxShadow:'5px 5px  rgb(0,0,0,0.4)'

 }}>  

 <Box id='product-Picture' sx={{
  height:'40%',
  border: 2 ,
  borderColor:'black',
  borderRadius: 2 ,
  mb:'.5rem',
  backgroundImage:'url("bottle-hero.png")',
  backgroundRepeat:'no-repeat',
  backgroundSize: ' 250px ',

 }}>

 </Box>
 <Box id='user-img' sx={{
  backgroundImage: {img},
  backgroundSize: ' 80px ',
  backgroundRepeat:'no-repeat',
  backgroundColor:'pink',
  width:'4rem',
  height:'4rem',
  borderRadius:'50%',
  ml:'38%' ,
 }}> 

 
 </Box>

 <Typography sx={{textAlign:'center', m:'2px', fontSize:'12px', mt:'10px'}} >{name}</Typography><div>
 <Typography sx={{textAlign:'center', m:'8px', fontSize:'14px', color:'white', fontWeight:'bold'}} > Product Name</Typography>
</div>  
 
 <Rating name="read-only" value={r_rating} precision={0.5} size="small" sx={{justifyContent:'center', }} readOnly /> 
 <Typography sx={{textAlign:'center', m:'8px', fontSize:'14px', color:'white'}} >{r_message}</Typography>
({r_rating})
 </Box>   
  
    </div>
  )
}


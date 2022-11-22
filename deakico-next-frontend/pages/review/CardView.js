import React from 'react'
import {Box, Button, Typography,Rating} from '@mui/material'
import { borderRadius, height, textAlign } from '@mui/system'




CardView.defaultProps= {
 name : "@fulanita" ,                            //username
//  img : 'url("Grace.png")' ,
 r_rating : 4.5 ,                                // rating
 r_message : "LOVE IT !, justo lo que buscaba",  //description
}


export function CardView(props){
// const img = 'url("Grace.png")' , name = '@grace' , r_rating= 3.0 , r_message = 'test'


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
  // backgroundImage: {},
  backgroundSize: ' 80px ',
  backgroundRepeat:'no-repeat',
  backgroundColor:'pink',
  width:'4rem',
  height:'4rem',
  borderRadius:'50%',
  ml:'38%' ,
 }}> 

 
 </Box>

 <Typography sx={{textAlign:'center', m:'2px', fontSize:'12px', mt:'10px'}} >{props.name}</Typography><div>
 <Typography sx={{textAlign:'center', m:'8px', fontSize:'14px', color:'white', fontWeight:'bold'}} > Product Name</Typography>
</div>  
 
 <Rating name="read-only" value={props.r_rating} precision={0.5} size="small" sx={{justifyContent:'center', }} readOnly /> 
 <Typography sx={{textAlign:'center', m:'8px', fontSize:'14px', color:'white'}} >{props.r_message}</Typography>
({props.r_rating})
 </Box>   
  
    </div>
  )
}



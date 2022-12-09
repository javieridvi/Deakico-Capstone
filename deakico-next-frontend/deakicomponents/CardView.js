import {React, useState, useEffect} from 'react';
import {Box,  Typography,Rating, CardMedia, Button, Avatar} from '@mui/material';
import Stars from './Reusable/Rating';




// CardView.defaultProps= {
//  name : "@fulanita" ,                            //username
// //  img : 'url("Grace.png")' ,
//  r_rating : 4.5 ,                                // rating
//  r_message : "LOVE IT !, justo lo que buscaba",  //description
// }



 export  const  CardView =(props) =>{

    return (
      
    <div >
    
 <Box sx={{
       backgroundColor:'black',
        display: 'block',
        flexWrap: 'wrap',
          m: 2,
          width: 250,
          height: 400,
          color:'white',
          borderRadius: 2 ,
          alignItems:'center',
          textAlign:'center',
          '&:hover': {  //test
            backgroundColor: 'main', //testing if looks cool
            opacity: [0.8, 0.8, 0.7],
          },

 }}>  

 <Box id='product-Picture' sx={{
  height:'40%',
  border: 3 ,
  borderColor:'black',
  borderRadius: 1 ,
  mb:'.5rem',
  backgroundRepeat:'no-repeat',
  backgroundSize: ' 250px ',
 }}  >
  
 {/* <Button variant="text" onClick={{props.handleDelete}} sx={{
  '&:hover':{
  color:'pink',
 }}}> X </Button> por si se implementa delete*/} 
  <CardMedia

 component="img"
 height="155"
 src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
 alt="Developer"
 sx={{borderRadius:'4px', backgroundColor:'black'}}
 />

 </Box>
 {/* <Box id='user-img' sx={{
  backgroundSize: ' 80px ',
  backgroundRepeat:'no-repeat',
  backgroundColor:'pink',
  width:'4rem',
  height:'4rem',
  borderRadius:'50%',
  display:'inline-block',

 }}>  </Box> */}
 <Avatar sx={{width:'4rem', height:'4rem', display:'inline-block', mb:'.5rem', ml:'2%'}}  />

 <Typography sx={{textAlign:'center', m:'2px', fontSize:'12px', }} > {props.username} </Typography>
 <Typography sx={{textAlign:'center', m:'8px', fontSize:'14px', color:'white', fontWeight:'bold'}} > {props.product} </Typography>
 <Box sx={{ml:'30%'}}><Stars width='75px'rating={props.rating} />  </Box>
 <Typography sx={{textAlign:'center', m:'8px', fontSize:'14px', color:'white', mt:'1em',}}> {props.message}  </Typography>
 <Typography sx={{textAlign:'center', m:'8px', fontSize:'12px', color:'grey',mt:'1rem'}}> {props.date}  </Typography>


 </Box>  
 </div>
  )   
} 



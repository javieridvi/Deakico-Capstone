import {React, useState, useEffect} from 'react'
import {Box,  Typography,Rating, CardMedia, Button} from '@mui/material'
import reviewService from '../services/review.service'




// CardView.defaultProps= {
//  name : "@fulanita" ,                            //username
// //  img : 'url("Grace.png")' ,
//  r_rating : 4.5 ,                                // rating
//  r_message : "LOVE IT !, justo lo que buscaba",  //description
// }


// const handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   console.log({
//     name: data.get('name'),
//     description: data.get('description'),
//     price: data.get('price'),
//     category: data.get('category')
//   });
// };
// export const getStaticProps = async () => {
//   const res = await reviewService.getAllReviews()
//   const data = await res.data ; 
//   return {
//     props:{reviews: data}
//   }
// }

// function handleDelete(){  //Only avilable for the provider- i/id **

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
          // '&:hover': {  //test
          //   backgroundColor: 'primary.main', //testing if looks cool
          //   opacity: [0.9, 0.8, 0.7],
          // },

 }}>  

 <Box id='product-Picture' sx={{
  height:'40%',
  border: 3 ,
  borderColor:'black',
  borderRadius: 1 ,
  mb:'.5rem',
  // backgroundImage:'url(./)', // no funciona :(
  backgroundRepeat:'no-repeat',
  backgroundSize: ' 250px ',
 }}  >
 {/* <Button variant="text" onClick={{handleDelete}} sx={{
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
 <Box id='user-img' sx={{
  backgroundSize: ' 80px ',
  backgroundRepeat:'no-repeat',
  backgroundColor:'pink',
  width:'4rem',
  height:'4rem',
  borderRadius:'50%',
  display:'inline-block',
  

 }}> 


 </Box>
 <Typography sx={{textAlign:'center', m:'2px', fontSize:'12px', mt:'10px'}} > {props.username} </Typography><div>
 <Typography sx={{textAlign:'center', m:'8px', fontSize:'14px', color:'white', fontWeight:'bold'}} > {props.product} </Typography>
</div>  
 <Rating name="read-only" value={props.rating} precision={0.5} size="small"  readOnly /> 
 <Typography sx={{textAlign:'center', m:'8px', fontSize:'14px', color:'white'}}> {props.message}  </Typography>

 </Box>  
 </div>
  )   
} 



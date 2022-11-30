import { Typography, Button, Grid,Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Select , Slider, Rating, Stack, Input, TextField, getListItemAvatarUtilityClass,} from '@mui/material';
import { Container, Box, } from '@mui/system';
import{React, useState, useRef, useEffect, useCallback} from 'react';
import Image from 'next/image';
import axios from 'axios' ;
import {ReviewForm} from '../../deakicomponents/reviewButton';
import {CardView} from '../../deakicomponents/CardView' ;
import itemService from '../../services/item.service';  //en verdd no lo estoy usando
import reviewService from '../../services/review.service';

let rating = 0;

//Testing Funciton
 async function pullJson(){
   // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const rvws = await reviewService.getAllReviews();
    const rData = await rvws.data;   //list de reviews hechos
    const len = rData.length ;     //cantiad de reviews hechos
      // message = rData.map((item) => item?.r_message ) // List of all the messages 
      rating = rData.map((item) => item?.r_rating )  // List of all the ratings. 
      // console.log("test: "+item)
      var overallR = 0;   // overall rating calc  

      rating.forEach(element => {
        overallR += parseInt(element)
      });

      console.log(overallR/len); //overallRating de todos los ratings 4

       
    } //^Just testing Stuff



export default function Review() {
const [reviewItem, setReview] = useState([]);


  async function fetchItems() {
  const res = await reviewService.getAllReviews().then((res) =>{
  //  setRmesage( res.data[0].r_message) 
   return res.data;  // todos los reviews 
  }).catch((error)=> {
    console.log(error);
  }) 
  console.log(res); 
  res.forEach(review => { //cada review 
    console.log(review)
    setReview( res ) 
  })
    //List todos los reviews

}

    useEffect(() => {
        fetchItems();
    }, []);



 const [open, setOpen] = useState(false); //modal use states
 
 const handleClickOpen = () => {
    console.log("Open") ;
    setOpen(true); // opens modal
    pullJson();
  }
 
  const handleClose = (e, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  }

  const handleSubmit = (e, reason) => {
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
  
        <Container sx={{justifyContent:'center'}}>
       
<Button onClick={handleClickOpen}> AQUI</Button>
<>
<ReviewForm 
 open = {open}
//  handleClose={() => {setOpen(false)}} 
handleClose= {handleClose}
title = "-Company Name-"  //to do 
handleSubmit = {handleSubmit}

/>
</>
 {/* REVIEW CARDS  */}      
    <Box className="grid-reviews" display= 'flex'   >

     <Grid  container rowSpacing={3} columnSpacing={{ }} sx={{
      // m:'10px'
      // flexDirection:'row',
    }}> {reviewItem.map((e, index) => {
     return (
      <div key={index}>
      <CardView 
      //  product = {itemService.getItem(e.i_id).i_name} no funciona necesita cambiarse el req a product name
       rating = {parseInt(e.r_rating)}
       message = {e.r_message}
       username = {e.u_id}      />
      </div>
     );
    })}  
    
    </Grid>
    </Box>
  
  </Container >

  </>
  
  )
}



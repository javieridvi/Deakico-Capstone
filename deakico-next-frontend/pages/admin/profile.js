import {React, useState }from 'react'

import { Container,  Typography , Rating, Stack, Button, Box, styled, Grid, FormControl, Select, MenuItem,  Slide, } from '@mui/material';
import Image from 'next/image'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EmailIcon from '@mui/icons-material/Email';




const Follow = () => {
  var elem = document.getElementById("follow") ;

  if( elem.innerHTML == "+ Follow"){
      elem.innerHTML = "Followed";
      elem.value = "Followed";
      elem.style.backgroundColor= 'Pink';
      console.log('followed');
  

  }
  else {
    elem.innerHTML= "+ Follow";
    elem.style.backgroundColor = '#c1efdd';
    console.log('unfollow');
    alert('Unfollow');
  }

}

export default function Profile() {  
  
  return (
  
<Container>
  <div className="topProfile"    > 
  <Container 
     sx={{
        mt: 20 ,
        width:'100%'
    }}  > 
    
    <Box  xs={6} sx={{
        maxWidth:'80%' ,
        flexDirection:'column',
    }} className="presentation-u"    >

         <Box xs={4} sx={{
        width:'100%' ,
        display:'flex' ,
        flexDirection: 'row' ,
        flexWrap: 'wrap' ,
      
     
            }} > 
      
        <Typography 
      sx={{
        left: '0' ,
        top: '10' ,
        fontWeight: '700' ,
        fontSize: '28px' ,
        mr:'2px',
  
      
       }} > Company Name  </Typography>
    
       <Rating name="half-rating" defaultValue={3.5} precision={0.5}  sx={{ position: 'absolute', ml:'14rem' , mt:'10px' ,}}readOnly></Rating>  
   
     </Box>
       <Typography  sx={{
        
        fontSize: '28px',
        fontWeight:'800',
        mt:'10px',
        mb:'20px',
        direction:'column'

    }}> Here goes a fancy text that sets you apart from other companies.</Typography>   

    </Box >  
    <Stack className='topButtons' direction="row" spacing={2}>
    
    <Button variant="contained" id='follow'  color="secondary"  defaultValue= '+ Follow'
    onClick={()=>{
      Follow();
    }}
    
    >+ Follow
    </Button>      
  
    <Button variant="contained" startIcon={<StarOutlineIcon/>} 
    onClick = {()=>{
    parent.location = '/review'
    }}
    >Review</Button> 
    <Button variant="contained" startIcon={<EmailIcon/>}   
     onClick={()=>{
      parent.location = 'mailto: deakicomoelcoqui@gmail.com'

    }}>Contact Provider</Button>
    </Stack>
     </Container> 

      <Box xs={6} sx={{
          justifyContent:'flex',
          position:'left'
           }}>
      <div className='profilePic'>
       <Image src="/Logphotos.png" 
        width={550}
        height={284}
        layout={'fixed'}
        /> </div>   
      </Box>
      
    </div> 

      
<style jsx>{`
.topProfile {
    margin:0px;
    display: flex;
    margin-top:1.5rem;
}

.profilePic{
    margin-top: 10rem;
    margin-left: 20px;
}
.presentation-u{
    grid-row: 1 / 3;
}

`}</style>

       <main>
<Container className='secondLayer'>

</Container>

<Container className='servicesReq'>
    <Container className='serviceTab'  >
<Grid container-spacing={1}>
    <Grid item xs={6}>
        <Typography sx={{
            mt:'4rem',
            fontSize: '18px',
            fontWeight:'200'
        }}>
            Provided Services
        </Typography>
        
    <>
    <FormControl sx={{width: '50%' , mt:'2rem', }}>

         <Select
        //   onChange={(event) => setHeight(Number(event.target.value))}
        //   value={service}
          id="select-service"
        >
          <MenuItem value="service">Reselling</MenuItem>
          <MenuItem value="service">Classes</MenuItem>
          <MenuItem value="service">Video Conference</MenuItem>
          <MenuItem value="service">  </MenuItem>
        </Select>
    </FormControl>
    <Typography sx={{
        mt:'2rem' ,
        mb:'4rem',
        width:'50%',

    }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
        et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Maecenas accumsan lacus vel facilisis volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est.</Typography>
    </>
    </Grid>
    <Grid item xs={6} className="Feature">

    </Grid>
</Grid>
    </Container>

    <Container className='Products' width='90%'>
        <Stack>

        </Stack>

    </Container>
</Container>
       </main>
 
        </Container>
      
   
  )
}

import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Rating, Select, Stack, styled, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      description: data.get('description'),
      price: data.get('price'),
      category: data.get('category')
    });

  }

  const Follow = () => {
    var elem = document.getElementById("follow") ;
  
    if( elem.innerHTML == "+ Follow") {
        elem.innerHTML = "Followed";
        elem.value = "Followed";
        elem.style.backgroundColor= 'Pink';
        console.log('followed');
        alert('Follow!');
  
    }
    else {
      elem.innerHTML= "+ Follow";
      elem.style.backgroundColor = '#c1efdd';
      console.log('unfollow');
     
    }
  
  }

  function mailMe(props){

    return parent.location = 'mailto:' + String(props.email) 
    
  }
 
 const email = Profile.defaultProps = 
   ' deakicomoelcoqui@gmail.com'

 


export default function Profile() {  
  
  return (

    <Container>
      <div className="topProfile">
        <Container
          sx={{
            mt: 20,
            width: '100%'
          }}
        >
          <Box xs={6}
            sx={{
              maxWidth: '60%',
              flexDirection: 'column',
            }}
            className="presentation-u"
          >
            <Box xs={4}
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  left: '0',
                  top: '10',
                  fontWeight: 'bold',
                  fontSize: '28px',
                  mr: '3px'
                }}
              >
                Company Name
              </Typography>
              <Rating
                name="half-rating"
                defaultValue={3.5}
                precision={0.5}
                sx={{ left: '2px', }}
                readOnly
              />
              
            
            </Box>
            <Typography
              sx={{
                fontSize: '28px',
                fontWeight: '800',
                mt: '10px',
                mb: '20px',
                direction: 'column'

              }}
            >
              Here goes a fancy text that sets you apart from other companies.
            </Typography>
          </Box >
          <Stack className='topButtons' direction="row" spacing={2}>
          <Button variant="contained" id='follow'  color="secondary"  defaultValue= '+Follow'
    onClick={()=>{
      Follow();
    }}
    
    >+ Follow
    </Button>   
            <Button variant="contained" onClick = {()=>{
    parent.location = '/review'
    }} startIcon={<StarOutlineIcon />}>Review</Button>
            <Button variant="contained" onClick ={()=>{
              mailMe({email})
            }} startIcon={<EmailIcon />}>Contact Provider</Button>
          </Stack>
        </Container>
        <Box xs={6}
          sx={{
            justifyContent: 'flex',
            position: 'left'
          }}
        >
          <div className='profilePic'>
            <Image src="/Logphotos.png"
             width = {500}
              height={500}
              top={40} />
                   
          </div>
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
      `}
      </style>
      <main>


        <Container className='servicesReq'>
          <Container className='serviceTab'>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  sx={{
                    mt: '4rem',
                    fontSize: '18px',
                    fontWeight: '200'
                  }}
                >
                  Provided Services
                </Typography>
                <>
                  <FormControl sx={{ width: '100%', mt: '2rem' }}>
                    <InputLabel >
                      Select 
                    </InputLabel>

                    <Select
                      label="Services"
                      // onChange={(event) => setHeight(Number(event.target.value))}
                      value={""}
                      id="select-service"
                      labelId="height-of-container-label"
                    >
                      <MenuItem value="service">Reselling</MenuItem>
                      <MenuItem value="service">Classes</MenuItem>
                      <MenuItem value="service">Video Conference</MenuItem>
                      <MenuItem value="service"></MenuItem>
                    </Select>
                  </FormControl>
                  <Typography
                    sx={{
                      mt: '2rem',
                      mb: '4rem'
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Maecenas accumsan lacus vel facilisis volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est.
                  </Typography>
                </>
              </Grid>
              <Grid item xs={6} className="Feature">
              </Grid>
            </Grid>
          </Container>

          <Box className='Products' width='90%'>
            <Stack>

            </Stack>
          </Box>
        </Container>
      </main>
    </Container>
  )
}

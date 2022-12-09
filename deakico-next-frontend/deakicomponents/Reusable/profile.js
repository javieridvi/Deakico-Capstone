import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Rating, Select, Stack, styled, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import providerService from '../../services/provider.service';
import Stars from './Rating';



const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const email = 'deakicomoelcoqui@gmail.com'  // hacer el email diinamic dependiendo el profile id

export default function Profile(id) {
  // const provider = await providerService.getProviderProfile(10)
  const [provider, setProvider] = useState(undefined);

  function RequestProfile(ID) {
    providerService.getProviderProfile(ID).then((res) => {
      setProvider(res.data);
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    RequestProfile(id);
  }, [])


  const sendEmail = () =>{
    return window.open('mailto:'+ id.email)
  }

  const handleFollow = () => {
    const elem = document.getElementById('Follow');

    if(elem.value == "Follow"){
      // alert("Followed");
      
      elem.value = 'Followed';
      elem.innerHTML = 'Followed';
      elem.style.backgroundColor= '#c1efdd';
      elem.style.color= 'black';
    }

    else{
      elem.value = "Follow";
      elem.innerHTML = '+ Follow';
      elem.style.backgroundColor = '#ea498c';
      elem.style.color= 'whitesmoke';
    }

  }
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
                {provider?.pa_companyname}
              </Typography>
              {/* <Rating
                name="rating"
                value={provider?.pa_rating}
                precision={0.5}
                sx={{ left: '2px', }}
                readOnly
              /> */}
              <Stars width={'100px'} rating={provider?.pa_rating} />
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
              {provider?.pa_desc}
            </Typography>
          </Box >
          <Stack className='topButtons' direction="row" spacing={2}>
            <Button variant="contained" id='Follow' value={"Follow"} onClick={handleFollow} color="primary" startIcon={<AddIcon />}> Follow </Button>
            <Button variant="contained" onClick={()=> {window.location.href = "/review";}} startIcon={<StarOutlineIcon />}>Review</Button>
            <Button variant="contained" onClick={sendEmail}  startIcon={<EmailIcon />}>Contact Provider</Button>
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
              width={850}
              height={474}
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
                      Select Service
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

          <Container className='Products' width='90%'>
            <Stack>

            </Stack>

          </Container>
        </Container>
      </main>
    </Container>
  )
}
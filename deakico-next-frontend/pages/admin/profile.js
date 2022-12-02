import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Rating, Select, Stack, styled, Typography } from '@mui/material';
import { width } from '@mui/system';
import Image from 'next/image';
import { ProductCard } from "../../deakicomponents/Card";
import itemService from '../../services/item.service';
import { useEffect, useState } from "react";


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

//Test const email
const email = 'deakicomoelcoqui@gmail.com'

export default function Profile() {
 
  const [prodList, setProdList] = useState();
  const [servList, setServList] = useState();

  const getProducts = () => {
    itemService.getItemByType('product').then((res) => {
      setProdList(res.data);
    }).catch((err) => {
      //console.log(err);
    })
  }

  const getServices = () => {
    itemService.getItemByType('service').then((res) => {
      setServList(res.data);
    }).catch((err) => {
      //console.log(err);
    })
  }

  useEffect(() => {
    getProducts();
    getServices();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      description: data.get('description'),
      price: data.get('price'),
      category: data.get('category')
    });
  };

  const sendEmail = () =>{
    return window.open('mailto:'+ email)
  }

  const handleFollow = () => {
    const elem = document.getElementById('Follow');

    if(elem.value == "Follow"){
      alert("Followed");
      elem.value = 'Followed';
      elem.innerHTML = 'Followed';
      elem.style.backgroundColor= 'Pink';
    }

    else{
      elem.value = "Follow";
      elem.innerHTML = '+ Follow';
      elem.style.backgroundColor = '#c1efdd';
    }

 
  }
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

              }}
            >
              Here goes a fancy text that sets you apart from other companies. 

            </Typography>
          </Box >
          <Stack className='topButtons' direction="row" spacing={2}>
            <Button variant="contained" id='addProduct' onClick={handleFollow} color="secondary" startIcon={<AddIcon />} > Add </Button>
            <Button variant="contained" onClick={()=> {window.location.href = "/review";}} startIcon={<StarOutlineIcon />}> My Reviews</Button>
            {/* <Button variant="contained" onClick={sendEmail}  startIcon={<EmailIcon />}>Settings</Button> */}
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
                      label="Services"
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
                      mb: '4rem',
                      width:'50%'
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
            
              {prodList?.map((e,index)=> { 
              <div>
              <Grid item key={index} xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
               <ProductCard
                category={e.i_category}
                src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
                title={e.i_name}
                description={e.i_description}
                price={e.i_price}
                rating={e.i_rating}
              />       
              </Grid>
              </div>
              
              })}
      
            </Stack>
          </Box>

        </Container>
      </main>
    </Container>
  )
}

import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Rating, Select, Stack, styled, Typography, CardMedia ,Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import { width } from '@mui/system';
import Image from 'next/image';
import { ProductCard, } from "./Card";
import itemService from '../../services/item.service';
import reviewService from '../../services/review.service';
import { useEffect, useState } from "react";
import { AddProduct } from '../../deakicomponents/AddProduct';
import Stars from './Rating';
import providerService from '../../services/provider.service';
import authService from '../../services/auth/auth.service';
import { LogInPopUp } from '../Modal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Services from './Services';



const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

//Test const email CAMBIARLO POR EL USER ADMIN EMAIL
const email = 'deakicomoelcoqui@gmail.com'

export default function Profile(props) {
  const providerId = props.paId;
  const [serviceList, setServiceList] = useState([]);
  const [productList, setProductList] = useState([]);
  // Old states **
  const [overallRating, setOverallRating] = useState(0);
  const [selecting, setSelecting] = useState('');
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState('"panel1"');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // ** Old states

  // Modal**
  const [openModal, setOpenModal] = useState(false);
  const [modalTxt, setModalTxt] = useState({ ttl: '', msg: '' });
  function handleLogInOpen(title) {
    setModalTxt({
      ttl: 'Title',
      msg: 'message'
    });
    setOpenModal(true);
  };
  const handleLogInClose = () => setOpenModal(false);

  // ** Modal


  // Profile info **
  // const provider = await providerService.getProviderProfile(10)
  const [provider, setProvider] = useState(undefined);

  useEffect(() => {

    console.log(props)
    RequestProfile(providerId);
    getProducts(providerId);
    // profileRating();
  }, [])

  // Returns profile info of current provider
  function RequestProfile(paID) {
    console.log('provider is: ' + paID)
    providerService.getProviderProfile(paID).then((res) => {
      setProvider(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  // Returns the products of current provider based on user being logged in
  const getProducts = (paID) => {
    console.log('provider for items is: ' + paID)

    let request;
    if (authService.isLoggedIn()) {
      request = itemService.getItemOfProviderLiked;
    } else {
      request = itemService.getItemOfProvider;
    }

    request(paID).then((res) => {

      res.data.forEach(element => {
        if (element.type == 'service') {
          console.log("true");
          setServiceList(serviceList => [...serviceList, element])
        }
        else {
          setProductList(productList => [...productList, element])
        }

      });
    }).catch((err) => {
      console.log(err);
    })
  }


  // ** Profile info

  
 const sendEmail = () =>{
    return window.open('mailto:'+ email)
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
  console.log("productlist",productList)
  // Profile Return
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
            className="presentation-u"
            sx={{
              maxWidth: '80%',
              flexDirection: 'column',
            }}
          >
            <Box xs={4}
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}
            >
              <Typography
                sx={{
                  left: '0',
                  top: '10',
                  fontWeight: '700',
                  fontSize: '28px',
                  mr: '2px',
                }}
              >
                {provider?.pa_companyname}
              </Typography>
              <Stars rating={provider?.pa_rating} />
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
            {/* <Button variant="contained" onClick={() => { window.location.href = "/review"; }} startIcon={<StarOutlineIcon />}> My Reviews</Button> */}
            <Button variant="contained" onClick={sendEmail}  startIcon={<EmailIcon />}>Contact</Button>
          </Stack>
        </Container>
        <Box xs={6}
          sx={{
            justifyContent: 'flex',
            position: 'left'
          }}
        >
          <div className='profilePic'>
            <CardMedia
              component="img"
              image='/Logphotos.png'
              width='auto'
              height="auto"
              alt='profilepicture'
            />
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
        }
        .presentation-u{
            grid-row: 1 / 3;
        }
      `}
      </style>
      <main>
        <Container className='Items'>
        <Box className='serviceTab' sx={{mb:"4rem", width:'32rem'}} >
  

  <Typography
         sx={{
           mt: '2rem',
           mb: '1rem',
           width:'80%', fontWeight:'700'
         }} > 

   What about my services :  
 </Typography> 
{ serviceList.map((item) => ( 
<Services
id = {item.id}
name = {item.name}
category= {item.category}
description = {item.description}
price = {item.price}
timeslot = {item.timeslot}
request = {props.request}
/>
))} 

</Box >
          <Box className='Products' width='90%'>
            <Grid className="Results"
              container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
              sx={{
                position: 'relative',
                height: '100%',
                maxWidth: '100rem',
                paddingTop: '1rem',
                paddingBottom: '100px'
              }} >
              {productList.map((item) => (
                <Grid item key={item.id} xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ProductCard
                    id={item.id}
                    title={item.name}
                    description={item.description}
                    price={item.price}
                    category={item.category}
                    rating={item.rating}
                    liked={item.liked}
                    LogIn={handleLogInOpen}
                    request={props.request}
                    src={item.image ? item.image : '/product-placeholder.png'}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {openModal ?
            <LogInPopUp
              open={openModal}
              handleClose={handleLogInClose}
              title={modalTxt.ttl}
              message={modalTxt.msg}
            /> :
            null
          }

        </Container>
      </main>
    </Container>
  )
}
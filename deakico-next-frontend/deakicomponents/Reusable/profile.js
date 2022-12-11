import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Rating, Select, Stack, styled, Typography, CardMedia } from '@mui/material';
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
      // console.log('items >');
      // console.log(res.data);
      // setItemList(res.data);
      // const Services = res.data.map((item) => item?.i_type )
      // console.log("Services Type: "+ Services);
      res.data.forEach(element => {
        if (element.i_type == 'service') {
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

  /*
  const profileRating = async () => {
    const rvws = (await reviewService.getProviderReviews()).data;
    let len = rvws.length;
    // console.log("len: "+ len)    //cantiad de reviews hechos
    // message = rData.map((item) => item?.r_message ) // List of all the messages 
    const rating = rvws.map((item) => item?.rating)  // List of all the ratings.   

    let overallR = 0;   // overall rating calc  

    rating.forEach(element => {
      overallR += parseFloat(element)

    });

    setOverallRating(parseFloat(overallR / len).toFixed(2));

    //  return(overallRating);  // el overall rating   
  }
  const handleSelect = (event) => {
    console.log("event : " + event.target.value)
    setSelecting(event.target.value)
  };
  // let testi = profileRating();  // As promise
  // console.log(testi);
  // const test =overallRating; 
  // console.log("profileRating: "+ test)


  const handleClickOpen = () => {
    console.log("Open");
    setOpen(true); // opens modal
  }

  const handleClose = (e, reason) => {
    setOpen(false);
  }
  */

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
          {/* <Stack className='topButtons' direction="row" spacing={2}>
            <Button variant="contained" id='addProduct' onClick={handleClickOpen} color="secondary" startIcon={<AddIcon />} > Add </Button>
            <AddProduct
              open={open}
              handleClose={handleClose}
            />
            <Button variant="contained" onClick={() => { window.location.href = "/review"; }} startIcon={<StarOutlineIcon />}> My Reviews</Button>
            <Button variant="contained" onClick={sendEmail}  startIcon={<EmailIcon />}>Settings</Button>
          </Stack> */}
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
          <Box className='serviceTab'  >
            {/* <Typography 
            sx={{
            mt: '4rem',
            fontSize: '18px',
            fontWeight: '200'
        }}
        >
            My  Services
        </Typography> */}
            <>
              <FormControl sx={{ width: '50%', mt: '2rem', }}>
                <InputLabel>Services</InputLabel>
                <Select
                  label="services"
                  value={selecting}
                  id="select-service"
                  // onChange={handleSelect}
                >
                  {serviceList.map((e, index) => {
                    return (
                      <div key={index}>

                        <MenuItem value={e.i_name}>{e.i_name}</MenuItem>

                      </div>
                    );
                  })}

                </Select>
              </FormControl>
              <Typography
                sx={{
                  mt: '2rem',
                  mb: '4rem',
                  width: '50%'
                }}
              >
                What about my company :
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Maecenas accumsan lacus vel facilisis volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est.
              </Typography>
            </>

          </Box>

          <Box className='Products' width='90%'>
            <Grid className="Results"
              container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
              sx={{
                position: 'relative',
                height: '100%',
                maxWidth: '100rem',
                paddingTop: '1rem',
                paddingBottom: '100px'
              }}
            >
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
                    src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
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

import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Button, Container, FormControl, Grid, MenuItem, Rating, Stack, styled, Typography , CardMedia, TextField} from '@mui/material';
import { width } from '@mui/system';
import Image from 'next/image';
import { ProductCard, ProviderCardproducts } from "../../deakicomponents/Reusable/Card";
import itemService from '../../services/item.service';
import reviewService from '../../services/review.service';
import { useEffect, useState, ChangeEvent } from "react";
import {AddProduct} from '../../deakicomponents/AddProduct';
import Stars from '../../deakicomponents/Reusable/Rating';



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

export default function Profile() {
  let [selecting, setSelecting] = useState("")   ;
  const [itemList, setItemList] = useState([]);
  const [open, setOpen] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const [serviceList, setServiceList] = useState([]);
  const [productList, setProductList] = useState([]);

  const profileRating = async ()=>{
    const rvws =  (await reviewService.getProviderReviews().catch(() => {})).data;
    // console.log(rvws);
    let len = rvws.length;
    // console.log("len: "+ len)    //cantiad de reviews hechos
    // message = rData.map((item) => item?.r_message ) // List of all the messages 
    const  rating = rvws.map((item) => item?.rating )  // List of all the ratings. 
     
    let overallR = 0;   // overall rating calc  

    rating.forEach(element => {
      overallR += parseFloat(element)

    });

    setOverallRating(parseFloat(overallR / len).toFixed(2));

    //  return(overallRating);  // el overall rating 
  }
  

  // let testi = profileRating();  // As promise
  // console.log(testi);
  // const test =overallRating; 
  // console.log("profileRating: "+ test)

  const getProducts = () => {
    itemService.getItemOfProvider().then((res) => {
      console.log(res.data);
      setItemList(res.data);
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
  useEffect(() => {
    getProducts();
    profileRating();
  }, []);


  const handleClickOpen = () => {
      console.log("Open") ;
      setOpen(true); // opens modal
      }
   
  const handleClose = (e, reason) => {
      setOpen(false);
    }

  const handleSelect = (e)=> {
    setSelecting(e.target.value)
    console.log("value: "+ e.target.value );
    
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
        fontWeight: '750' ,
        fontSize: '28px' ,
        mr:'2px',
      
       }} > Company Name  </Typography>   
    
       <Stars rating={overallRating}/>
   
     </Box>
       <Typography  sx={{
        
        fontSize: '28px',
        fontWeight:'700',
        mt:'10px',
        mb:'20px',
        direction:'column'

            }}
            >
              {provider?.pa_desc}
            </Typography>
          </Box >
          <Stack className='topButtons' direction="row" spacing={2}>
            <Button variant="contained" id='addProduct' onClick={handleClickOpen} color="secondary" startIcon={<AddIcon />} > Add </Button>
            <AddProduct
              open={open}
              handleClose={handleClose}
            />
            <Button variant="contained" onClick={() => { window.location.href = "/review"; }} startIcon={<StarOutlineIcon />}> My Reviews</Button>
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
            <CardMedia
              component="img"
              image='/Logphotos.png'
              width='auto'
              height="auto"
              sx={{objectFit:'unset'}}
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

      
    <Box className='serviceTab'  >
      
        {/* <Typography sx={{
            mt:'4rem',
            fontSize: '18px',
            fontWeight: '200'
        }}
        >
            My  Services
        </Typography>
         */}

          <FormControl sx={{width: '50%' , mt:'3rem', }}>
              <TextField
                      name= 'selectingcompany'
                      label="services"
                      value= {selecting}
                      select 
                      id="select-service"
                      type='string'
                      onChange={handleSelect}
                    > 
         { serviceList.map((e, index) => { 
          return ( 
                  <MenuItem  key={index} id='serviceName' value={e.i_name}> {e.i_name} </MenuItem>
                         
          ); 
         }  )}         
                   </TextField>  
           </FormControl>
                  <Typography
                    sx={{
                      mt: '2rem',
                      mb: '1rem',
                      width:'80%'
                    }} > 

                    What about my service :  {selecting} 
                    
                   </Typography>
    
                   <Typography
                    sx={{
                      mt: '1rem',
                      mb: '4rem',
                      width:'60%'
                    }} > 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Maecenas accumsan lacus vel facilisis volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est.  
             
        </Typography>
          </Box>

          <Box className='Products' display='flex' flexWrap='wrap'>
          
              {productList.map((e,index)=> (
       <div key={index} >
            <ProviderCardproducts
                rating={e.i_rating}
                category={e.i_category}
                src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
                title={e.i_name}
                description={e.i_description}
                price={e.i_price}
          
              />    
        </div>
              ))}
          
          </Box>

      </main>
    </Container>
  )
}

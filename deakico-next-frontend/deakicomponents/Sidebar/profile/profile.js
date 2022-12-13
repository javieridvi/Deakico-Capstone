import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Button, Container, Rating, Stack, styled, Typography , CardMedia,FormControl, TextField, MenuItem, AccordionDetails,AccordionSummary, Accordion ,Pagination, Dialog} from '@mui/material';
import { ProductCard, ProviderCardproducts } from "../../Reusable/Card";
import itemService from '../../../services/item.service';
import reviewService from '../../../services/review.service';
import { useEffect, useState, ChangeEvent } from "react";
import {AddProduct} from '../../AddProduct';
import Stars from '../../Reusable/Rating';
import userService from '../../../services/user.service';
import providerService from '../../../services/provider.service';
import Deletebutton from '../../Reusable/Deletebutton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProviderActions from './actions/providerActions';



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

const pageSize = 6 ;



export default function Profile({user}) {
  const [itemList, setItemList] = useState([]);
  const [open, setOpen] = useState(false);
  const [Del, setDel] = useState(false);
  const [overallRating, setOverallRating ] = useState(0);
  const[selecDe, setselecDe]= useState(0);
  const [serviceList, setServiceList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [provider, setProvider] = useState({});
  const [pagination, setPagination] = useState({
  count: 1 ,
  from: 0 ,
  to: pageSize 
});
  const profileRating = async ()=>{
    const rvws =  (await reviewService.getProviderReviews().catch(() => {})).data;
    let len = rvws.length;
    // message = rData.map((item) => item?.r_message ) // List of all the messages 
    const  rating = rvws.map((item) => item?.rating )  // List of all the ratings. 
     
    let overallR = 0;   // overall rating calc  

    rating.forEach(element => {
      overallR += parseFloat(element)

    });

    setOverallRating(parseFloat(overallR / len).toFixed(2));
    //  return(overallRating);  // el overall rating del profile
  }
  
//Para encontrar todos los items de ese provider
  const getProducts = async () => {
    // userService.getUser().then((res)=> {
    if(user){

      itemService.getItemOfProvider(user.pa_id).then((res) => {
        console.log(res.data);
        setItemList(res.data);
        var sizeR =   res.data.length; 
        setPagination({...pagination, count: sizeR });
       
        res.data.forEach(element=>{
          if(element.type == 'service'){
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
    } else {
      console.log("User not Found! 1");
    }

  }

  const getProvider = () => {
    userService.getUser().then((res) => {
      providerService.getProvider(res.data?.pa_id).then((res) => {
        setProvider(res.data);
      })
    })
  }

  useEffect(() => {
    getProvider();
    getProducts();
    profileRating();
  }, []);


  const handleClickOpen = () => {
      console.log("Open") ;
      setOpen(true); // opens modal

      }
   
  const handleClose = (e, reason) => {
      setOpen(false);
      setDel(false);
    }

    //Services Handling
  const [expanded, setExpanded] = useState('"panel1"');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handlePageChange = (event, page) => {
    const from = (page -1) * pageSize ;
    const to = (page - 1) * pageSize + pageSize; 
    setPagination({...pagination, from: from, to: to});
  }

  function handleDelete(event){
  setDel(true);
  console.log("id event: ", event);
  setselecDe(event);
  return selecDe;
}

function handleDelete2(id){
    console.log("yup pls delete this");
    // itemService.deleteItem(id);      no func.
    setDel(false);
}
return (      
<Container  sx={{
        mt: 15 ,
        width:'100%'
    }}  >
  <div className="topProfile"     > 
  
  <Container  > 
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
      
       }} > {provider.pa_companyname} </Typography>   
    
       <Stars 
        rating={overallRating}/>
   
     {/* </Box> */}
       <Typography  sx={{
        
        fontSize: '28px',
        fontWeight:'700',
        mt:'.6rem',
        mb:'1.2rem',
        direction:'column'

            }}
            >
              {provider?.pa_desc}
            </Typography>
          </Box >
          <Box id='provider-Buttons'>
          <Stack className='topButtons' direction="row" spacing={2}>
            <Button variant="contained" id='addProduct' onClick={handleClickOpen} color="secondary" startIcon={<AddIcon />} > Add </Button>
            <AddProduct
              open={open}
              handleClose={handleClose}
            />
            {/* <Button variant="contained" onClick={() => { window.location.href = "/review"; }} startIcon={<StarOutlineIcon />}> My Reviews</Button> */}
            {/* <Button variant="contained" onClick={sendEmail}  startIcon={<EmailIcon />}>Settings</Button> */}
          </Stack>
        </Box>
        </Container>

        <div className='profilePic'>
             <CardMedia  
              component="img"
              image='/Logphotos.png'
              width= 'auto'
              height="auto"
              alt='profilepicture'
              sx={{mb:"2rem"}}
               />
          </div>
      
      </div>
      <style jsx>{`
        .topProfile {
            margin:0px;
            display: flex;
            margin-top:1.5rem;
        }
      
    
       
      `}
      </style>
      <main>

      
     <Box className='serviceTab' sx={{mb:"4rem", width:'32rem'}} >
  

             <Typography
                    sx={{
                      mt: '2rem',
                      mb: '1rem',
                      width:'80%', fontWeight:'700'
                    }} > 

              What about my services :  
            </Typography> 
          { serviceList.map((e, index) => { 

          return (   
            <div  key={index} >
              <Stack >
          <Accordion expanded={expanded === index } onChange={handleChange(index)}   TransitionProps={{ unmountOnExit: true }} >
        <AccordionSummary  expandIcon={<ExpandMoreIcon />} >
          <Typography  sx={{ width: '33%', flexShrink: 0 , mb:'1rem'}}> {e.name} </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{e.category}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardMedia component='img'  sx={{aspectRatio:'9/4'}} src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"    />
          <Typography sx={{mt:'15px'}}> Description:  {e.description} </Typography>
          <Typography sx={{mt:'10px'}}>  Price: {e.price} </Typography>
          <Typography sx={{mt:'10px'}}>  Time: {e.timeslot} minutes </Typography>
          {/* <Button sx={{display:'flex' , textAlign:'center', height:'1.5rem', mt:'10px'}}>Request</Button>  */}
          {/* src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000" foto de prueba */}
        </AccordionDetails>
     </Accordion></Stack> </div> 
     ); 
      }  )} 
       
          </Box >
     
      
          <Box className='Products' display='flex' flexWrap='wrap'>
          
       {productList.slice(pagination.from, pagination.to).map((e,index)=> (
       <div key={index} > 
        <Deletebutton 
        open= {Del}
        close = {handleClose}
        delete = {handleDelete2}
        />
            <ProviderCardproducts
                image={e.image ? e.image : '/product-placeholder.png'}              
                rating={e.rating}
                category={e.category}
                title={e.name}
                description={e.description}
                price={e.price}
                delete = {() => handleDelete(e.id)}   
                alt="products"
              />  
        </div>
              ))}
              
          
          </Box>
         
     
      </main>    
       <footer>
<Stack spacing={2} sx={{mt:'5%', alignItems:'center', mb:'12%' }}>
<Pagination color="secondary" count= {Math.ceil(pagination.count/pageSize)} 
 onChange={handlePageChange}

          />
        </Stack>
      </footer>
      <ProviderActions list={itemList} />
    </Container>
  )
}
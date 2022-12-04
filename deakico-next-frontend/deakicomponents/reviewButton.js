import {React,useState, useCallback,} from 'react'
import {Dialog,  FormControl , Slider, Rating, Stack, Button, TextField , Box, Typography} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import reviewService from '../services/review.service';

const marks = [
    {
      value: 0,
      label: 'Hideous',
    },
    {
      value: 1,
      label: 'Poor',
    },

    {
      value: 2,
      label: 'Normal',
    },
    {
        value: 3,
        label: 'Good',
      },

    {
      value: 4,
      label: 'Excellent',
    },
  ];


var a,b,c,d = 0;

export  function ReviewForm(props) {
   const [ratingS, setValue] = useState(0); 
    // para guardar el overall-Rating
   const [open, setOpen] = useState(false); //modal use states
    // console.log("Value: " + ratingS);

//Handlers para cada Slider!
  const handleSliderChange1 = useCallback((event,  value) => {  
    a = value;
    ratingS = ovRating();
    setValue(ratingS);
  },[]);

    const handleSliderChange = useCallback((event,  value) => {
      b = value;
      // console.log("myvalue: "+b);
      ratingS = ovRating();
      setValue(ratingS);
    },[]);
    
    const handleSliderChange2 = useCallback((event,  value) => {
      c = value;
      ratingS = ovRating();
      setValue(ratingS);
    },[]);
    
    const handleSliderChange3 = useCallback((event,  value) => {
      d = value;
      ratingS = ovRating();
      setValue(ratingS);
    },[]);
   
    
 const ovRating = ()=> {  // to get the review stars value 
  var sum = a+b+c+d ; 
  console.log("sum: "+ sum)
  return sum;
 };


function redirect() {
  location.replace("/review")
} 

function getToday() {
  const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = yyyy + '-' + mm + '-' + dd;
return formattedToday
}
//Handle para Submit el form 
const handleSubmit = (event) => {
  if (event !== 'backdropClick') {
    setOpen(false);  

  const message = String(document.getElementById('message').value);  //message
  console.log("messange: "+ message);
  var Rform =  {
   r_message: message ,
   r_rating: parseFloat(ovRating()).toFixed(2) ,
   r_date: getToday() , 
   i_id: 8 , // TO DOO! To Specific item
   

  } ;

   console.log(Rform);
   reviewService.insertReview(Rform);
   alert("Gracias por completar este Review!"); 

  redirect();
   
 }
}  


    
  return (

    <div>
           <Dialog  
         open={props.open}
         onClose={props.handleClose} 
         aria-labelledby="modal-modal-title"    
         sx={{
         maxWidth:'xl',
         }}    
        >
        <Typography id = "modal-modal-title" sx={{m:'2rem', fontWeight:'bold'}}> My {props.title} Review </Typography>
            <Box
      sx={{
     
        justifyContent:'center',
        alignItems: 'center',
      
      }}
    >
  
   
      {/* Dinamic Overall Rating  */}
      <Rating

        id="overall-feedback"
        defaultValue= {0}
        value={ratingS}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55,  }} fontSize="inherit" />}
        sx={{ml:'39%'}}
      />
    </Box>
            {/* <Typography sx={{
                ml:'30px' ,
                fontFamily:'comfortaa'
            }}> {props.title} </Typography> */}

                <Box component= "form" sx = {{
                  ml:'3rem', mr:'3rem',
                }}>
                <FormControl sx={{ m: '2rem', minWidth: '15rem', }}> 
                <Typography>
                ¿How was your overall experience?
                </Typography>
              <Slider
        id = 'experience'
        label="Experience"
        defaultValue={2}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={4}        
        sx={{ 
            mb:'3rem'
            
        }} 
        onChange={(e,v) =>  handleSliderChange(e,v *.50)  
                 
                 } 
      />  
     
             <Typography>
            ¿How was the quality of your product/service?
                </Typography>
              <Slider
              id= 'rate'
        aria-label="marks"
        defaultValue={2}
        // getAriaValueText={valuetext}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={4}
        sx={{
            mb:'3rem'
        }}
        onChange={(e,v) =>  handleSliderChange1(e,v*.25)}

      />  
          <Typography>
          ¿The price was according to you?
                </Typography>
              <Slider
              id='price'
        aria-label="Custom marks"
        defaultValue={2}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={4}
        sx={{
            mb:'3rem'
        }}
        onChange={(e,v) => handleSliderChange2(e,v*.25)}

      />  
      <Typography>
      ¿Would you recommend it?  
                </Typography>
              <Slider
              id='recom'
        aria-label="Custom marks"
        defaultValue={2}
        // getAriaValueText={valuetext}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={4}
        sx={{
            mb:'3rem'
        }}
        onChange={(e,v) => handleSliderChange3(e,v*.25)}

      />  
           <TextField 
          id='message'
          name = 'message'
          placeholder="Here your comment!"
          required
          multiline   
          type= 'string'    
          // autoFocus   
          maxRows={3}
          sx={{ mt:'2.5rem' }}
        />
                </FormControl>
                </Box>
            <Box sx={{mb:'2rem', textAlign:'right'}}>
             <div>
          <Button sx={{mt:' 2rem'}} onClick={props.handleClose}>Cancel</Button>      
          <Button sx={{mt:'2rem'}} onClick={handleSubmit}>Ok</Button>
            </div>
         </Box>
      
        </Dialog>
    </div>
  )
}

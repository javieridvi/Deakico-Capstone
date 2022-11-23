import {React,useState, useCallback,} from 'react'
import {Dialog,  FormControl, Container , Slider, Rating,Pagination, Stack, Input, TextField, debounce , Button, Box, Typography} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import { maxWidth } from '@mui/system';




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

    console.log("Value: " + ratingS);
    //Function para hacer el OverallRating 

  const handleSliderChange1 = useCallback((event,  value) => {
    a = value;
    ratingS = ovRating();
    setValue(ratingS);
  },[]);

    const handleSliderChange = useCallback((event,  value) => {
      //setValue = value;
      b = value;
      // console.log("myvalue: "+b);
      ratingS = ovRating();
      setValue(ratingS);
    },[]);
    
    const handleSliderChange2 = useCallback((event,  value) => {
      //setValue = value;
      c = value;
      // console.log("value: "+c);
      ratingS = ovRating();
      setValue(ratingS);
    },[]);
    
    const handleSliderChange3 = useCallback((event,  value) => {
      //setValue = value;
      d = value;
      console.log("value: "+ d);
      ratingS = ovRating();
      setValue(ratingS);
    },[]);
   
    
 const ovRating = ()=> {
  var sum = a+b+c+d ; 
  // console.log("sum: "+ sum)
  return sum;
 };

    // const debounceSliderChange = debounce((val) => {   
    //   console.log(val);
    //   setValue = val;
    //   },[]);
  
    
       
    const handleSubmit = (e, reason) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
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
        // getAriaValueText={valuetext}
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
          placeholder="Here your comment!"
          required
          multiline          
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

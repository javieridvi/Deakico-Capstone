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



export  function ReviewForm(props) {
    const [ value, setValue] = useState(0); 

    var [a,b,c,d] = useState(0);
      

    const ovRating = () =>{
     return a+b+c+d 
    }
    

    // para guardar el overall-Rating

    //Function para hacer el OverallRating 

   function valuetext(value) {
    return `${value}`;

  }

    const handleSliderChange = useCallback((event,  value) => {
      
      console.log(value);
      setValue = value;
     
      if( event.target.id == "experience"){
        console.log("YEs,true");
      }
      
     
      return value;

    },[]);
  


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
        defaultValue= {ovRating}
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
                <FormControl sx={{ m: '2rem', minWidth: '15rem' ,}}> 
                <Typography>
                ¿How was your overall experience?
                </Typography>
              <Slider
        id = 'experience'
        aria-labelledby='experience'
        defaultValue={value}
        getAriaValueText={valuetext}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={4}        
        sx={{ 
            mb:'3rem'
            
        }} 
        onChange={(e,v) => a= handleSliderChange(e,v *.50)  
                 
                                 } 
      
      />  
     
             <Typography>
            ¿How was the quality of your product/service?
                </Typography>
              <Slider
              id= 'rate'
        aria-label="marks"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={4}
        sx={{
            mb:'3rem'
        }}
        onChange={(e,v) => b= handleSliderChange(e,v*.25)}

      />  
          <Typography>
          ¿The price was according to you?
                </Typography>
              <Slider
              id='price'
        aria-label="Custom marks"
        defaultValue={value}
        getAriaValueText={valuetext}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={4}
        sx={{
            mb:'3rem'
        }}

      />  
      <Typography>
      ¿Would you recommend it?  
                </Typography>
              <Slider
              id='recom'
        aria-label="Custom marks"
        defaultValue={3}
        getAriaValueText={valuetext}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={4}
        sx={{
            mb:'3rem'
        }}
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

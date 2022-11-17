import {React,useState, useCallback,} from 'react'
import {Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Select , Slider, Rating,Pagination, Stack, Input, TextField, debounce , Button, Box, Typography} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';


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



export  function ReviewForm() {
    const [ value, setValue] = useState(0); 
    var rate = 0;
    var ovRating = 0;  // para guardar el overall-Rating

    //Function para hacer el OverallRating 

   function valuetext(value) {
    return `${value}`;
  }
 
  
    const handleSliderChange = useCallback((event,value) => {
      
      debounceSliderChange(value);

    },[]);
  
    
    const debounceSliderChange = debounce((val) => {   
      console.log(val);
      setValue = val;
    //   ovRating = val;
      // console.log("ov", ovRating)
      },5);
  
    
  
    const [open, setOpen] = useState(true);
     
    const handleClose = (e, reason) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    }
    
  return (

    <div>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose} fullWidth 
        >
            <DialogTitle height="5rem" fontWeight="bold" > Your Review </DialogTitle>
            <Box
      sx={{
        
        display: 'inline-block',
        justifyContent:'center',
        alignItems: 'center',
        ml:'40%'
      }}
    >
      {/* Possible picture of the product/service */}
      <div className='ps-userPicture'>
        {/* <input type = 'file'/> */}
        {/* <button>Upload</button> */}
      </div>
   
      {/* Dinamic Overall Rating  */}
      <Rating
        id="overall-feedback"
        defaultValue= {ovRating}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55,  }} fontSize="inherit" />}
        
      />

    </Box>
            <Typography sx={{
                ml:'30px' ,
                fontFamily:'comfortaa'
            }}> Company Name </Typography>
            <DialogContent>
                <Box component= "form" sx = {{
                    display: 'flex', flexWrap: 'wrap', height:'30rem', justifyContent:'center'
                }}>
                <FormControl sx={{ m: 4, minWidth: 400 }}> 
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
        onChange={(e,v) => handleSliderChange(e,v *.50) 
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
        // onChange={(e,v) => handleSliderChange(e,v*.25)}

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
          sx={{ mb: 1 }}
        />
         
                </FormControl>
                </Box>
                <DialogActions>
            <Box sx={{m:'10%'}}>
             <div>
          <Button sx={{mt:' 2rem'}} onClick={handleClose}>Cancel</Button>      
          <Button sx={{mt:'2rem'}} onClick={handleClose}>Ok</Button>
            </div>
         </Box>
        </DialogActions>
            </DialogContent>
        </Dialog>
    </div>
  )
}

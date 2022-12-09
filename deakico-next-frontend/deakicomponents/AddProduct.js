import {React, useState} from 'react'
import { Dialog , Typography, Box , FormControl , Input, TextField,Stack, MenuItem ,InputLabel , ToggleButton , ToggleButtonGroup , Select,FormHelperText , InputAdornment, Button, CardMedia} from '@mui/material'
import itemService from '../services/item.service';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { width } from '@mui/system';




export  function AddProduct(props) {

    const categories = [
        'hair',
        'pastry',
         'food',
         'clothing',
         'cleaning',
        'jewelry',
         'other',
      ];
     const [category, setCategory] = useState('');
     const handleChange = (event) => {
     console.log(event.target.value) ;  
     setCategory(event.target.value);
  
  };

  const [itemType, setItemType] = useState('');

  const handleType = (event) => {
    const t =  event.target.value
    console.log('test: '+ t)
  try{
    setItemType(event.target.value);  //testing
    if((t||{itemType}) == 'product'){
    document.getElementById('datepick').style.display = 'none';
    document.getElementById('stock').style.display= 'block';
    }
    else {
      document.getElementById('datepick').style.display = 'block';
      document.getElementById('stock').style.display= 'none';

    }
  }
  catch(err ){
    console.log("ERROR, cant choose the same twice");
  }
  };



  function redirect() {
    location.replace("/admin")
  } 


   const  getMinutes =(newValue) =>{
  if(newValue != null){
    setValue(newValue)
    var time = String(newValue.format('HH:mm'))
    var hour = parseInt(time.substring(0, time.indexOf(":")))
    var m = parseInt(time.substring(time.indexOf(":")+1))
    console.log("hour in minutes: " + hour*60);
    console.log("minutes: "+ m);
    time = m + hour*60;
    console.log("Final time:"+time)
    setMinute(time)            

  }}

  const AddingItem = (event) =>{
    const catego = category;
    const name  = document.getElementById('itemName').value ; 
    const desc = document.getElementById('description').value ; 
    const price = document.getElementById('price').value;
    const type = itemType;
    const stock = document.getElementById('stock').value;
    const workDuration = minute;
    console.log("Time Picker: "+ workDuration); 
    
   if( catego == "" || name == "" || type == null ){
      
      console.log('error Item not added');
      alert('Item not added, missing information here!');
   }
   else {
    var newItem = {
     i_name : name , 
     i_description: desc, 
     i_price: price , 
     i_category: catego, 
     i_type: type, 
     p_stock: stock, 
     s_timeslot: workDuration,

    } ;
    console.log(newItem); 
    try {
    itemService.insertItem(newItem);
    alert("Item Added");
    redirect();
  }
    catch (err) {
      alert("Error Item not added");
      redirect();
    }
}
}
  
  const [value, setValue] = useState();
  const [minute, setMinute] = useState(0);




  return ( 
    <div>
      <Dialog
         open={props.open}
        //  onClose={props.handleClose} 
         aria-labelledby="modal-modal-title"    
         sx={{
          maxWidth:'100%',
         }}    >
        <Box sx={{
            width: '35rem', 
            height:'38rem',
        }}>
        <Box sx={{backgroundColor:'pink'}}><Button sx={{ml:'1rem', mt:'10px' }} onClick={props.handleClose}> Cancel</Button>
        <Typography sx={{ fontWeight:'bold' , textAlign:'center' ,mt:'10px' }}> New Item </Typography>  </Box> 
        
        
        <div id='itemForm'>
  <Box  mt="1rem" sx={{textAlign:'center'}}>
  {/* <FormHelperText sx={{textAlign:'center'}}>Picture of the Item </FormHelperText> */}
      <Input  variant="standard" noValidate type='file' sx={{ width:'auto', border:'none'}}> </Input>
      </Box> 
      
      
 <Box sx={{display:'flex'}} >  <FormHelperText sx={{ml:'40px', mt:'1rem',  }}>*choose a category</FormHelperText>
  <FormHelperText sx={{ml:'3rem', textAlign:'center', mt:'1rem',  }}>*The type of your item </FormHelperText>   </Box>

  <Box sx={{ml:'40px', display:'flex', }}> 
 <Select
    id="catego"
    defaultValue='Other'
    placeholder='Category'
    value={category}
    onChange={handleChange}
    sx={{m:'10px', minWidth:"18%"}}
    required
  >
    {categories.map((category, index) => (  
    <MenuItem  key={index} value={category} >  
    {category}
    </MenuItem>
    ))}
  </Select> 

  <ToggleButtonGroup  value={itemType} color="primary"
  onChange={handleType} sx={{ml:'16px' }
}>
    <ToggleButton   value='product' sx={{m:'10px' }}>Product</ToggleButton>
    <ToggleButton   disableFocusRipple	 value='service' sx={{m:'10px'}}>Service</ToggleButton>

  </ToggleButtonGroup>

   </Box>
   <Box sx={{ m:'20px' , textAlign:'center', mt:'1rem'}}>       
      <div>
         <FormControl>       
         <TextField id='itemName'required  sx={{m:'10px'}} label=' Item Name' placeholder="Item Name" inputProps={props.name} />
         <TextField id='description'required sx={{m:'10px'}} multiline label="Item Description"/> 
         <TextField id='price' defaultValue={0} type="number"  sx={{m:'10px',}} label="Item Price" InputProps={{
            startAdornment: <InputAdornment position="start"> $ </InputAdornment>, inputProps:{min:0}
          }} /> 
<Box id='stock' display='none'><TextField  type="number"  sx={{m:'10px', width:'15rem' }}  label="Item Stock" InputProps={{ inputProps:{min:0}}}/> </Box>
         <Box id='datepick'display='none' sx={{mt:"1rem", mb:'10px'}}>

         <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <Stack>
  
   <TimePicker
          ampm={false}
          label= "time that takes to get done: hours/min"
          inputFormat="HH:mm"
          value={value}
          onChange={getMinutes}
          renderInput={(params) => <TextField {...params} />}
        />

          </Stack>
        </LocalizationProvider>
        </Box>
        </FormControl>   
       </div>
       <Button  onClick={AddingItem}> Add</Button> 
         </Box>
       </div>
     
        </Box>
      </Dialog>
    </div>
  )
}
  

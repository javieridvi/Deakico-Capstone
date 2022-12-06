import {React, useState} from 'react'
import { Dialog , Typography, Box , FormControl , TextField, MenuItem ,InputLabel , ToggleButton , ToggleButtonGroup , Select,FormHelperText , InputAdornment, Button, CardMedia} from '@mui/material'
import itemService from '../services/item.service';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';




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
    setItemType(event.target.value);  //testing
    try{
    if((t||{itemType}) == 'product'){
    document.getElementById('datepick').style.display = 'none';
    document.getElementById('stock').style.display= 'block';
    }
    else {
      document.getElementById('datepick').style.display = 'inline';
      document.getElementById('stock').style.display= 'none';

    }
  }
  catch(err){
    console.log("ERROR, cant choose the same twice")
  }
  };



  function redirect() {
    location.replace("/admin")
  } 

  const AddingItem = (event) =>{
    const catego = category;
    // console.log(catego);
    const name  = document.getElementById('itemName').value ; 
    // console.log("name: "+name);
    const desc = document.getElementById('description').value ; 
    // console.log("desc: "+desc);
    const price = document.getElementById('price').value;
    // console.log("price: "+price);
    const type = itemType;
    // console.log("type: "+type);
    const stock = document.getElementById('stock').value;
    // console.log("stock: "+stock);
    const workDuration = document.getElementById('timePicker').value;
    console.log("Time Picker: "+ workDuration); 
    
   if( catego || name || price || type == null ){
      
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
    } ;
    console.log(newItem); 
    try {
    itemService.insertItem(newItem);
    alert("Item Added");
    redirect();}
    catch (err) {
      alert("Error Item not added");
      redirect();
    }
}


}
  
  const [value, setValue] = useState(dayjs("HH-mm"));
  // console.log("Testin value: " + value)


  return ( 
    <div>
      <Dialog
         open={props.open}
        //  onClose={props.handleClose} 
         aria-labelledby="modal-modal-title"    
         sx={{
          maxWidth:'xl',
         }}    >
        <Box sx={{
            width: '35rem', 
            height:'38rem',
        }}>
        <Box sx={{backgroundColor:'pink'}}><Button sx={{ml:'1rem', mt:'10px'}} onClick={props.handleClose}> Cancel</Button>
        <Typography sx={{ fontWeight:'bold' , textAlign:'center' }}> New Item </Typography>  </Box> 
        
        
        <div id='itemForm'>
  <Box display='flex' mt="10px">
 <FormHelperText sx={{ml:'40px', mt:'20px', color:'black', }}>*choose a category</FormHelperText>
 <FormHelperText sx={{ml:'58px', mt:'20px',  color:'black', }}>*The type of your item </FormHelperText>
 </Box>   
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
    <ToggleButton  value='product' sx={{m:'10px' }}>Product</ToggleButton>
    <ToggleButton  value='service' sx={{m:'10px'}}>Service</ToggleButton>

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
<Box id='stock' display='none'><TextField  type="number"  sx={{m:'10px' }}  label="Item Stock" InputProps={{ inputProps:{min:0}}}/> </Box>
         <Box id='datepick'display='none' sx={{mt:"1rem", mb:'10px'}}>
         <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <TimePicker
          ampm={false}
          ampmInClock         
          views={['hours', 'minutes']}
          inputFormat="HH:mm"
          mask="__:__"
          // label= "time that would take to get done"
          value={value}   
          onChange={(newValue) => {
            console.log("new Value here: "+ newValue.format('HH:mm'));
            console.log(" Value in minutes here: "+ newValue);

            setValue(newValue.format('HH:mm'));
            
          }}
          
        
          renderInput={(params) => <TextField {...params} />}
        />

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
  
        {/* "i_name": "Apart. Ciudadela",
        "i_description": "el precio es la mensualidad",
        "i_price": "$1.00",
        "i_category": "other",
        "i_rating": "4",
        "i_type": "product",
        "p_stock": 1,
        "pa_id": 5 */}
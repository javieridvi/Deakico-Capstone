import {React, useState} from 'react'
import { Dialog , Typography, Box , FormControl , TextField, MenuItem ,InputLabel , ToggleButton , ToggleButtonGroup , Select,FormHelperText , InputAdornment, Button} from '@mui/material'
import { display } from '@mui/system';
import itemService from '../services/item.service';

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
    console.log('test: '+ event.target.value)
    setItemType(event.target.value);  //testing
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

    var newItem = {
     i_name : name , 
     i_description: desc, 
     i_price: price , 
     i_category: catego, 
     i_type: type, 
     p_stock: stock, 
    } ;

    console.log(newItem); 
    itemService.insertItem(newItem);
    alert("Item Added");
    redirect();
  }



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
        <Box sx={{backgroundColor:'pink'}}><Button sx={{ml:'1rem', mt:'8px'}} onClick={props.handleClose}> Cancel</Button>
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
         <TextField id='itemName'required autoFocus sx={{m:'10px'}} label=' Item Name' placeholder="Item Name" inputProps={props.name} />
         <TextField id='description'required sx={{m:'10px'}} multiline label="Item Description"/> 
         <TextField id='price' defaultValue={0} type="number"  sx={{m:'10px',}} label="Item Price" InputProps={{
            startAdornment: <InputAdornment position="start"> $ </InputAdornment>, inputProps:{min:0}
          }} /> 
         <TextField id='stock'  type="number" sx={{m:'10px'}} label="Item Stock" InputProps={{ inputProps:{min:0}}}/> 
  
        </FormControl>   
       </div>
       <Button onClick={AddingItem}> Add</Button> 
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
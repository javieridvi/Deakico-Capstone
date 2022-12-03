import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, IconButton, InputBase } from "@mui/material";
import { useState } from 'react';

// Search bar for search feed page
export default function Search(props) {
  const [value,setvalue] = useState(null); // Value of that is submitted 
  const [inputValue,setInputvalue] = useState(''); // Value of text in input


  // Submits input text
  function handleSubmit(value) {
    // Submit if not empty
    if(value != null){
      setvalue(value);
      props.handler(value); // Parent handler function
    } else{
      setvalue(''); // Sets value to empty string (Value cannot be null)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: '.5rem',
        border: 'solid rgb(200,200,200) 2px',
        backgroundColor: 'rgba(255, 255, 255, 0.80)',
      }}
    >
      <Autocomplete
        id="Autocomplete"
        freeSolo
        sx={{ ml: 1, flex: 1 }}
        inputValue={inputValue}
        onInputChange={(e, val) => {
          e.preventDefault()
          setInputvalue(val)
        }}
        value={value}
        onChange={(e,val) => {
          e.preventDefault();
          handleSubmit(val)
        }}
        options={props.list.map((option) => option.companyname)} // Uses only the name to generate options
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return <InputBase
            {...params.InputProps}
            {...rest}
            placeholder="Search..."
          />
        }
        }
      />
      
      <IconButton  
      sx={{ p: '10px' }} 
      aria-label="search button" 
      onClick={(e) => {
        e.preventDefault()
        // Can submit empty string which returns list to default
        handleSubmit(inputValue)
      }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
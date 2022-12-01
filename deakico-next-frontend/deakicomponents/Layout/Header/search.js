import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, IconButton, InputBase } from "@mui/material";
import { useRef, useState } from 'react';


export default function Search(props) {
  const [value,setvalue] = useState(null);
  const [inputValue,setInputvalue] = useState('');



  function handleSubmit(event, value) {
    event.preventDefault();
    if(value != null){
      setvalue(value);
    } else{
      setvalue('');
    }
    console.log(value);
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => { console.log(e) }}
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
        onInputChange={(e) => setInputvalue(e.target.value)}
        value={value}
        onChange={(e,v) => handleSubmit(e,v)}
        options={props.list.map((option) => option.pa_companyname)}
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return <InputBase
            {...params.InputProps}
            {...rest}
            id="thisinput"
            placeholder="Search..."
          />
        }
        }
      />
      <IconButton  type="button" sx={{ p: '10px' }} aria-label="search button" onClick={(e) => handleSubmit(e, inputValue)}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
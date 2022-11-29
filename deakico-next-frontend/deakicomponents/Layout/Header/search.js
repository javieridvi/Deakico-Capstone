import { Autocomplete, Box, Divider, IconButton, InputBase, Paper, TextField } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useState } from "react";


export default function Search(props) {

  function handleSubmit(event, value) {
    event.preventDefault();
    console.log(value);
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {console.log(e)}}
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
        id="free-solo-demo"
        freeSolo
        options={props.list.map((option) => option.pa_companyname)}
        sx={{ ml: 1, flex: 1 }}
        onChange={handleSubmit}
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return <InputBase
            {...params.InputProps}
            {...rest}
            placeholder="Search..."
            // inputProps
          />}
        }
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search button" on >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
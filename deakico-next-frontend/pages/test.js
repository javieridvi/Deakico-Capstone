import { Box } from "@mui/material";
import { useState } from "react";
import { LogInPopUp } from "../deakicomponents/Modal";


export default function Test() {
  const [open, setOpen] = useState(true);
  function handleClose(){setOpen(false)};
  
  return(
    <Box
    sx={{
      width: '100vh',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <LogInPopUp
      open={open}
      handleClose={handleClose}
      title={'This is a test'}
      message={'This a test mesage'}
      />
    </Box>
  )
}
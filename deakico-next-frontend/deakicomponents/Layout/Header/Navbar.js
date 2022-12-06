import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import authService from "../../../services/auth/auth.service";

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(authService.isLoggedIn())
  },[])

  return (
    <Stack
    className="NavBar"
    direction='row' 
    width={'100%'}
    justifyContent={'space-evenly'}
    >
      <Button variant='text' href='/'><HomeIcon/></Button>
      <Button variant='text' href='/about'><InfoIcon/></Button>
      {
        loggedIn? (
          <Button variant='text' href='/admin'><StoreRoundedIcon/></Button>
        ) : null
      }
      <Button variant='text' href='/feed'><SearchIcon/></Button>
    </Stack>
  );
}
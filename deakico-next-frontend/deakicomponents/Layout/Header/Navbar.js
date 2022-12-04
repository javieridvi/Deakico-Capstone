import { Button, Stack } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

export default function NavBar() {
  return (
    <Stack
    className="NavBar"
    direction='row' 
    width={'100%'}
    justifyContent={'space-evenly'}
    >
      <Button variant='text' href='/'><HomeIcon/></Button>
      <Button variant='text' href='/about'><InfoIcon/></Button>
      <Button variant='text' href='/admin'><StoreRoundedIcon/></Button>
      <Button variant='text' href='/feed'><SearchIcon/></Button>
    </Stack>
  );
}
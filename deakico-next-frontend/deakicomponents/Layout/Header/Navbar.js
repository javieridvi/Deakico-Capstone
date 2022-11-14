import { Button, Stack } from "@mui/material";
export default function NavBar() {
  return (
    <Stack
    className="NavBar"
    direction='row' 
    width={'100%'}
    justifyContent={'space-evenly'} 
    >
      <Button variant='text' href='/'>Home</Button>
      <Button variant='text' href='/about'>About</Button>
      <Button variant='text' href='/personal-feed'>Services</Button>
      <Button variant='text' href='/personal-feed'>Products</Button>
      <Button variant='text' href='/admin'>Profile</Button>
    </Stack>
  );
}
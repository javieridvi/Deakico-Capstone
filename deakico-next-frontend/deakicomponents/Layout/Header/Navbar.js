import { Button, Stack } from "@mui/material";

export default function NavBar() {
  return (
    <Stack direction='row' spacing={2} marginRight={-10}>
      <Button variant='text' href='/'>Home</Button>
      <Button variant='text' href='/about'>About</Button>
      <Button variant='text' href='/personal-feed'>Services</Button>
      <Button variant='text' href='/personal-feed'>Products</Button>
      <Button variant='contained' href='/admin'>Profile</Button>
    </Stack>
  );
}
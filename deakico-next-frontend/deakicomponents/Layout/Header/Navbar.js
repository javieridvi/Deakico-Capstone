import { Button, Stack } from "@mui/material";

export default function NavBar() {
  return (
    <Stack direction='row' spacing={6}>
      <Button variant='text' href='/'>Home</Button>
      <Button variant='text' href='/#'>Services</Button>
      <Button variant='text' href='/#'>Products</Button>
      <Button variant='text' href='/about'>About</Button>
    </Stack>
  );
}
import { Button, Stack } from "@mui/material";

export default function NavBar() {
  return (
    <Stack direction='row' spacing={2} marginRight={-15}>
      <Button variant='text' href='/'>Home</Button>
      <Button variant='text' href='/personal-feed'>Services</Button>
      <Button variant='text' href='/personal-feed'>Products</Button>
      <Button variant='text' href='/#'>About</Button>
    </Stack>
  );
}
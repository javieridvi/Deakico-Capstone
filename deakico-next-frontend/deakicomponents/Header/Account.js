import { Button, ButtonGroup, Stack } from "@mui/material";


export default function Account() {

  return (
    <ButtonGroup variant="outlined">
      <Button href='/login'>
        Log in
      </Button>
      <Button href='/signup' variant='contained'>
        Sign Up
      </Button>
    </ButtonGroup>
  )
}
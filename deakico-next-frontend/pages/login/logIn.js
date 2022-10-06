import * as React from 'react';
import { Typography, Container, TextField, Button, Link, Stack, styled } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function LogIn (){

    const theme = createTheme({
        palette: {
            primary: {
                main: '#EA498C',
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
             {/* Material UI from here on out. */}
             <Container  maxWidth={false} sx={{maxWidth: '25em'}} >
                <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '1em',
                    padding: '2em 1.5em',
                }}>
                    <img src='/Deakico-Icon.svg' alt='Deakico Icon' height={'60px'}/>

                    <Typography variant='h5' color='text.disabled' sx={{fontWeight:'bold'}}>Deakico</Typography>

                    <Stack sx={{alignItems: 'center'}}>
                    <Typography component='h1' variant='h5' sx={{fontWeight:'bold'}}>Log In to Dashboard</Typography>
                    <Typography 
                    variant='caption' 
                    color='text.disabled' 
                    sx={{ 
                        fontWeight: 'medium',
                        paddingBottom: '2em',
                        }}
                        >Enter your email and password below</Typography>
                    </Stack>


                        
                    <Stack component="form"
                    sx={{
                        backgroundColor: 'white',
                        minWidth: '100%'
                    }}>
                        <TextField placeholder='Email address' label='Email' margin='dense'/>

                        <TextField placeholder='Password' label='Password' margin='normal'/>

                        <Button variant='contained' 
                        sx={{
                            margin: '1rem',
                            boxShadow: '0px 4px 12px rgba(55, 81, 255, 0.24)',
                        }}>
                            <Typography variant='button'>Log In</Typography>
                        </Button>

                    </Stack>

                    <Typography color='text.disabled'>Don't have an account? <Link underline='hover' >Sign up</Link></Typography>

                </Stack>
             </Container>
        </ThemeProvider>
    )
}
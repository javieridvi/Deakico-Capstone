import { AppBar, Grid, Toolbar } from '@mui/material';
import * as React from 'react';
import Account from './Account';
import LogoName from './logo-name';
import NavBar from './Navbar';
import Search from './search';


export default function Header() {

  return (
    <AppBar color='secondary'>
      <Toolbar>
        <Grid container spacing={4}>
          <Grid item xs="auto" display="flex" justifyContent="center" alignItems="center" >
            <LogoName />
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="center" alignItems="center" >
            <Search />
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="center" alignItems="center" >
            <NavBar />
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="center" alignItems="center" >
            <Account />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
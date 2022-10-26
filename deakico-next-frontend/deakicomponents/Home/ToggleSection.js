import { Switch, ToggleButton, Box, Typography, Card } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useState } from "react";
import { ThemeProvider } from "@mui/system";
import { ToggleCard } from "../Card";

let theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#EA498C',
    },
    secondary: {
      main: '#BCEFDD',
    },
  },
  typography: {
    fontFamily: 'Comfortaa',
  },
});

theme = responsiveFontSizes(theme);

export default function ToggleSection() {

  //arbitrarily, true==Product, false==Service
  const [toggle, setToggle] = useState(true);

  const displayItems = () => {

    if (toggle) {
      return (
        <Box>
          <Typography component='h4' variant='h4' align="center"
            sx={{
              padding: '2rem',
            }}>
            Products
          </Typography>
          <ToggleCard
            src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
            label="Products"
            children="Here goes various products that are trending or have good reviews. 
                Deakico will offer many products from a diversity of local providers"
          />
        </Box>
      );
    }
    else {
      return (
        <Box>
          <Typography component='h4' variant='h4' align="center"
            sx={{
              padding: '2rem',
            }}>
            Services
          </Typography>
          <ToggleCard
            src="https://www.usan.com/wp-content/uploads/2013/09/customer-self-service.jpg"
            label="Services"
            children="Here goes various services that are trending or have good reviews. 
                    Deakico will offer many servicess from a diversity of local providers"
          />
        </Box>

      );
    }

  }

  return (
    <ThemeProvider theme={theme}>
      <Box component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Typography component='h3' variant='h3'
          sx={{
            padding: '2rem',
          }}
        >
          Service or Product
        </Typography>

        {displayItems()}
        <Switch
          checked={toggle}
          onChange={e => setToggle(e.target.checked)} >

        </Switch>

      </Box>
    </ThemeProvider>
  );
}
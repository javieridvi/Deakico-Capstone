import { Switch, ToggleButton, Box, Typography, Card, Stack } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/system";
import { ProductCard, ToggleCard } from "../Reusable/Card";
import itemService from "../../services/item.service";

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

function sortIntHelper(a, b) {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
}

export default function ToggleSection() {

  //arbitrarily, true==Product, false==Service

  const [toggle, setToggle] = useState(true);  
  var servToSort = [];
  var prodToSort = [];
  const [productList, setProductList] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  const fetchData = () => {
    itemService.getItemByType('product').then((res) => {
      prodToSort = res.data;
      prodToSort.sort((a, b) => sortIntHelper(a.i_rating, b.i_rating));
      prodToSort = prodToSort.slice(0,3);
      setProductList(prodToSort);
    })
    itemService.getItemByType('service').then((res) => {
     servToSort = res.data;
     servToSort.sort((a, b) => sortIntHelper(a.i_rating, b.i_rating));
     servToSort = servToSort.slice(0, 3);
     setServiceList(servToSort);
    })
  }
  useEffect(() => {
    fetchData();
  }, [])

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
          
          {productList.map((product) => {
            return (
            <ProductCard
              id={product.i_id}
              title={product.i_name}
              price={product.i_price}
              rating={product.i_rating}
              category={product.i_category}
              description={product.i_description}
            />
            )
          })}
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
          {serviceList.map((service) => {
            return (
            <ProductCard
              id={service.i_id}
              title={service.i_name}
              price={service.i_price}
              rating={service.i_rating}
              category={service.i_category}
              description={service.i_description}
            />
            )
          })}
          
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
            paddingTop: '2rem',
          }}
        >
          Best Sellers
        </Typography>
        <Switch
          checked={toggle}
          onChange={e => setToggle(e.target.checked)} >

        </Switch>
        <Stack 
        direction={'row'} 
        gap={4} 
        paddingBottom='2rem' 
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        >
        {displayItems()}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
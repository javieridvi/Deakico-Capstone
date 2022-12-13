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

export default function ToggleSection(props) {

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
      prodToSort = prodToSort.slice(0, 3);
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
        <>
          <Typography component='h4' variant='h4' align="center"
            sx={{
              padding: '2rem',
            }}>
            Products
          </Typography>
          <Box
            sx={{
              display: 'flex',
              // flexWrap: 'wrap',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
            }}>


            {productList.map((product) => {
              return (
                <div key={product.i_id}>

                  <ProductCard
                    id={product.i_id}
                    title={product.i_name}
                    price={product.i_price}
                    rating={product.i_rating}
                    category={product.i_category}
                    description={product.i_description}
                    src={props.image ? props.image : '/product-placeholder.png'}
                  />
                </div>
              )
            })}
          </Box>
        </>
      );
    }
    else {
      return (
        <>
          <Typography component='h4' variant='h4' align="center"
            sx={{
              padding: '2rem',
            }}>
            Services
          </Typography>
          <Box
            sx={{
              display: 'flex',
              //flexWrap: 'wrap',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
            }}
          >

            {serviceList.map((service) => {
              return (
                <div key={service.i_id}>
                  <ProductCard
                    id={service.i_id}
                    title={service.i_name}
                    price={service.i_price}
                    rating={service.i_rating}
                    category={service.i_category}
                    description={service.i_description}
                    src={props.image ? props.image : '/product-placeholder.png'}
                  />
                </div>
              )
            })}

          </Box>
        </>
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
          gap={4}
          paddingBottom='2rem'
        >
          {displayItems()}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
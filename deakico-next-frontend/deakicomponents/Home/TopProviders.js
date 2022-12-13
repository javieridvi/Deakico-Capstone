import { Box, ThemeProvider, Typography, createTheme, responsiveFontSizes} from "@mui/material";
import { Stack } from "@mui/system";
import { DefaultTest, ProductTest, ProviderCard, ProviderTest } from "../Reusable/Card";
import providerService from "../../services/provider.service";
import { useEffect, useState } from "react";

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
  
export default function TopProviders(props) {
  var toSort = [];
  const [providerList, setProviderList] = useState([]);

  const fetchData = () => {
    providerService.getAllProviders().then((res) => {
      toSort = res.data;
      toSort.sort((a, b) => sortIntHelper(a.rating, b.rating));
      toSort = toSort.slice(0,3);
      setProviderList(toSort);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box component={'div'} 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2rem',
        backgroundColor: 'white',
      }}
      >
        <Typography component='h3' variant='h3'
        sx={{
          padding: '2rem',
        }}
        >
          Featured Providers
        </Typography>
        <Stack 
        direction={'row'} 
        gap={4} 
        paddingBottom='2rem' 
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        >
        {
          providerList.map((provider) => {
            return (
              <ProviderCard 
              id={provider.id} 
              type={provider.type}
              title={provider.companyname}
              rating={provider.rating}
              description={provider.desc}
              category={provider.category}
              src={props.image ? props.image : '/product-placeholder.png'}
              //following
              //logIn()
              />
            )
          })
        }
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
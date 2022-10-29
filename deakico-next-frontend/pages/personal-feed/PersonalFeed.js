import { Box, Grid } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { FeedCard } from "../../deakicomponents/Card";

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

export default function PersonalFeed() {
  const itemList = [
    "Provider 1",
    "Provider 2",
    "Provider 3",
    "Provider 4",
    "Provider 5",
    "Provider 6",
    "Provider 7",
    "Provider 8",
    "Provider 9",
  ]

  const cardDesc = "Here goes various providers that are trending or have good reviews. Deakico will offer many products and services from a diversity of local providers";

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            position: 'relative',
            minHeight: '100vh',
            maxWidth: '100rem',
            backgroundColor: 'white',
            padding: '50px 100px'
          }}
        >
          {itemList.map((e, index) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <FeedCard
                  label={e}
                  src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
                  children={cardDesc}
                />
              </Grid>
            );
          })}
        </Grid>
        <Box sx={{
          backgroundImage: 'linear-gradient(rgba(255,0,0, 0), rgba(0,0,0, 1))',
          position: 'fixed',
          bottom: '0',
          padding: '100px',
          width: '100%',
        }} />
      </Box>
    </ThemeProvider>
  );
}
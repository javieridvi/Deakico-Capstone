import { Box, ThemeProvider, Typography, createTheme, responsiveFontSizes} from "@mui/material";
import { Stack } from "@mui/system";
import { ProviderTest } from "../Card";

let theme = createTheme({
  typography: {
    fontFamily: 'Comfortaa',
  },
});

theme = responsiveFontSizes(theme);

export default function TopProviders() {


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
          Top 3 Providers
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
          <ProviderTest/>
          <ProviderTest/>
          <ProviderTest/>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
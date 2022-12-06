import { Box, ThemeProvider, Typography, createTheme, responsiveFontSizes} from "@mui/material";
import { Stack } from "@mui/system";
import { DefaultTest, ProductTest, ProviderTest } from "../Reusable/Card";



export default function TopProviders() {


  return (
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
  );
};
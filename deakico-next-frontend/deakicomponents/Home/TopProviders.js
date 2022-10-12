import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ProviderTest } from "../Card";


export default function TopProviders() {


  return (
    <Box component={'div'} 
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '2rem',
    }}
    >
      <Typography component='h3' variant='h3'
      sx={{
        padding: '2rem',
      }}
      >
        Top 3 Providers
      </Typography>
      <Stack direction={'row'} columnGap={4} paddingBottom='2rem'>
        <ProviderTest/>
        <ProviderTest/>
        <ProviderTest/>
      </Stack>
    </Box>
  );
};
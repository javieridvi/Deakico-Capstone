import { Stack, Typography } from "@mui/material";
import Banner from "../../deakicomponents/Home/Banner";
import Categories from "../../deakicomponents/Home/Categories";
import TopProviders from "../../deakicomponents/Home/TopProviders";


export default function Home(){

  return (
    <Stack
    direction='column'
    justifyContent='flex-start'
    alignItems='center'
    spacing={0}

    sx={{
      position: 'relative',
      minHeight: '100vh',
      maxWidth: '50rem',
      backgroundColor: 'white',
    }}
    >
      <Banner/>
      <Typography variant="h4">Service/Provider Toggle</Typography>
      <TopProviders/>
      <Typography variant="h2"><Categories/></Typography>
      <Typography variant="h2">Extra info</Typography>
    </Stack>
  );
};
import { Stack, Typography } from "@mui/material";
import Banner from "../../deakicomponents/Home/Banner";
import Categories from "../../deakicomponents/Home/Categories";
import TopProviders from "../../deakicomponents/Home/TopProviders";


export default function Home(){

  return (
    <Stack
    sx={{
      minHeight: '100vh',
      backgroundColor: 'white',
      maxWidth: '50rem',
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <Typography variant="h2"><Banner/></Typography>
      <Typography variant="h4">Service/Provider Toggle</Typography>
      <TopProviders/>
      <Typography variant="h2"><Categories/></Typography>
      <Typography variant="h2">Extra info</Typography>
    </Stack>
  );
};
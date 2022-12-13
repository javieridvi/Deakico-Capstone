import { Box, Grid } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ProviderCard } from "../Reusable/Card";
import followsService from "../../services/follows.service";


export default function Follows() {
  const [displayedProviders, setDisplayedProviders] = useState([]);

  async function RequestFollowing() {
    const response = await followsService.getFollowing().then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    })
    console.log(response);
    setDisplayedProviders(response);
  }

  useEffect(() => {
    RequestFollowing();
  }, [])

  return (
    <>
      <Head>
        <title>Following</title>
      </Head>

      <Box
        className='Container'
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#f1f1f1'
        }}
      >
        <Grid className="Results"
          container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          sx={{
            position: 'relative',
            height: '100%',
            maxWidth: '100rem',
            paddingTop: '1rem',
            paddingBottom: '100px'
          }}
        >
          {displayedProviders?.map((e, index) => {
            return (
              <Grid item key={index} xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ProviderCard
                  type={index % 2 == 0 ? 'Product' : 'Service'}
                  category={e.provider_pa_category}
                  src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
                  title={e.provider_pa_companyname}
                  description={e.provider_pa_desc}
                  price={e.provider_pa_price}
                  rating={e.provider_pa_rating}
                  following={true}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  )
}
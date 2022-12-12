import { Box, Grid } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ProductCard, ProviderCard } from "../Reusable/Card";
import likeService from "../../services/likes.service";


export default function Liked() {
  const [likedItems, setLikedItems] = useState([]);

  async function RequestLiked() {
    const response = await likeService.getUserLiked().then((response) => {
      console.log(response.data);
      return response.data;
    }).catch((error) => {
      console.log(error);
    })
    console.log(response);
    setLikedItems(response);
  }

  useEffect(() => {
    RequestLiked();
  }, [])

  return (
    <>
      <Head>
        <title>Liked</title>
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
          {likedItems?.map((e, index) => {
            return (
              <Grid item key={index} xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ProductCard
                  id={e.items_pa_id}
                  title={e.items_i_name}
                  description={e.items_i_description}
                  price={e.items_i_price}
                  category={e.items_i_category}
                  rating={e.items_i_rating}
                  liked={true}
                  src={e.items_i_image ? e.items_i_image : '/product-placeholder.png'}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
    /**
     * items_i_category
     * items_i_description
     * items_i_id
     * items_i_name
     * items_i_price
     * items_i_rating
     * items_i_type
     * items_p_stock
     * items_pa_id
     * items_s_timeslot
     */
  )
}
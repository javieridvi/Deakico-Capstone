import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Banner from "../../deakicomponents/Home/Banner";
import Categories from "../../deakicomponents/Home/Categories";
import ToggleSection from "../../deakicomponents/Home/ToggleSection";
import TopProviders from "../../deakicomponents/Home/TopProviders";
import itemService from "../../services/item.service"

function Home(){
  
  const [categories, setCategories] = useState([]);

  function callGetItemCategories() {
    itemService.getItemCategories()
    .then((res) => {setCategories(res.data.map((e)=> {return e.i_category}))}).catch((err) => console.log(err));
  };

  useEffect(() => {
    callGetItemCategories();
  }, []);

  // const categories = [
  //   "Hair",
  //   "Pastry",
  //   "Food",
  //   "Clothing",
  //   "Cleaning",
  //   "Jewelery",
  //   "Other"
  // ];

  return (
    <Stack
    className="CenterColumn"
    direction='column'
    justifyContent='flex-start'
    alignItems='center'
    spacing={0}
    gap={1}
    sx={{
      position: 'relative',
      minHeight: '100vh',
      width: 'min(80rem,100%)',
      '& > *':{
        width: '100%',
        marginBottom: '4rem',
      }
    }}
    >
      <Banner/>
      <ToggleSection/>
      <TopProviders/>
      <Categories categoryList={categories}/>
      
    </Stack>
  );
};
export default Home;

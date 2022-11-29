import { Box, Button, ButtonBase, FormControl, Grid, List, ListItemButton, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProviderCard } from "../../deakicomponents/Card";
import Search from "../../deakicomponents/Layout/Header/search";
import providerService from "../../services/provider.service";

export default function Feed(props) {
  const [initialArray, setInitialArray] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [optionsVis, setOptionsVis] = useState(false);
  const [filters, setFilters] = useState({
    category: {
      index: -1,
      name: 'None'
    },
    sort: {
      index: -1,
      name: 'None'
    }
  });

  async function RequestProviders() {
    const response = await providerService.getAllProviders().then((res) => {
      return res.data;
    }).catch((err) => {
      console.log(err);
    })
    console.log(response);
    setInitialArray(response);
    setDisplayedCards(response);
  }

  useEffect(() => {
    RequestProviders();
  }, [])


  function handleOptionsVis() {
    setOptionsVis((state) => !state);
  }

  function handleFilters(newFilters) {
    handleOptionsVis();
    setFilters(newFilters);
    setDisplayedCards(resultsModify(initialArray, newFilters.category.name, newFilters.sort.name));
  }

  function TypeSelect() {
    const [val, setVal] = useState(props.type); // int default 0 / services

    const handleChange = (event) => {
      setVal(event.target.value);
    };
    return (
      <FormControl>
        <Select
          value={val}
          onChange={handleChange}
          sx={{
            height: '40px',
          }}
        >
          <MenuItem value={0}>Services</MenuItem>
          <MenuItem value={1}>Products</MenuItem>
        </Select>
      </FormControl>
    )
  }

  return (
    <Box
      className="FeedContainer"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 'min(1600px, 100%)',
        backgroundColor: 'white',
      }}
    >
      <Box className="Search" >
        <Box className="Input"
          sx={{
            height: '50px',
            padding: '10px .5rem 0 .5rem',
          }}
        >
          <Search />
        </Box>
        <Box className="Filters"
          sx={{
            width: '100%',
            height: '60px',
            padding: '0 .5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TypeSelect />
          <Button variant="outlined"
            onClick={handleOptionsVis}
            sx={{
              height: '40px',
            }}
          >
            options
          </Button>
        </Box>
      </Box>
      <Box
        className="options"
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: '60px',
          width: '100%',
          height: optionsVis ? '100vh' : '0',
          display: optionsVis ? 'block' : 'none',
          maxHeight: '100vh',
          backgroundColor: 'white',
          transition: 'height 0.5s ease-in-out',
          overflow: 'clip',
        }}
      >
        <Options start={filters} save={handleFilters} />
      </Box>
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
        {displayedCards.map((e, index) => {
          return (
            <Grid item key={index} xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ProviderCard
                type={index % 2 == 0 ? 'Product' : 'Service'}
                category={e.pa_category}
                src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
                title={e.pa_companyname}
                description={e.pa_desc}
                price={e.pa_price}
                rating={e.pa_rating}
                followers={e.pa_followers}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

function Options(props) {

  const [selectedIndexCat, setSelectedIndexCat] = useState(props.start.category.index);
  const [selectedIndexSort, setSelectedIndexSort] = useState(props.start.sort.index);
  const [option, setOption] = useState(true);

  const handleCatClick = (event, index) => {
    let i = index;
    if (selectedIndexCat == i) {
      i = -1;
    }
    setSelectedIndexCat(i);
  };
  const handleSortClick = (event, index) => {
    let i = index;
    if (selectedIndexCat == i) {
      i = -1;
    }
    setSelectedIndexSort(index);
  };

  const handleOptionTrue = () => {
    setOption(true)
  }

  const handleOptionFalse = () => {
    setOption(false)
  }

  function handleSave(catI, sortI) {
    const filter = {
      category: saveHelper(catI, categories),
      sort: saveHelper(sortI, sortOptions)
    }
    props.save(filter);
  }

  function saveHelper(index, array) {
    return {
      index: index,
      name: index < 0 ? 'None' : array[index]
    }
  }

  const categories = [
    "hair",
    "pastry",
    "food",
    "clothing",
    "cleaning",
    "jewelry",
    "other"
  ]

  const sortOptions = [
    "A to Z",
    "Z to A",
    "Best Ratings",
    "Most Followed"
  ]



  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <ButtonBase
          onClick={handleOptionTrue}
          sx={{
            width: '100%',
            padding: '1rem',
            backgroundColor: !option ? 'transparent' : 'rgba(234, 73, 140, 0.08)',
          }}
        >
          <Typography
            variant={'h6'}>
            Categories
          </Typography>
        </ButtonBase>
        <ButtonBase
          onClick={handleOptionFalse}
          sx={{
            width: '100%',
            padding: '1rem',
            backgroundColor: option ? 'transparent' : 'rgba(234, 73, 140, 0.08)',
          }}
        >
          <Typography
            variant={'h6'}
          >
            Sort By
          </Typography>
        </ButtonBase>
      </Box>
      <List
        sx={{
          position: 'absolute',
          padding: 0,
          width: !option ? 0 : '100%',
          height: !option ? 0 : '100%',
          borderTop: '1px solid rgba(0,0,0,.2)',
          overflow: 'clip',
          transition: 'height 1s ease-in-out',
        }}
      >
        {categories.map((item, index) => (
          <ListItemButton
            key={item}
            selected={selectedIndexCat === index}
            onClick={(event) => handleCatClick(event, index)}
            sx={{
              minHeight: 32,
              borderBottom: '1px solid rgba(0,0,0,.2)',
            }}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        ))}

      </List>
      <List
        sx={{
          position: 'absolute',
          padding: 0,
          width: option ? 0 : '100%',
          height: option ? 0 : '100%',
          borderTop: '1px solid rgba(0,0,0,.2)',
          overflow: 'clip',
          transition: 'height 1s ease-in-out',
        }}
      >
        {sortOptions.map((item, index) => (
          <ListItemButton
            key={item}
            selected={selectedIndexSort === index}
            onClick={(event) => handleSortClick(event, index)}
            sx={{
              minHeight: 32,
              borderBottom: '1px solid rgba(0,0,0,.2)',
            }}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        ))}

      </List>
      <Button variant='contained'
        size="large"
        onClick={() => handleSave(selectedIndexCat, selectedIndexSort)}
        sx={{
          left: '50%',
          bottom: '-70%',
          transform: 'translate(-50%,-150%)',
        }}
      >
        save
      </Button>
    </Box>
  )
}

//Funcion para filtrar y sort el array de providers
function resultsModify(array, category, sort) {
  let newArray = array; //Puede que sea innecesario guardarlo en variable

  if (category != 'None') {
    newArray = newArray.filter(provider => provider.pa_category == category);
  }

  if (sort != 'None') {
    switch (sort) {
      case "A to Z":
        newArray.sort((a, b) => a.pa_companyname.localeCompare(b.pa_companyname));
        break;
      case "Z to A":
        newArray.sort((a, b) => b.pa_companyname.localeCompare(a.pa_companyname));
        break;
      case "Best Ratings":
        newArray.sort((a, b) => sortIntHelper(a.pa_rating, b.pa_rating));
        break;
      case "Most Followed":
        newArray.sort((a, b) => sortIntHelper(a.pa_followers, b.pa_followers));
        break;
    }
  }
  return newArray;
}

// Ayuda a sort a ints. Default es de Mayor a menor. (pasar valores en int directo)
function sortIntHelper(a, b) {
    if(a < b) {
      return 1;
    } else if(a > b) {
      return -1;
    } else {
      return 0;
    }
}

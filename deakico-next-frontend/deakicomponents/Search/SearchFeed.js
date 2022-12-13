import { Box, Button, ButtonBase, FormControl, Grid, List, ListItemButton, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ProviderCard } from "../Reusable/Card";
import Search from "./SearchBar";
import providerService from "../../services/provider.service";
import authService from "../../services/auth/auth.service";
import { LogInPopUp } from '../Modal';

// No filters
const noFilter = {
  category: {
    index: -1,
    name: 'None'
  },
  sort: {
    index: -1,
    name: 'None'
  }
}

export default function Feed() {
  const [initialArray, setInitialArray] = useState([]);     // Stores the response
  const [displayedCards, setDisplayedCards] = useState([]); // Array to be displayed
  const [optionsVis, setOptionsVis] = useState(false);      // Hides the options menu
  const [filters, setFilters] = useState(noFilter);         // Stores the filters

  // Modal **
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  function handleLogInOpen(title) {
    setModalTitle(title);
    setOpen(true);
  };
  const handleLogInClose = () => setOpen(false);
  // ** end fo modal

  // Retrives the providers
  async function RequestProviders() {
    let request;
    if (authService.isLoggedIn()) {
      request = providerService.getAllProvidersWithFollow;
    } else {
      request = providerService.getAllProviders;
    }
    const response = await request().then((res) => {
      console.log(res.data);
      return res.data;
    }).catch((err) => {
      console.log(err);
    })
    setInitialArray(response);
    setDisplayedCards(response);
  }

  // Send request on first render
  useEffect(() => {
    RequestProviders();
  }, [])

  // Sets the options to oposite state
  function handleOptionsVis() {
    setOptionsVis((state) => !state);
  }

  // Modifies displayed array based on given filters
  function handleFilters(newFilters) {
    handleOptionsVis();
    setFilters(newFilters);
    setDisplayedCards(resultsModify(initialArray, newFilters.category.name, newFilters.sort.name));
  }

  // Filters by submited search value
  function handleSearch(compName) {
    setFilters(noFilter); // Reset filters
    let newArray = initialArray.filter(provider =>
      provider.companyname.toLocaleLowerCase().includes(compName.toLocaleLowerCase()
      ));
    setDisplayedCards(resultsModify(newArray, noFilter.category.name, noFilter.sort.name));
  }

  // Service/Provider selection component
  function TypeSelect() {
    const [val, setVal] = useState(0); // int default 0 / services

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
    <Box className="SearchFeed"
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
          <Search list={initialArray} handler={handleSearch} />
        </Box>
        <Box className="Filters"
          sx={{
            width: '100%',
            height: '60px',
            padding: '0 .5rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {/* <TypeSelect /> */}
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
      <Box className="options"
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: '110px',
          width: '100%',
          height: optionsVis ? '100vh' : '0',
          display: optionsVis ? 'block' : 'none',
          maxHeight: '100vh',
          backgroundColor: 'white',
          transition: 'height 0.5s ease-in-out',
          overflow: 'clip',
        }}
      >
        {/* Unmount options when not visible, required to reset filters */}
        {optionsVis ? <Options start={filters} save={handleFilters} /> : ''}
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
                id={e.id}
                title={e.companyname}
                description={e.desc}
                rating={e.rating}
                category={e.category}
                following={e.following}
                LogIn={handleLogInOpen}
                type={index % 2 == 0 ? 'Product' : 'Service'}
                src={e.image? e.image : "https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"}
              />
            </Grid>
          );
        })}
      </Grid>
      <div className="layers">
        {open ?
          <LogInPopUp
            open={open}
            handleClose={handleLogInClose}
            title={'Follow ' + modalTitle + ' to make it easier to keep up with them on Deakico.'}
            message={'Sign up to follow your favorite providers.'}
          /> :
          ''
        }
      </div>
    </Box>
  );
}

// Options component
function Options(props) {
  const [selectedIndexCat, setSelectedIndexCat] = useState(props.start.category.index); // Category Index
  const [selectedIndexSort, setSelectedIndexSort] = useState(props.start.sort.index);   // Sort Index
  const [option, setOption] = useState(true); // Used to switch between catgory or sort view

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


  // Called when category is clicked
  const handleCatClick = (event, index) => {
    let i = index;
    // Unselects category
    if (selectedIndexCat == i) {
      i = -1;
    }
    setSelectedIndexCat(i);
  };

  // Called when sort is clicked
  const handleSortClick = (event, index) => {
    let i = index;
    if (selectedIndexCat == i) {
      i = -1;
    }
    setSelectedIndexSort(index);
  };

  // Set option to true
  const handleOptionTrue = () => {
    setOption(true)
  }

  // Set option to false
  const handleOptionFalse = () => {
    setOption(false)
  }

  // Saves the selected filter options
  function handleSave(catI, sortI) {
    const filter = {
      category: saveHelper(catI, categories),
      sort: saveHelper(sortI, sortOptions)
    }
    props.save(filter); // Parent save handler
  }

  // Cuts on redundant code
  function saveHelper(index, array) {
    return {
      index: index,
      name: index < 0 ? 'None' : array[index]
    }
  }

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

// Returns filtered provider array based on given parameters
function resultsModify(array, category, sort) {
  let newArray = array; //Puede que sea innecesario guardarlo en variable

  if (category != 'None') {
    newArray = newArray.filter(provider => provider.category == category);
  }

  if (sort != 'None') {
    switch (sort) {
      case "A to Z":
        newArray.sort((a, b) => a.companyname.localeCompare(b.companyname));
        break;
      case "Z to A":
        newArray.sort((a, b) => b.companyname.localeCompare(a.companyname));
        break;
      case "Best Ratings":
        newArray.sort((a, b) => sortIntHelper(a.rating, b.rating));
        break;
      case "Most Followed":
        newArray.sort((a, b) => sortIntHelper(a.followers, b.followers));
        break;
    }
  }
  return newArray;
}

// Sorts int in descending order as default 
function sortIntHelper(a, b) {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
}

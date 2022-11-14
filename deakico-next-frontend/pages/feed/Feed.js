import { Box, Button, ButtonBase, FormControl, Grid, List, ListItemButton, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { ProviderCard } from "../../deakicomponents/Card";


const itemList = [
  { title: "Provider 1", rating: 0, price: '$' + 1.50 },
  { title: "Provider 2", rating: 0.5, price: '$' + 61.32 },
  { title: "Provider 3", rating: 1, price: '$' + 50.00 },
  { title: "Provider 4", rating: 1.5, price: '$' + 42.26 },
  { title: "Provider 5", rating: 2, price: '$' + 100.00 },
  { title: "Provider 6", rating: 2.5, price: '$' + 100.00 },
  { title: "Provider 7", rating: 3, price: '$' + 100.00 },
  { title: "Provider 8", rating: 3.5, price: '$' + 100.00 },
  { title: "Provider 9", rating: 4, price: '$' + 100.00 },
]

export default function Feed(props) {
  const [displayedCards, setDisplayedCards] = useState(itemList);

  const cardDesc = "Here goes various providers that are trending or have good reviews. Deakico will offer many products and services from a diversity of local providers";

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
            marginLeft: '.5rem',
          }}
        >
          <MenuItem value={0}>Services</MenuItem>
          <MenuItem value={1}>Products</MenuItem>
        </Select>
      </FormControl>
    )
  }

  const [optionsVis, setOptionsVis] = useState(false);

  function handleOptionsVis() {
    setOptionsVis((state) => !state);
  }

  const [filter, setFilters] = useState({
    category: {
      index: -1,
      name: ''
    },
    sort: {
      index: -1,
      name: ''
    }
  });

  function handleFilters(filter) {
    handleOptionsVis();
    setFilters(filter);
  }

  return (
    <Box
      className="SearchRoot"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        maxWidth: '1600px',
        backgroundColor: 'white',
      }}
    >
      <Box className="Filters"
        sx={{
          width: '100%',
          height: '60px',
          background: 'rgba(0, 0, 0, .16)',
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
            marginRight: '.5rem',
          }}
        >
          options
        </Button>
      </Box>
      <Box
        className="options"
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: '60px',
          width: '100%',
          height: optionsVis ? '100%' : '0',
          display: optionsVis ? 'block' : 'none',
          maxHeight: '100vh',
          backgroundColor: 'white',
          transition: 'height 0.5s ease-in-out',
          overflow: 'clip',
        }}
      >
        <Options start={filter} save={handleFilters} />
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
                type={index%2 == 0 ? 'Product' : 'Service'}
                category={'Other'}
                src="https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000"
                title={e.title}
                description={cardDesc}
                price={e.price}
                rating={e.rating}
              />
            </Grid>
          );
        })}
      </Grid>
      {/* <Box sx={{
        backgroundImage: 'linear-gradient(rgba(255,0,0, 0), rgba(0,0,0, 1))',
        position: 'fixed',
        bottom: '0',
        height: '100px',
        width: '100%',
      }} /> */}
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
      name: index < 0 ? '' : array[index]
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
    "cheap to expensive",
    "expensive to cheap",
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

function resultsModify(array, category, sort){

}
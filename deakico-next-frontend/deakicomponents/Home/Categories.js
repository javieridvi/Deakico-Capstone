import { Box, Button, Grid, Typography } from "@mui/material";


export default function Categories() {

  const Category = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
    'Category 7',
    'Category 8',
  ]

  function CategoryButton(props) {
    const category = props.category;
    return (
      category.map((category) =>
        <Grid item key={category} xs={1} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
          <Button variant="text" href='/#'>{category}</Button>
        </Grid>
      )
    );

  }

  return (
    <Box component={'div'} 
    sx={{
      minHeight: '10rem',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}
    >
      <Typography component={'h3'} variant='h3' margin={'2rem'}>
        Categories
      </Typography>
      <Grid container spacing={2} columns={{xs:2, sm:4}} display={'flex'}>
        <CategoryButton category={Category} />
      </Grid>
    </Box>
  );
};
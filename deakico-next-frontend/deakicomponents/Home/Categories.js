import { Box, Button, Grid } from "@mui/material";


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
        <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
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
      alignContent: 'center',
      flexWrap: 'wrap'
    }}
    >
      <Grid container spacing={2} columns={4} display={'flex'}>
        <CategoryButton category={Category} />
      </Grid>
    </Box>
  );
};
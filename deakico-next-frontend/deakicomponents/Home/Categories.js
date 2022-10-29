import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/system";


let theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#EA498C',
    },
    secondary: {
      main: '#BCEFDD',
    },
  },
  typography: {
    fontFamily: 'Comfortaa',
  },
});

theme = responsiveFontSizes(theme);

export default function Categories( {categoryList }) {

  const Category = categoryList.slice();

  function CategoryButton(props) {
    const category = props.category;
    return (
      category.map((category) =>
        <Grid item key={category} xs={1} sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
          <Button variant="contained" href='/#'>{category}</Button>
        </Grid>
      )
    );

  }

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};
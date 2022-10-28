import { Box, createTheme, Link, responsiveFontSizes, ThemeProvider, Typography } from "@mui/material";
import Image from "next/image";


let theme = createTheme({
  typography: {
    fontFamily: 'Comfortaa',
  },
});

theme = responsiveFontSizes(theme);

export default function LogoName() {
  return (
    <ThemeProvider  theme={theme}>
      <Typography variant='h3'>

        <Box
          sx={{
            position: 'relative',
            height: '1em',
            width: '1em',
            display: { xs: 'block', sm: 'none' }
          }}
        >
          <Link href='/'>
            <Image
              src="/Deakico-Icon.svg"
              layout='fill'
            />
          </Link>
        </Box>
        <Box marginLeft={5}
          sx={{
            position: 'relative',
            height: '1em',
            width: '1em',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          <Image
            src="/Coqui.svg"
            layout='fill'
          />
        </Box>
      </Typography>
      <Box sx={{
        marginLeft: '.5em',
        display: { xs: 'none', sm: 'block' }
      }}
      >
        <Typography component='h1' variant="h3">
          <Link underline='none' color="black" href='/'>Deakico.</Link>
        </Typography>
      </Box>
    </ThemeProvider>
  )
}
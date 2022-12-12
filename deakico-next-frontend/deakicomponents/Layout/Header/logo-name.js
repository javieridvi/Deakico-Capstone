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
          <Link href='/' 
          sx={{
            position: 'relative',
            width: '32px',
            height: '32px',
            }}
            >
            <Image
              src="/Deakico-Icon.svg"
              width={32}
              height={32}
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
        <Typography component='h1' variant="h4">
          <Link underline='none' color="black" href='/'>Deakico.</Link>
        </Typography>
      </Box>
    </ThemeProvider>
  )
}
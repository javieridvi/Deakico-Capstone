import { useTheme } from '@emotion/react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, createTheme, responsiveFontSizes, ThemeProvider, Typography } from '@mui/material';
import Stars from './Rating';

//Default Card used to create variants
export function DefaultTest() {
  let rating = (<Stars width={'75px'} rating={3.5} />);
  let request = (
    <Button variant='outlined'
      sx={{
        height: '20px',
        minWidth: '60px',
        fontSize: '.625rem', // 14px
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '500',
      }}
    >
      Follow
    </Button>
  );
  let like = (
    <Typography variant={'caption'}
      sx={{
        width: '20px',
        height: '20px',
        margin: '0 0 0 7px',
        color: 'rgb(101, 101, 101)',
      }}
    >
      100
    </Typography>
  );
  //uses price, request and like
  let bottom = [
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Typography variant={'h6'} className={'Price'}
        sx={{
          fontSize: '1.125rem', // 18px
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {rating}
      </Typography>
    </Box>,
    <Box className={'Actions'}
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: '10px',
        height: '100%',
        width: '100%',
      }}
    >
      {request}
      {like}
    </Box>
  ];

  let components = {
    top: [infoRect('Type'), infoRect('Category')],
    image: 'https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000',
    title: 'Name Here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis dui euismod, cursus orci non, placerat nunc. Praesent id vestibulum odio, vitae venenatis mauris. Praesent id vestibulum odio, vitae venenatis mauris.',
    bottom: bottom,
  }
  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >

      <ProviderCard
        type={'Type'}
        category={'Category'}
        src={'/Test-Provider.png'}
        title={'Provider Card'}
        description={components.description}
        rating={4.5}
      />

      <ProductCard
        rating={4}
        category={'Category'}
        src={'https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000'}
        title={'Product Card'}
        description={components.description}
        price={'$29.99'}
      />
    </Box>
  )
}

/*
  <ProductCard
  type ={}
  category ={}
  src ={}
  title ={}
  description ={}
  rating ={}
  />
*/
export function ProviderCard(props) {
  const style = {
    height: '20px',
    minWidth: '60px',
    fontSize: '.625rem', // 14px
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '500',
  }
  let isfollowing = (
    <Button variant='contained'
      sx={style}
    >
      Following
    </Button>
  );

  let follow = (
    <Button variant='outlined'
      key={'follow'}
      sx={style}
    >
      Follow
    </Button>
  );
  // let follows = (
  //   <Typography variant={'caption'}
  //     key={'follows'}
  //     sx={{
  //       width: '20px',
  //       height: '20px',
  //       margin: '0 0 0 7px',
  //       color: 'rgb(101, 101, 101)',
  //     }}
  //   >
  //     {props.followers}
  //   </Typography>
  // );
  //uses rating, follow and follows
  let bottom = [
    <Box
      key={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Typography variant={'h6'} className={'Price'}
        sx={{
          fontSize: '1.125rem', // 18px
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <Stars width={'75px'} rating={props.rating} textColor={'rgb(101, 101, 101)'} />
      </Typography>
    </Box>,
    <Box className={'Actions'}
      key={1}
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: '10px',
        height: '100%',
        width: '100%',
      }}
    >
      {
      props.following ?
        isfollowing :
        follow
      }
    </Box>
  ];

  let components = {
    top: [infoRect(props.type, 0), infoRect(props.category, 1)],
    image: props.src,
    title: props.title,
    description: props.description,
    bottom: bottom,
  }
  return BaseCard(components);

}

/*
  <ProductCard
  rating ={}
  category ={}
  src ={}
  title ={}
  description ={}
  price ={}
  />
*/
export function ProductCard(props) {

  let request = (
    <Button variant='outlined'
      sx={{
        height: '20px',
        minWidth: '60px',
        fontSize: '.875rem', // 14px
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '500',
      }}
    >
      +
    </Button>
  );
  let like = (
    <Box
      sx={{
        display: 'flex',
        width: '20px',
        height: '20px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '0 0 0 7px',
      }}
    >
      <svg width="22" height="20" viewBox="-1 -2 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.6706 8.50513L9.0074 15L2.34419 8.50513C1.90469 8.08422 1.5585 7.5783 1.32743 7.01925C1.09635 6.46019 0.985392 5.8601 1.00154 5.25676C1.01769 4.65343 1.16059 4.05992 1.42125 3.51361C1.68191 2.9673 2.05468 2.48002 2.51609 2.08247C2.97749 1.68491 3.51754 1.38568 4.10222 1.20363C4.6869 1.02158 5.30355 0.960645 5.91333 1.02467C6.52312 1.08868 7.11283 1.27627 7.64533 1.57561C8.17783 1.87496 8.64159 2.27957 9.0074 2.76397C9.3748 2.28309 9.83909 1.88201 10.3712 1.58584C10.9034 1.28968 11.4919 1.1048 12.1 1.04278C12.708 0.980762 13.3226 1.04294 13.9051 1.22541C14.4876 1.40789 15.0256 1.70674 15.4854 2.10326C15.9452 2.49978 16.3169 2.98544 16.5772 3.52983C16.8375 4.07423 16.9808 4.66564 16.9982 5.26706C17.0156 5.86848 16.9067 6.46695 16.6782 7.02503C16.4498 7.58311 16.1068 8.08877 15.6706 8.51038" stroke="#939393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Box>
  );

  //uses price, request and like
  let bottom = [
    <Box
      key={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Typography variant={'h6'} className={'Price'}
        sx={{
          fontSize: '1.125rem', // 18px
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {props.price}
      </Typography>
    </Box>,
    <Box className={'Actions'}
      key={1}
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: '10px',
        height: '100%',
        width: '100%',
      }}
    >
      {request}
      {like}
    </Box>
  ];


  let components = {
    top: [<Stars key={0} width={'75px'} rating={props.rating} textColor={'rgb(225, 225, 225)'} />, infoRect(props.category, 1)],
    image: props.src,
    title: props.title,
    description: props.description,
    bottom: bottom,
  }
  return BaseCard(components);
}

function BaseCard(components) {

  return (
    <Card
      sx={{
        position: 'relative',
        width: 'clamp(10rem, 100%, 20rem)',
        maxHeight: 'clamp(10rem, 100%, 20rem)',
        transform: { xs: 'scale(0.9)', sm: 'scale(1)' }
      }}
    >
      <CardActionArea>
        <Box
          sx={{
            position: 'relative',
            // borderRadius: '1rem',
            overflow: 'clip',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '1.875rem', //30px at full size
              padding: '0 1rem',
              backgroundImage: 'linear-gradient(180deg, rgba(255,0,0, 0), rgba(0,0,0, 1))',
            }}
          >
            {components.top}
          </Box>
          <CardMedia
            component="img"
            src={components.image}
            alt="green iguana"
            sx={{
              height: '11.25rem', // 180px at full size
            }}
          />
        </Box>
      </CardActionArea>
      <Box
        className='Provider Info'
        sx={{
          height: '40.625%', //130px at full size
          padding: '0 1rem'
        }}
      >
        <Typography variant={'h6'} className={'Card-Title'}
          sx={{
            height: '1.25rem', // 20px
            overflow: 'clip',
            marginTop: '.625rem', //10px 
            fontWeight: '700',
            fontSize: '1.125rem', // 18px
            fontFamily: 'Comfortaa',
          }}
        >
          {components.title}
        </Typography>
        <Typography variant={'body2'} className={'Card-Description'}
          sx={{
            height: '3.75rem', // 60px
            fontSize: 'clamp(10.5px, 65%, 0.75rem)', // 12px
            marginTop: '.4375rem', //7px 
            color: 'text.secondary',
            overflow: 'clip',
            fontFamily: 'Comfortaa',
          }}
        >
          {components.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '2.5rem',
            marginTop: '.1875rem', //3px 
          }}
        >
          {components.bottom}
        </Box>
      </Box>
    </Card>
  );

}

function infoRect(text, key) {
  return (
    <Box className='Category'
      key={key}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid rgb(170, 170, 170)',
        borderRadius: '5px',
        width: 'auto',
        height: '1.25rem', // 20px
        padding: '0 .5rem', // 8px  
        fontFamily: 'Comfortaa',
      }}>
      <Typography variant={'caption'}
        sx={{
          fontSize: '.625rem', // 10px
          height: '.9375rem', //15px
          color: 'white',
          // color: 'rgb(101, 101, 101)',
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}







//Esto es solo para testing el card en las paginas luego se borrara 
export function ProviderTest() {
  return (
    <ProviderCard
      type={'Type'}
      category={'Category'}
      src={'https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000'}
      // src={'/Test-Provider.png'}
      title={'Provider Card'}
      description={'This is a test card used to show how the provider Card will ultimately end up looking. Everthing seen here is solely for testing purposes and does note replicate real production component fully.'}
      rating={4.5}
    />
  );
};

export function ProductTest() {
  return (
    <ProductCard
      rating={4}
      category={'Category'}
      // src={'/Test-Provider.png'}
      src={'https://img.freepik.com/free-psd/cosmetic-product-packaging-mockup_1150-40281.jpg?w=2000'}
      title={'Product Card'}
      description={'This is a test card used to show how the product Card will ultimately end up looking. Everthing seen here is solely for testing purposes and does note replicate real production component fully.'}
      price={'$29.99'}
    />
  );
};

export function ToggleCard(props) {
  const image = props.src;
  const title = props.label;
  const description = props.children;
  const alt = "Card of " + title;

  return (
    <Card sx={{ maxWidth: '20rem' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt={alt}
          sx={{
            maxHeight: '14rem',
            aspectRatio: '16/9'
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export function FeedCard(props) {
  const image = props.src;
  const title = props.label;
  const description = props.children;
  const alt = "Card of " + title;

  return (
    <Card sx={{ maxWidth: '20rem', backgroundColor: 'black' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt={alt}
          sx={{
            maxHeight: '14rem',
            aspectRatio: '16/9',
            color: 'whitesmoke'
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"
            sx={{
              color: 'whitesmoke',
            }}>
            {title}
          </Typography>
          <Typography variant="body2"
            sx={{
              color: 'whitesmoke',
            }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// set numbers to single letter notation 1000 = 1k
// function NuNotation(number) {
// If (number > 999){
// switch (number) {
//   case (number > 999999):
//   number = number%999  
//   return
//     break;

//   default:
//     break;
// }
// }
// return number
// }
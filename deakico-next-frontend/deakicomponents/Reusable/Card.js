import { Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import followsService from '../../services/follows.service';
import likesService from '../../services/likes.service';
import Stars from './Rating';
import { Router, useRouter } from 'next/router'

/*
  <ProviderCard
    id={e.id}
    title={e.companyname}
    description={e.desc}
    rating={e.rating}
    category={e.category}
    following={e.following}
    LogIn={handleLogInOpen} - Pop up in not logged in
    type={index % 2 == 0 ? 'Product' : 'Service'}
    src={URL}
  />
*/
export function ProviderCard(props) {
  const [following, setFollowing] = useState(props.following);
  const router = useRouter();
  // Styles
  const style = {
    height: '20px',
    minWidth: '60px',
    fontSize: '.625rem', // 14px
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '500',
  }

  // Functions


  function handleClick(following, title, id) {
    // When following undefined user is not logged in
    if (following == undefined) {
      console.log('not logged');
      // following = false;
      props.LogIn(title); // When not logged in throw log in pop up 
    } else {
      let request; // Request variable to be sent
      if (following) {
        // When following then unfollow
        request = followsService.deleteFollow; // Unfollow
      } else {
        // When not following then follow
        request = followsService.insertFollow; // Follow
      }

      // Send request
      // id = provider id
      request(id).then((res) => {
        // Response doesn't need to be returned
        setFollowing(state => !state); // Set following to oposite state
      }).catch((err) => {
        if (err.response.status == 403) {
          // User tryed to follow their own PA account
          // Modal cant follow yourself
          console.log('Think we wouldn\'t notice you trying to follow yourself?');
        } else if (err.response.status == 401) {
          // Failed authentication
          console.log('Reauthenticate');
          props.LogIn(title); // Prompt to reauthenticate
        } else {
          console.log(err); // Log error
        }
      })

    }

  }

  let Area = (
    <CardActionArea
      onClick={() =>
        router.push('/profile/' + props.id)
      }
    >
      <ActionArea
        top={[infoRect(props.type, 0), infoRect(props.category, 1)]}
        image={props.src}
      />
    </CardActionArea>
  )

  // Components
  let isfollowing = (
    <Button variant='contained'
      onClick={() => handleClick(following, props.title, props.id)}
      sx={style}
    >
      Following
    </Button>
  );

  let follow = (
    <Button variant='outlined'
      onClick={() => handleClick(following, props.title, props.id)}
      sx={style}
    >
      Follow
    </Button>
  );

  //uses rating, follow
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
        following ?
          isfollowing :
          follow
      }
    </Box>
  ];

  return <BaseCard
    area={Area}
    title={props.title}
    description={props.description}
    bottom={bottom}
  />;;

}

/*
  <ProductCard
    id={e.id}
    title={e.name}
    description={e.desc}
    price={e.price}
    category={e.category}
    rating={e.rating}
    provider={e.pa_id}
    liked={e.liked}
    LogIn={handleLogInOpen}
  />
*/
export function ProductCard(props) {
  const [liked, setLiked] = useState(props.liked);

  // Like button function **
  function handleLikeClick(liked, title, id) {
    // When following undefined user is not logged in
    if (liked == undefined) {
      console.log('not logged');
      // following = false;
      props.LogIn('like'); // When not logged in throw log in pop up 
    } else {
      let request; // Request variable to be sent
      if (liked) {
        // When following then unfollow
        request = likesService.deleteLike; // Unlike
      } else {
        // When not following then follow
        request = likesService.insertLike; // Like
      }

      // Send request
      // id = item id
      console.log(id);
      request(id).then((res) => {
        // Response doesn't need to be returned
        setLiked(state => !state); // Set following to oposite state
      }).catch((err) => {
        if (err.response.status == 403) {
          // User tryed to like their own item
          // Modal cant like your items
          console.log('Think we wouldn\'t notice you trying to like your items?');
        } else if (err.response.status == 401) {
          // Failed authentication
          console.log('Reauthenticate');
          props.LogIn(title); // Prompt to reauthenticate
        } else {
          console.log(err); // Log error
        }
      })

    }

  }
  // ** Like button function

  // Request button function **
  function handleRequestClick(id, name, price) {
    if (props.request) {
      const item = {
        id: id,
        name: name,
        price: price,
      }
      props.request(item);
    }
  }
  // ** Request button function

  let request = (
    <Button variant='outlined'
      onClick={() => handleRequestClick(props.id, props.title, props.price)}
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
      onClick={() => handleLikeClick(liked, 'product', props.id)}
      sx={{
        display: 'flex',
        width: '25px',
        height: '25px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '0 0 -2px 7px',
        padding: '2px',
        borderRadius: '50%',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.2)',
          backgroundColor: liked ? '' : 'rgba(255, 0, 80, 0.16)'
        }
      }}
    >
      <svg width="22" height="20" viewBox="-1 -2 20 20" fill={liked ? "red" : "none"} xmlns="http://www.w3.org/2000/svg">
        <path stroke="red" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.6706 8.50513L9.0074 15L2.34419 8.50513C1.90469 8.08422 1.5585 7.5783 1.32743 7.01925C1.09635 6.46019 0.985392 5.8601 1.00154 5.25676C1.01769 4.65343 1.16059 4.05992 1.42125 3.51361C1.68191 2.9673 2.05468 2.48002 2.51609 2.08247C2.97749 1.68491 3.51754 1.38568 4.10222 1.20363C4.6869 1.02158 5.30355 0.960645 5.91333 1.02467C6.52312 1.08868 7.11283 1.27627 7.64533 1.57561C8.17783 1.87496 8.64159 2.27957 9.0074 2.76397C9.3748 2.28309 9.83909 1.88201 10.3712 1.58584C10.9034 1.28968 11.4919 1.1048 12.1 1.04278C12.708 0.980762 13.3226 1.04294 13.9051 1.22541C14.4876 1.40789 15.0256 1.70674 15.4854 2.10326C15.9452 2.49978 16.3169 2.98544 16.5772 3.52983C16.8375 4.07423 16.9808 4.66564 16.9982 5.26706C17.0156 5.86848 16.9067 6.46695 16.6782 7.02503C16.4498 7.58311 16.1068 8.08877 15.6706 8.51038" />
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

  let Area = (
    <ActionArea
      top={[
        <Stars width={'75px'} rating={props.rating} key={0} />
        , infoRect(props.category, 1)
      ]}
      image={props.src}
    />
  )

  return <BaseCard
    area={Area}
    title={props.title}
    description={props.description}
    bottom={bottom}
  />;
}

///View of Provider Products Card 
export function ProviderCardproducts(props){
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
    setTimeout(() =>  5000);
  };
  const handleMouseOut = () => {
   setIsHovering(false);
  };
  
  function handleDelete(){
    console.log("yup delete this");
  }

return (
   <Card sx={{m: '2rem', backgroundColor:'#e5e5e5', width:'20rem'}} >

    <Box onMouseOver={handleMouseOver}  >
   
     {isHovering && (
     <Button variant="text" sx={{
   display:'flex', ml:'80%', }}
    onClick= {handleDelete}> X </Button>
 )}  
  <CardMedia onMouseOut={handleMouseOut}
  component="img"
  image = {props.image}
  sx={{
    maxHeight:'14rem',
    aspectRatio:'16/9',
    color: 'whitesmoke' ,

  }}
    /> </Box>
  <Typography variant={'h6'} className={'Card-Title'}
          sx={{
            height: '1.25rem', // 20px
            overflow: 'clip',
            marginTop: '.625rem', //10px 
            fontWeight: '700',
            fontSize: '1.125rem', // 18px
            fontFamily: 'Comfortaa',
            ml:'1rem'
          }}
        >
          {props.title}
  
    </Typography>

    <Typography variant={'body2'} className={'Card-Description'}
          sx={{
            height: '3.75rem', // 60px
            fontSize: 'clamp(10.5px, 65%, 0.75rem)', // 12px
            marginTop: '.4375rem', //7px 
            color: 'black',
            overflow: 'clip',
            fontFamily: 'Comfortaa',
            ml: "1rem"
          }}
        >
          {props.description}
        </Typography>
        <Typography variant={'h6'} className={'Price'}
        sx={{
          fontSize: '1.125rem', // 18px
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
          display:'flex' ,
          justifyContent:'flex-end' ,
          mr:'1.5rem',
          mb:'1rem'
        }}
      >
        {props.price}
      </Typography>


  </Card>
);
}

function BaseCard(props) {

  return (
    <Card
      sx={{
        position: 'relative',
        width: 'clamp(10rem, 100%, 20rem)',
        maxHeight: 'clamp(10rem, 100%, 20rem)',
        transform: { xs: 'scale(0.9)', sm: 'scale(1)' }
      }}
    >
      {props.area}
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
          {props.title}
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
          {props.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '2.5rem',
            marginTop: '.1875rem', //3px 
          }}
        >
          {props.bottom}
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

function ActionArea(props) {
  return (
    <Box className='ActionArea'
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
        {props.top}
      </Box>
      <CardMedia
        component="img"
        src={props.image}
        alt="green iguana"
        sx={{
          height: '11.25rem', // 180px at full size
        }}
      />
    </Box>
  )
}





//Esto es solo para testing el card en las paginas luego se borrara 
export function ProviderTest() {
  return (
    <ProviderCard
      id={0}
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
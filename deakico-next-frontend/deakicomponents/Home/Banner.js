import { Box, Button, Collapse, IconButton, Stack } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from 'react';
//Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TripOriginIcon from '@mui/icons-material/TripOrigin';

//Example array would be replaced with backend response
const bannerImages = [
  'https://image.shutterstock.com/image-photo/detailed-clouds-overhead-small-boat-600w-2172633529.jpg',
  'https://image.shutterstock.com/image-photo/great-lakes-aerial-turquoise-ocean-600w-2109041426.jpg',
  'https://image.shutterstock.com/image-photo/ocean-landscape-sea-rocks-foreground-600w-2124161561.jpg',
  'https://image.shutterstock.com/image-photo/spinning-super-typhoon-hagibis-aerial-600w-2102142643.jpg',
  'https://image.shutterstock.com/image-photo/smartphone-yellow-background-business-600w-2137290125.jpg',
  'https://image.shutterstock.com/image-photo/bangkok-thailand-may-16-2017-600w-654422887.jpg',
]
export default function Banner() {

  //Saves the amount of images recieved
  const listLength = bannerImages.length;
  
  //Return empty div if no images are posted
  if (listLength==0) {
    return <div className="noImages"></div>
  }

  //Image handling functions and variables

  //Image change duration
  const duration = 2000;

  //Array of images the are being displayed
  const [imageArr, setImageArr] = useState(
    [
      { index: bannerImages.length - 1, image: bannerImages[bannerImages.length - 1] },
      { index: 0, image: bannerImages[0] },
      { index: 1, image: bannerImages[1] }
    ]
  )


  //Returns an image component based on given image
  function BannerImage(image) {
    return (
      <Box
        component='img'
        src={image}
        sx={{
          position: 'relative',
          minWidth: '50rem',
          aspectRatio: '16/9',
        }}
      />
    )
  }

  //Banner Rotation
  //Stops the auto rotate when this state is false (When Prev() and Next() are called) 
  const [isIntervalRunning, setIsIntervalRunning] = useState(true);
  const intervalDuration = 10; //wait between rotation in seconds
  useEffect(() => {
    if(isIntervalRunning){
      const interval = setInterval(()=>{
        Next(); 
      }, intervalDuration*1000);
      return () => {clearInterval(interval)};
    }
  }, [isIntervalRunning]);
  
  //When imageArr state changes sets interval to true
  useEffect(() => {
    setIsIntervalRunning(() => true);
  }, [imageArr]);

  //Moves to next picture on bannerImages array
  function Next() {
    setIsIntervalRunning(() => false); //Stops interval

    setImageArr((current) => {
      const prevIndex = current[0];
      const nextIndex = (current[current.length - 1].index + 1) % listLength;
      return [...current.filter((image) => image != prevIndex), { index: nextIndex, image: bannerImages[nextIndex] }]
    });
  }
  
  //Moves to previous picture on bannerImages array
  function Prev() {
    setIsIntervalRunning(() => false); //Stops interval

    setImageArr((current) => {
      const lastIndex = current.length - 1;
      const prevIndex = (current[0].index + listLength - 1) % listLength;
      let arr = [{ index: prevIndex, image: bannerImages[prevIndex] }, ...current.filter((image, index) => index != lastIndex)];
      return arr;
    })
  }

  
  //Button creation
  function SideButton(props) {
    return (
      <Button
        variant='text'
        onClick={props.onClick}
        sx={{
          maxHeight: '100%',
          maxWidth: '100%',
          width: 'fit-content',
        }}
      >
        {props.children}
      </Button>
    )
  }

  //Bottom nav buttons
  const theme = useTheme();
  function NavButtons(props) {
    return (
      <Box
        sx={{
          position: 'absolute',
          display: { xs: 'none', sm: 'block' },
          bottom: 0,
          maxWidth: '100%',
          maxHeight: '10%',
          borderRadius: '50vh',
          backgroundColor: 'rgba(255,255,255,.8)',
        }}
      >
        {props.list.map((el, i) =>
          <IconButton
            key={i}
            size='small'
            onClick={(e) => navButtonClick(e, i)}
            sx={{
              color: i === imageArr[1].index ? theme.palette.primary.main : 'inherit', 
              '&:hover > .MuiSvgIcon-root': {
                color: theme.palette.primary.main,
              }
            }}
          >
            <TripOriginIcon />
          </IconButton>
        )}
      </Box>
    )
  }

  function navButtonClick(e, index) {
    let currentIndex = imageArr[1].index;

    if (index != currentIndex) { //If the current index is the same of the button index do nothing

      const distance = Math.abs(index - currentIndex);
      //true = next : false = prev
      let direction = currentIndex < index ? true : false;
      direction = distance < (listLength / 2) ? direction : !direction;

      if (!direction) {
        while (index != currentIndex) {
          Prev();
          currentIndex = (currentIndex - 1 + listLength) % listLength;
        }
      } else {
        while (index != currentIndex) {
          Next();
          currentIndex = (currentIndex + 1) % listLength;
        }
      }
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '16/9',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >

      <TransitionGroup
        component={Box}
        sx={{
          position: 'absolute',
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {imageArr.map((element, i) =>
          <Collapse key={element.index} orientation='horizontal' timeout={duration} unmountOnExit
            sx={{
              maxHeight: '100%',
              minWidth: '100vw',
              display: 'block',
            }}>
            {BannerImage(element.image)}
          </Collapse>
        )}
      </TransitionGroup>

      <Stack direction='row' justifyContent='space-between'
        sx={{
          position: 'absolute',
          height: '100%',
          minWidth: '100%',
        }}
      >
        <SideButton onClick={Prev} >
          <ChevronLeftIcon />
        </SideButton>
        <Button variant='text' onClick={Next}>
          <ChevronRightIcon />
        </Button>
      </Stack>
      <NavButtons list={bannerImages} length={listLength} />
    </Box>
  );
};



import { Box, Button, ButtonBase, Collapse, IconButton, Stack } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from 'react';
//Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';

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
  if (listLength == 0) {
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
          height: '100%',
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
    if (isIntervalRunning) {
      const interval = setInterval(() => {
        Next();
      }, intervalDuration * 1000);
      return () => { clearInterval(interval) };
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
  let NavButtons = (
    <Box
      className="NavButtons">
      {bannerImages.map((el, i) =>
        <ButtonBase
          key={i}
          onClick={(e) => navButtonClick(e, i)}
          sx={[
            {
              height: '1.25rem',
              aspectRatio: '1/1',
              margin: '1rem',
              borderRadius: '50%',
              transition: 'all .5s ease-in-out',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                scale: '1.25',
                transition: 'all .1s ease-in-out',
              }
            },
            i == imageArr[1].index ? {
              backgroundColor: theme.palette.primary.main,
              scale: '1.25',
            } : {
              backgroundColor: 'rgba(0, 0, 0, .2)',
            }
          ]}
        >
        </ButtonBase>
      )}
    </Box>
  );

  function navButtonClick(e, index) {
    let currentIndex = imageArr[1].index;

    if (index != currentIndex) { //If the current index is the same of the button index do nothing

      const distance = Math.abs(index - currentIndex);
      //true = next , false = prev
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
      className="Banner"
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      
       <Box
        className="Banner-Images"
        sx={{
          width: '100%',
          aspectRatio: '16/9',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        
      >
       {BannerImage("../../DeakicoBannerImage.png")}
        {/* <TransitionGroup
          component={Box}
          className={'Transition-Group'}
          sx={{
            minHeight: '100%',
            minWidth: '300%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {imageArr.map((element, i) =>
            <Collapse key={element.index} orientation='horizontal' timeout={duration} unmountOnExit
              sx={{
                height: '100%',
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
        </Stack> */}
      </Box>
       {/* {NavButtons}  */}
    </Box>
  );
};



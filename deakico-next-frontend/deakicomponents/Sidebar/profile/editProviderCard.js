import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, ButtonBase, Card, CardMedia, Collapse, IconButton, InputBase, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Stars from '../../Reusable/Rating';
import itemService from "../../../services/item.service";
import { useRouter } from 'next/router'
import providerService from '../../../services/provider.service';
import userService from '../../../services/user.service';

/*

//...


*/
export default function EditProviderCard(props) {
  const open = props.open;
  const setOpen = props.setOpen;
  const [alert, setAlert] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const imageupload = useRef();
  const router = useRouter()
  const [provider, setProvider] = useState(null)

  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    getProvider()
  }, [])

  function getProvider() {
    providerService.getProvider().then((res) => {
      console.log(res.data);
      setProvider(res.data)
      setImage(res.data.pa_image)
      setDescription(res.data.pa_desc)
    userService.getUser().then((res)=>console.log(res.data))
    });

    /*
    disabled
    pa_category
    pa_companyname
    pa_desc
    pa_id
    pa_rating
    pa_type
    */
  }

  async function handleUploadInput(event) {
    const file = event.target.files[0]
    console.log(file)
    if (!file.type.match(/image.*/)) return null;

    const image = new Image();
    image.src = URL.createObjectURL(file);

    await new Promise((res) => image.onload = res);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: true });

    canvas.width = 320;
    canvas.height = 180;

    // if (image.height <= image.width) {
    const scaleProportions = canvas.height / image.height;
    const scaledWidth = scaleProportions * image.width;
    context.drawImage(image, (canvas.width - scaledWidth) / 2, 0, scaledWidth, canvas.height);
    // }
    // else {
    //     const scaleProportions = canvas.width / image.width;
    //     const scaledHeight = scaleProportions * image.height;
    //     context.drawImage(image, 0, (canvas.height - scaledHeight)/2, canvas.width, scaledHeight);
    // }
    setImage(canvas.toDataURL());
    setImageFile(await new Promise((res) => canvas.toBlob(res)));
  }

  function saveItem(event) {
    event.preventDefault()

    const data = Array.from((new FormData(event.target)).entries()).reduce((map = {}, [key, value]) => {
      return {
        ...map,
        [key]: map[key] ? [...map[key], value] : value,
      };
    }, {})
    let filled = true;

    if ( data.i_description == '' || image == null) {
        setAlert(true);
        filled = false;
    }
    if (imageFile != null) {
      providerService.getProviderImageUploadUrl().then((res) => {
        console.log(res.data);
        itemService.putUploadItemImage(res.data, imageFile).then(() => {
          data.i_image = res.data.split('?')[0];
          itemService.insertItem(data).then(() => reload()).then(() => setOpen(false))
        })
      })
    } else {
      providerService.updateProvider(data).then((res)=>console.log(res.data))
    }
  }
  function reload() {
    router.reload(window.location.pathname)
  }

  function localStringToNumber(s) {
    return Number(String(s).replace(/[^0-9.-]+/g, ""))
  }

  function onFocus(e) {
    var value = e.target.value;
    value = value ? localStringToNumber(value) : ''
    setPrice(value)
  }

  function onBlur(e) {

    var value = e.target.value;

    var options = {
      maximumFractionDigits: 2,
      currency: 'USD',
      style: "currency",
      currencyDisplay: "symbol"
    }

    value = (value || value === 0)
      ? localStringToNumber(value).toLocaleString(undefined, options)
      : ''
    setPrice(value)
  }

  return (
    <Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          component={"form"}
          onSubmit={(e) => saveItem(e)}
        >
          <Card
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(10rem, 100%, 20rem)',
              maxHeight: 'clamp(10rem, 100%, 20rem)',
              // transform: { xs: 'scale(0.9)', sm: 'scale(1)' }
            }}
          >
            <Box className='ActionArea'
              sx={{
                position: 'relative',
                // borderRadius: '1rem',
                overflow: 'clip',
              }}
            >

              {/* 
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


    
    */}
{/* 
              <ButtonBase
                onClick={() => imageupload.current.click()}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgb(0, 0, 0)',
                  opacity: 0,
                  transition: 'opacity 300ms ease-in-out',
                  '&:hover': {
                    opacity: 0.4
                  }
                }}>
                <AddPhotoAlternateIcon />
                <input
                  ref={imageupload}
                  hidden
                  accept="image/*"
                  onChange={handleUploadInput}
                  id='image'
                  name='pa_image'
                  type="file"
                  label='Image'
                  margin='none'
                />
              </ButtonBase> */}
              <CardMedia
                component="img"
                src={image}
                alt=""
                sx={{
                  height: '11.25rem', // 180px at full size
                }}
              />
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
                <Box className='Type'
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
                    {provider?.pa_type}
                  </Typography>
                </Box>

                <Box className='Category'
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
                    {provider?.pa_category}
                  </Typography>
                </Box>
              </Box>
            </Box>
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
                {provider?.pa_companyname}
              </Typography>
              <InputBase className={'Card-Description'}
                sx={{
                  width: '100%',
                  height: '3.75rem', // 60px
                  fontSize: 'clamp(10.5px, 65%, 0.75rem)', // 12px
                  marginTop: '.4375rem', //7px 
                  color: 'text.secondary',
                  overflow: 'clip',
                  fontFamily: 'Comfortaa',
                }}
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id='description'
                name='pa_desc'
                type='text'
                label='Description'
                margin='dense'
                placeholder="Write description"
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '2.5rem',
                  marginTop: '.1875rem', //3px 
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <Stars width={'75px'} rating={provider?.rating} />
                </Box>
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
                  <Button variant='contained'
                    sx={{
                      height: '20px',
                      minWidth: '60px',
                      fontSize: '.625rem', // 14px
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '500',
                    }}
                  >
                    Following
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>
          <Button
            variant="contained"
            type="submit"
            sx={{
              position: 'absolute',
              top: 'calc(50% + 210px)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            SAVE</Button>
          <Box sx={{ width: '100%', position: 'absolute', top: '60px' }} className="Alert">
            <Collapse in={alert}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Looks like you missed something
              </Alert>
            </Collapse>
          </Box>
        </Box>
      </Modal>

    </Box>
  )
}

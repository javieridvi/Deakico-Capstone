import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, ButtonBase, Card, CardMedia, Collapse, IconButton, InputBase, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Stars from '../../../Reusable/Rating';
import itemService from "../../../../services/item.service";
import { useRouter } from 'next/router'

/*

//...


*/
export default function AddProduct(props) {
  const open = props.open;
  const setOpen = props.setOpen;
  const [alert, setAlert] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const imageupload = useRef();
  const router = useRouter()

  const item = props.item;
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (item != '') {
      setEdit(true)
      setImage(item.image);
      setPrice(item.price);
      setCategory(item.category);
      setName(item.name);
      setDescription(item.description);
    }
  }, [])

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

    if (data.i_category == '' || data.i_name == '' || data.i_description == '' || data.i_price == '') {
      if (imageFile == null && !edit) {
        setAlert(true);
        filled = false;
      }
    }
    console.log('saving changes')
    console.log('are you editing? '+edit)
    if (filled && !edit) {
      itemService.getItemImageUploadUrl().then((res) => {
        console.log(res.data);
        itemService.putUploadItemImage(res.data, imageFile).then(() => {
          data.i_image = res.data.split('?')[0];
          itemService.insertItem(data).then(() => reload()).then(() => setOpen(false))
        })
      })
    } else if (edit && imageFile != null) {
      itemService.getItemImageUploadUrl().then((res) => {
        console.log(res.data);
        itemService.putUploadItemImage(res.data, imageFile).then(() => {
          data.i_image = res.data.split('?')[0];
          itemService.updateItem(item.id, data).then(() => reload()).then(() => setOpen(false))
        })
      })
    } else if (edit) {
      data.i_image = item.image;
      itemService.updateItem(item.id, data).then(() => reload()).then(() => setOpen(false))
    }
  }
  function reload(){
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
                  name='i_image'
                  type="file"
                  label='Image'
                  margin='none'
                />
                {/* Photo Here */}
              </ButtonBase>
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
                <Stars width={'75px'} rating={5} />
                <Box className='Category'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgb(170, 170, 170)',
                    borderRadius: '5px',
                    minWidth: 'auto',
                    minHeight: '1.25rem', // 20px
                    padding: '0 .5rem', // 8px  
                    fontFamily: 'Comfortaa',
                  }}>
                  <InputBase
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{
                      fontSize: '.625rem', // 10px
                      height: '.9375rem', //15px
                      color: 'white',
                      // color: 'rgb(101, 101, 101)',
                    }}
                    id='category'
                    name='i_category'
                    type='text'
                    label='Category'
                    margin='dense'
                    placeholder="category"
                  />
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
              <InputBase className={'Card-Title'}
                sx={{
                  height: '1.25rem', // 20px
                  overflow: 'clip',
                  marginTop: '.625rem', //10px 
                  fontWeight: '700',
                  fontSize: '1.125rem', // 18px
                  fontFamily: 'Comfortaa',
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='title'
                name='i_name'
                type='text'
                label='Name'
                margin='dense'
                placeholder="Name Here"
              />
              <InputBase className={'Card-Description'}
                sx={{
                  height: '3.75rem', // 60px
                  fontSize: 'clamp(10.5px, 65%, 0.75rem)', // 12px
                  marginTop: '.4375rem', //7px 
                  color: 'text.secondary',
                  overflow: 'clip',
                  fontFamily: 'Comfortaa',
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id='description'
                name='i_description'
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
                  key={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <InputBase className={'Price'}
                    value={price}
                    onBlur={(e) => onBlur(e)}
                    onChange={(e) => onFocus(e)}
                    sx={{
                      fontSize: '1.125rem', // 18px
                      fontWeight: '700',
                      fontFamily: 'Roboto, sans-serif',
                    }}
                    id='price'
                    name='i_price'
                    type='currency'
                    label='Price'
                    margin='dense'
                    placeholder="Enter price"
                  />
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
                  <Box
                    // onClick={() => handleLikeClick(liked, 'product', props.id)}
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
                        backgroundColor: 'rgba(255, 0, 80, 0.16)'
                      }
                    }}
                  >
                    <svg width="22" height="20" viewBox="-1 -2 20 20" fill={"none"} xmlns="http://www.w3.org/2000/svg">
                      <path stroke="red" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.6706 8.50513L9.0074 15L2.34419 8.50513C1.90469 8.08422 1.5585 7.5783 1.32743 7.01925C1.09635 6.46019 0.985392 5.8601 1.00154 5.25676C1.01769 4.65343 1.16059 4.05992 1.42125 3.51361C1.68191 2.9673 2.05468 2.48002 2.51609 2.08247C2.97749 1.68491 3.51754 1.38568 4.10222 1.20363C4.6869 1.02158 5.30355 0.960645 5.91333 1.02467C6.52312 1.08868 7.11283 1.27627 7.64533 1.57561C8.17783 1.87496 8.64159 2.27957 9.0074 2.76397C9.3748 2.28309 9.83909 1.88201 10.3712 1.58584C10.9034 1.28968 11.4919 1.1048 12.1 1.04278C12.708 0.980762 13.3226 1.04294 13.9051 1.22541C14.4876 1.40789 15.0256 1.70674 15.4854 2.10326C15.9452 2.49978 16.3169 2.98544 16.5772 3.52983C16.8375 4.07423 16.9808 4.66564 16.9982 5.26706C17.0156 5.86848 16.9067 6.46695 16.6782 7.02503C16.4498 7.58311 16.1068 8.08877 15.6706 8.51038" />
                    </svg>
                  </Box>
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

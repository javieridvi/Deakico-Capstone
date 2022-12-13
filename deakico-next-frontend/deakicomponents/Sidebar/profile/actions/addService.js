import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, ButtonBase, CardMedia, Collapse, IconButton, InputBase, Modal, Typography } from "@mui/material";
import { useRef, useState } from "react";
import Stars from '../../../Reusable/Rating';
import itemService from "../../../../services/item.service";


export default function AddService(props) {
  const open = props.open;
  const setOpen = props.setOpen;
  const [alert, setAlert] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const imageupload = useRef();

  const item = props.item;
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [timeslot, setTimeslot] = useState('');

  useEffect(() => {
    if (item != '') {
      setEdit(true)
      setImage(item.image);
      setPrice(item.price);
      setCategory(item.category);
      setName(item.name);
      setDescription(item.description);
      setTimeslot(item.timeslot);
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
    canvas.width = 468;
    canvas.height = 208;
    const scaleProportions = canvas.height / image.height;
    const scaledWidth = scaleProportions * image.width;
    context.drawImage(image, (canvas.width - scaledWidth) / 2, 0, scaledWidth, canvas.height);
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

    if (data.i_category == '' || data.i_name == '' || data.i_description == '' || data.i_price == '' || data.s_timeslot == '') {
      if (imageFile == null && !edit) {
        setAlert(true);
        filled = false;
      }
    }

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
          <Accordion
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '500px',
            }}
            expanded={true}
          >
            <AccordionSummary
              sx={{
                '& > *': {
                  display: 'flex',
                  alignItems: 'center',
                }
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <InputBase className={'Service-Name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='name'
                name='i_name'
                type='text'
                label='Name'
                margin='dense'
                placeholder="Name Here"
              />
              <InputBase
                sx={{
                  color: 'text.secondary',
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id='category'
                name='i_category'
                type='text'
                label='Category'
                margin='dense'
                placeholder="category"
              />
            </AccordionSummary>
            <AccordionDetails>
              <Box className='Image-Upload'
                sx={{ position: 'relative', aspectRatio: '9/4', width: '100%', }}
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
                <CardMedia component='img' sx={{ aspectRatio: '9/4' }} src={image} />
              </Box>
              <InputBase className={'Card-Description'}
                multiline
                startAdornment={<Typography marginRight={"1rem"}> Description: </Typography>}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id='description'
                name='i_description'
                type='text'
                label='Description'
                margin='dense'
                placeholder="Write description"
              />
              <InputBase className={'Price'}
                startAdornment={<Typography marginRight={"1rem"}>  Price: </Typography>}
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
              <InputBase className={'Timeslot'}
                sx={{
                  fontSize: '1.125rem', // 18px
                  fontWeight: '700',
                  fontFamily: 'Roboto, sans-serif',
                  '& > input[type=number]': {
                    '-moz-appearance': 'textfield'
                  },
                  '& > input[type=number]::-webkit-outer-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0
                  },
                  '& > input[type=number]::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0
                  }
                }}
                value={timeslot}
                onChange={(e) => setTimeslot(e.target.value)}
                startAdornment={<Typography marginRight={"1rem"}>  Time:  </Typography>}
                id='timeslot'
                name='s_timeslot'
                type='number'
                label='Timeslot'
                margin='dense'
                placeholder="Enter time in minutes"
              />
              <Stars width={'75px'} rating={5} />
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
            </AccordionDetails>
          </Accordion>
          <Button
            variant="contained"
            type="submit"
            sx={{
              position: 'absolute',
              top: 'calc(50% + 250px)',
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

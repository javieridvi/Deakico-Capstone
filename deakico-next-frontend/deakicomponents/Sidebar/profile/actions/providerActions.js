import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop } from '@mui/material';
import EditItem from './editItem';
import DeleteItem from './deleteItem';
import AddProduct from './addProduct';
import AddService from './addService';
import { useState } from 'react';
import Deletebutton from './Deletebutton';

const actions = [
  { icon: <MoreTimeIcon />, name: 'Add Service', click: 'service' },
  { icon: <AddBusinessIcon />, name: 'Add Product', click: 'product' },
  { icon: <DeleteIcon />, name: 'Delete Item', click: 'delete' },
  { icon: <EditIcon />, name: 'Edit Item', click: 'edit' },
];

export default function ProviderActions(props) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteButton, setOpenDeleteButton] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openService, setOpenService] = useState(false);

  const [product, setProduct] = useState('')
  const [service, setService] = useState('')
  const [item2Delete, setItem2Delete] = useState('')

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function itemEdit(item) {
    if (item.type == 'product') {
      setProduct(item);
      setOpenProduct(true);
      setOpenEdit(false);
    } else {
      setService(item);
      setOpenService(true);
      setOpenEdit(false);
    }
  }

  function deleteItem(item) {
    setItem2Delete(item);
    setOpenDeleteButton(true);
  }

  function handleSpeedClick(action) {
    console.log(action)
    switch (action) {
      case 'service':
        setOpenService(true)
        break;
      case 'product':
        setOpenProduct(true)
        break;
      case 'delete':
        setOpenDelete(true)
        break;
      case 'edit':
        setOpenEdit(true)
        break;
      default:
        break;
    }
  }

  return (
    <Box
      className='Speed Dial Container'
      sx={{
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          right: { xs: 0, lg: 'calc(50% - 700px)' },
          bottom: 0,
          margin: '1rem',
        }}
      >
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<ClearIcon />} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleSpeedClick(action.click)}
            />
          ))}
        </SpeedDial>
      </Box>
      {openEdit ?
        <EditItem
          open={openEdit}
          setOpen={setOpenEdit}
          list={props.list}
          edit={itemEdit}
        /> :
        null
      }
      {openDelete ?
        <DeleteItem
          open={openDelete}
          setOpen={setOpenDelete}
          list={props.list}
          delete={deleteItem}
        /> :
        null
      }
      {openProduct ?
        <AddProduct
          open={openProduct}
          setOpen={setOpenProduct}
          item={product}
        /> :
        null
      }
      {openService ?
        <AddService
          open={openService}
          setOpen={setOpenService}
          item={service}
        /> :
        null
      }
      {openDeleteButton ?
        <Deletebutton
          open={openDeleteButton}
          setOpen={setOpenDeleteButton}
          item={item2Delete}
        /> :
        null
      }

    </Box>
  )
}

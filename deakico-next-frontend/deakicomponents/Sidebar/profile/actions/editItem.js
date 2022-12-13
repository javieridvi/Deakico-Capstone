import { Box, IconButton, List, ListItem, ListItemText, Modal } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


export default function EditItem(props) {
  const open = props.open;
  const setOpen = props.setOpen;
  const list =  props.list
  const edit = props.edit;

  return (
    <Box>
      <Modal
        open={true}
        onClose={() => setOpen(false)}
      >
        <List
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          width: 'clamp(300px, 100%, 800px)',
          borderRadius: '1rem',
          padding: '1rem',
        }}
        >
          {list.map((item) => {
            return (
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => edit(item)} >
                  <EditIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.name}
                secondary={item.type}
              />
            </ListItem>
          )})}
        </List>
      </Modal>
    </Box>
  )
}

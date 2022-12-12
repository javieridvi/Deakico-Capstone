import {React,useState} from 'react'
import { Box, Button, Container,  Rating, Stack,  Typography, CardMedia ,Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Services(props) {

    const [expanded, setExpanded] = useState('"panel1"');
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    //handlerequest for service
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
  let request = (
    <Button variant='outlined'
      onClick={() => handleRequestClick(props.id, props.name, props.price)}
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
  return (
    <div>
         <Stack >
<Accordion expanded={expanded === props.id } onChange={handleChange(props.id)}   TransitionProps={{ unmountOnExit: true }} >
<AccordionSummary  expandIcon={<ExpandMoreIcon />} >
<Typography  sx={{ width: '33%', flexShrink: 0 , mb:'1rem'}}> {props.name} </Typography>
<Typography sx={{ color: 'text.secondary' }}>{props.category}</Typography>
</AccordionSummary>
<AccordionDetails>
<CardMedia component='img'  sx={{aspectRatio:'9/4'}} src={props.image ? props.image : '/product-placeholder.png'}  />
<Typography sx={{mt:'15px'}}> Description:  {props.description} </Typography>
<Typography sx={{mt:'10px'}}>  Price: {props.price} </Typography>
<Typography sx={{mt:'10px'}}>  Time: {props.timeslot} minutes </Typography>
{/* <Button sx={{display:'flex' , textAlign:'center', height:'1.5rem', mt:'10px'}}>Request</Button>  */}
{request}
</AccordionDetails>
</Accordion>
</Stack> 
    </div>
  )
}

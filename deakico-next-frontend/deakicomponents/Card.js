import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

export default function Provider(props) {
  // Serian las llamadas al backend (se anaderia mas si necesario ej. Likes count)
  const image = props.src;
  const title = props.label;
  const description = props.children;
  const alt = "Card of "+ title; //El alt del Card se saca del title. (No se tiene que pedir del backend)

  return(
    <Card sx={{ maxWidth: '20rem' }}>
    <CardActionArea>
      <CardMedia
        component="img"
        image={image}
        alt={alt}
        sx={{ maxHeight: '14rem'}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontWeight={'bold'}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
};

//Esto es solo para testing el card en las paginas luego se borrara 
export function ProviderTest(){
  return(
    <Card sx={{ maxWidth: '20rem' }}>
    <CardActionArea>
      <CardMedia
        component="img"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMY6vszJe0KnZq9RMy35_Kwy5oDLufr1IyeQ&usqp=CAU"
        alt="green iguana"
        sx={{ maxHeight: '14rem'}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  );
};

export function ToggleCard(props){
  const image = props.src;
  const title = props.label;
  const description = props.children;
  const alt = "Card of "+ title; 

  return(
    <Card sx={{ maxWidth: '20rem' }}>
    <CardActionArea>
      <CardMedia
        component="img"
        image={image}
        alt={alt}
        sx={{ maxHeight: '14rem'}}
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
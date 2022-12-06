import { Box, Typography } from "@mui/material";


export default function Stars(props) {

  //Single star pass in Rating and index to compare to rating
  function Star(props) {

    let leftColor = "#d9d9d9";
    let rigthColor = "#d9d9d9";

    //Left
    if (props.rating > props.index) {
      leftColor = "#ffcb45";
    }

    //Right
    if (props.rating >= props.index + 1) {
      rigthColor = "#ffcb45";
    }

    return (
      <Box className="Star">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"
          clipRule="evenodd"
          width={props.width}
          viewBox="0 0 100 100">
          <path fill={rigthColor} d="m50 83.0536 24.7179 15.6147c3.9 2.4627 8.7103-1.1976 7.6756-5.8366l-6.5613-29.433 21.8427-19.806c3.4421-3.1187 1.6018-9.0386-2.9349-9.4396l-28.7522-2.5512L54.7406 3.8246c-1.7758-4.3787-7.7054-4.3787-9.4812 0L34.0122 31.602 5.26 34.1531c-4.5367.401-6.3772 6.3209-2.935 9.4396l21.8428 19.806-6.5613 29.433c-1.0347 4.639 3.7756 8.2993 7.6756 5.8366L50 83.0536Z" />
          <path fill={leftColor} d="M50 70.8914V.5406c-1.9251 0-3.8502 1.0933-4.7406 3.2853L34.0122 31.6028 5.26 34.154c-4.5367.4009-6.3772 6.3207-2.935 9.4395l21.8428 19.8057-6.5613 29.4325c-1.0346 4.6391 3.7756 8.2993 7.6756 5.8366L50 83.0539V70.8914Z" />
        </svg>
      </Box>
    );
  }

  return (
    <Box
      className="StarRating"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: props.width === undefined ? '100px' : props.width,
        height: props.height === undefined ? '20px' : props.height,
      }}
    >
      {Array(5).fill('').map((e, index) => (
        <Star key={index} rating={props.rating} index={index} width={'100%'} />
      )
      )}
      <Typography variant={'caption'}
        sx={{
          position: 'absolute',
          left: '100%',
          top: 0,
          transform: 'translate(30%, 5%)',
          width: props.width === undefined ? "20px" : (props.width / 5),
          height: props.height === undefined ? "20px" : props.height,
          color: props.textColor === undefined ? 'white' : props.textColor,
        }}>
        {props.rating}
      </Typography>
    </Box>
  )
}
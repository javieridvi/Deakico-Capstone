import React from 'react'
import { Container, Box , Typography, Card, CardActions,CardContent, CardMedia, Button} from '@mui/material';
import Image from 'next/image'
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function About() {
  return (
    <div>
  <Container sx={{width:'100%' ,height:'100%', justifyContent:'center'}} >
  
    <Box className='aboutHead' sx={{width:'100%', height:'300px', backgroundColor: 'primary', mt:'8%', justifyContent:'center', textAlign:'center', display:'flex'}}>
      <div className='aboutPic'>
       <Image src="/Coqui.png" 
        width={500}
        height={474}
        /> </div>  
          <Typography variant='h2'sx={{width:'50%', fontWeight:'bold',mr:'6%', mt:'5%', position:'relative'}}>
        "We can help business of every size -from entrepreneurs to iconic brands."
      </Typography>
   
    </Box>

    <Container className='aboutInfo' sx={{display:'flex'}}>
      <Box  sx={{mt:'20%'}}>
        <Typography sx={{fontSize:'46px', fontWeight:'700',mt:'5px' }}> About Deakico :    </Typography>  
        <Typography sx={{fontSize:'28px', fontWeight:'600',fontStyle:'italic', m:'10px'}}> "De aqui como el Coqui"   </Typography>
        <Typography sx={{fontSize:'25px', fontWeight:'500',textAlign:'left'}}> - We establish ourselves as 
        the platform that connects local small companies with potential customers.
         In addition, a strong Review/Rating system is offered to clients so they can make informed
          judgments about where their money and trust are going without worry.
        </Typography>
       </Box>
    </Container>
      
 
      <Box sx={{mt:'10%', display:'flex', textAlign:'left' , mt:'8rem', backgroundImage:'radial-gradient( rgb(193,3239,221,0.3) 2%, white 60%)', width:'100%'}}>
        <Typography sx={{fontSize:'40px', fontWeight:'700', pl:'1rem'}}> <mark className='problem-st'>Problem Statement : </mark> 
           <Typography sx={{fontSize:'25px', fontWeight:'500', mb:'5%', width:'70%',mt:'2%'}}>
             - customers acknowledge the quality of local services and products because they are made with passion, 
           dedication and with additional freshness or uniqueness. 
           We expect that quality pushes business to a better price and demand. The fact is that big enterprises overshadow 
           local services/products because they have name recognition privileges that makes them more "findable or reliable". 
           For small or medium business owners and starters it is difficult to build trust and show their work without having
            a previous encounter or recommendation. 

        </Typography>
        </Typography>   
            <div>
             <Image src="/career.png" 
              width= {350}
              height={550}
              layout='fixed'
              />
            </div>
      </Box>
    
        
     
        <Box sx={{display:'flex', width:'100%', height:'40%', p:'5rem', m:'20px'}}>
 <Image src="/connection.png" 
              width= {300}
              height={400}
              layout='fixed'
              />

        <Typography sx={{fontSize:'40px', fontWeight:'700', ml:'8rem' , textAlign:'left',width:'60%'}}> <mark className='sol' >  Solution Approach: </mark> 
           <Typography sx={{fontSize:'25px', fontWeight:'500', mb:'5%', mt:'2%'}}> 
          - The solution we proposed is a web-based system that promotes the growth, organization, and reliability of 
           local businesses/services in Puerto Rico. We seek to create a platform that both customers and providers can benefit from.
           <txt> we </txt>
            <ul>         
              <li>Build a relationship with their customers let them express
                 about a service and give a chance to get positive tips that help the (brand /service) to improve.</li>
              <li>Monitoring their orders and create receipts  </li>
              <li>Provide a review method that helps them to build trust and reliability.</li>
              <li> Have inventory management.</li>
            </ul>
        </Typography>
        </Typography>
        </Box>

        <Box  sx={{mt:'2%', display:'flex'}}>
          <div>
        <Typography sx={{fontSize:'40px', fontWeight:'600',mb:'1rem', }}> <mark className='gap-sol'> Gap with existing solutions: </mark>   </Typography>  
       
        <Typography sx={{fontSize:'25px', fontWeight:'500',textAlign:'left', pb:'3rem', width:'80%'}}> -  Existing solutions do not merge the possibility of finding local products and services in a single space.
          In addition, the markets in social networks like Instagram or Facebook tend to distract the client from the commercial content. 
           There is a lack of exposure in the local market on top of the new wave of local products and the gestation of new entrepreneurs who want to grow their business in the island.
            Our proposal project also covers the need of finding places near the user’s current localization. 
        </Typography></div>
        <div>
        <Image src="/presentation.png" 
              width= {300}
              height={400}
              layout='fixed'
              /></div>  </Box>

<Container>
              <Typography sx={{fontSize:'40px', fontWeight:'600',textAlign:'center', pt:'3rem',mb:'2rem'}}>Developers</Typography>

        <Box className='developers-info' sx={{mb:'2rem', pb:'4rem', mt:'4rem', display:'flex', justifyContent:'space-evenly'}}>

        <Card sx={{ maxWidth: 345 , pb:'2rem'}}>
        <CardMedia
          component="img"
          height="300"
          image="Jose.jpg"
          alt="Developer"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"sx={{mt:'1rem', textAlign:'center'}}>
            José Vazquez
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mt:'1rem', textAlign:'center'}}>
          Full Stack developer, Database Administrator, Software Tester
          </Typography>
        </CardContent>
      <CardActions>
        <LinkedInIcon sx={{ml:'4.5rem'}}/><Button size="large"  href="https://www.linkedin.com/in/jose-vazquez-429a0b182" >
          More about me  
        </Button>
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image="Grace.png"
          alt='Developer'
    
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"sx={{mt:'1rem', textAlign:'center'}}>
            Grace Fernández
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mt:'1rem', textAlign:'center'}}>
         Full Stack developer, UI Designer, Frontend Developer, and Cyber Security Analyst
          </Typography>
        </CardContent>
      <CardActions>
      <LinkedInIcon sx={{ml:'4.5rem'}}/><Button size="large"  href="https://www.linkedin.com/in/grace-m-fernandez-rivera-3777a2222/" >
          More about me  
        </Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image=""
          alt="Developer"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{mt:'1rem', textAlign:'center'}}>
            Javier Del Valle-Irizarry
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mt:'1rem', textAlign:'center'}}>
          Full Stack developer, Web Engineer, SQL Developer, Data Analyst
          </Typography>
        </CardContent>
      <CardActions>
      <LinkedInIcon sx={{ml:'4.5rem'}}/><Button size="large"  href="https://www.linkedin.com/in/jose-vazquez-429a0b182" >
          More about me  
        </Button>
      </CardActions>
    </Card>
     </Box> 
</Container>
<style jsx>{`
 .sol{
  background-color: #32F3AF;
}

.problem-st{
  background-color: #EA4A8E;
  margin: 3px
}`}</style>

</Container>

</div>
)
}

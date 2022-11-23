import React from 'react'
import { Container, Box, Typography, Card, CardActions, CardContent, CardMedia, Button, Stack } from '@mui/material';
import Image from 'next/image'
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function About() {
  return (
    <div>
      <Container sx={{ width: '100%', height: '100%', justifyContent: 'center' }} >

        <Stack className='aboutHead'
          direction={'row'}
          justifyContent='center'
          alignItems='center'
          sx={{
            width: '100%',
            maxHeight: '300px',
            backgroundColor: 'primary',
            mt: '8%',
            textAlign: 'center',
          }}
        >
          <div className='aboutPic'>
            <img src='/Coqui.svg' width={"100%"} />
          </div>
          <Typography variant='h3'
            sx={{
              width: { xs: '100%', sm: '50%' },
              fontWeight: 'bold',
              fontSize: 'clamp(1rem, 5vw, 3.75rem)',
              position: 'relative',
            }}
          >
            "We can help business of every size - from entrepreneurs to iconic brands."
          </Typography>

        </Stack>

        <Container className='aboutInfo' sx={{ display: 'flex' }}>
          <Box sx={{ mt: '5%' }}>
            <Typography variant='h2' sx={{ fontSize: '46px', fontWeight: '700', mt: '5px' }}><mark>About Deakico :  </mark>  </Typography>
            <Typography variant='h2' sx={{ fontSize: '28px', fontWeight: '600', fontStyle: 'italic', m: '10px' }}> "De aqui como el Coqui"   </Typography>
            <Typography sx={{ fontSize: '25px', fontWeight: '500', textAlign: 'left' }}> - We establish ourselves as
              the platform that connects local small companies with potential customers.
              In addition, a strong Review/Rating system is offered to clients so they can make informed
              judgments about where their money and trust are going without worry.
            </Typography>
          </Box>
        </Container>


        <Box
          sx={{
            position: 'relative',
            mt: '10%',
            display: 'flex',
            mt: '8rem',
            backgroundImage: 'radial-gradient( rgb(193,239,221,0.3) 2%, white 60%)',
            width: '100%'
          }}
          >
          <Box
          sx={{
            textAlign: 'left',
            minWidth: '56%',
            width: '100%',
          }}
          >
            <Typography
              variant='h3'
              sx={{
                fontSize: '40px',
                fontWeight: '700',
              }}
            >   Problem Statement :
          
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: '25px',
                fontWeight: '500',
                mb: '5%',
                width: '80%',
                mt: '2%'
              }}
            >
              - customers acknowledge the quality of local services and products because they are made with passion,
              dedication and with additional freshness or uniqueness.
              We expect that quality pushes business to a better price and demand. The fact is that big enterprises overshadow
              local services/products because they have name recognition privileges that makes them more "findable or reliable".
              For small or medium business owners and starters it is difficult to build trust and show their work without having
              a previous encounter or recommendation.

            </Typography>
          </Box>
          <Box
          component={'img'}
          src='/solu.jpg'
          sx={{
            width: 'min(500px, 44%)',
            maxHeight: '500px',
            aspectRatio: '1/1',
            objectFit: 'fill',
          }}
          >
          </Box>
          {/* <div>
            <Image src="/solu.jpg"
              width={500}
              height={550}
              layout='fixed'

            />
          </div> */}
        </Box>

        <Box sx={{ display: 'flex', width: '100%', height: '40%', p: '0', m: '10px' }}>
          <Image src="/problem.png"
            width={500}
            height={440}
            layout='fixed'
            objectFit='scale-down'
          />

          <Box
            className='Solution-Approach'
            sx={{
              width: '60%',
              textAlign: 'left',
              ml: '8rem',
            }}
          >
            <Typography
              variant='h3'
              sx={{
                fontSize: '40px',
                fontWeight: '700',
                marginBottom: '1rem',
              }}
            >
         
                Solution Approach:
           
            </Typography>
            <Typography
              variant=''
              sx={{
                fontSize: '25px',
                fontWeight: '500',
                mb: '5%',
                mt: '2%'
              }}
            >
              - The solution we proposed is a web-based system that promotes the growth, organization, and reliability of
              local businesses/services in Puerto Rico. We seek to create a platform that both customers and providers can benefit from.
              <ul>
                <li>Build a relationship with their customers let them express
                  about a service and give a chance to get positive tips that help the (brand /service) to improve.</li>
                <li>Monitoring their orders and create receipts  </li>
                <li>Provide a review method that helps them to build trust and reliability.</li>
                <li> Have inventory management.</li>
              </ul>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: '2%', display: 'flex' }}>
          <div>
        <Typography sx={{fontSize:'40px', fontWeight:'600',mb:'1rem', }}> Gap with existing solutions: </Typography>  
       
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
          <Typography sx={{ fontSize: '40px', fontWeight: '600', textAlign: 'center', pt: '3rem', mb: '2rem' }}>Developers</Typography>

          <Box className='developers-info' sx={{ mb: '2rem', pb: '4rem', mt: '4rem', display: 'flex', justifyContent: 'space-evenly' }}>

            <Card sx={{ maxWidth: 345, pb: '2rem' }}>
              <CardMedia
                component="img"
                height="300"
                image="Jose.jpg"
                alt="Developer"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ mt: '1rem', textAlign: 'center' }}>
                  José Vazquez
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: '1rem', textAlign: 'center' }}>
                  Full Stack developer, Database Administrator, Software Tester
                </Typography>
              </CardContent>
              <CardActions>
                <LinkedInIcon sx={{ ml: '4.5rem' }} /><Button size="large" href="https://www.linkedin.com/in/jose-vazquez-429a0b182" >
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
                <Typography gutterBottom variant="h5" component="div" sx={{ mt: '1rem', textAlign: 'center' }}>
                  Grace Fernández
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: '1rem', textAlign: 'center' }}>
                  Full Stack developer, UI Designer, Frontend Developer, and Cyber Security Analyst
                </Typography>
              </CardContent>
              <CardActions>
                <LinkedInIcon sx={{ ml: '4.5rem' }} /><Button size="large" href="https://www.linkedin.com/in/grace-m-fernandez-rivera-3777a2222/" >
                  More about me
                </Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="300"
                image="Javier.png"
                alt="Developer"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ mt: '1rem', textAlign: 'center' }}>
                  Javier Del Valle-Irizarry
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: '1rem', textAlign: 'center' }}>
                  Full Stack developer, Web Engineer, SQL Developer, Data Analyst
                </Typography>
              </CardContent>
              <CardActions>
                <LinkedInIcon sx={{ ml: '4.5rem' }} /><Button size="large" href="https://www.linkedin.com/in/javier-del-valle-01a923191/" >
                  More about me
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Container>
        {/* ### PROPS STYLE ### */}
        <style jsx>{`

 `}</style>

      </Container>

    </div>
  )
}

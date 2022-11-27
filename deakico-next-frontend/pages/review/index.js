import React from 'react'
import Review from './review'
import { Stack, Pagination , } from '@mui/material'


export default function index() {
  return (
    <div>
       
        <main>
            <Review/>
        </main>

     <footer>
       <Stack spacing={2} sx={{mt:'10%', alignItems:'center', mb:'5%'
      }}>
     <Pagination count={1} />
     </Stack>
     </footer>
    </div>
  )
}

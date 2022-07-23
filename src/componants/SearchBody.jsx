import React, { useContext } from 'react'
import Grid from '@mui/material/Grid'
import { AppContext } from '../App'
import BookCard from './BookCard' 
import Container from '@mui/material/Container'
import { Typography } from '@mui/material'


function SearchBody() {
  const { searchData } = useContext(AppContext).searchData;

  return (
    <Container maxWidth="90vw" sx={{my:20}}>
      <Typography variant='h4' sx={{mb:5, ml:10}}>
         Result foound : {searchData.length}
      </Typography>
      <Grid container justifyContent="center" spacing={10}>
          {searchData.map(data =>
            <Grid item key = {data[0]}>
              <BookCard data = {data[1]} />
            </Grid>
          )}
      </Grid>
      {!searchData.length && <Grid sx={{m:'40vh'}}></Grid>}
    </Container>
  )
}

export default SearchBody
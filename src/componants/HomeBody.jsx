import React, { useContext } from 'react'
import BookCard from './BookCard'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { AppContext } from '../App' 

function BodyHome() {
  const { bookData } = useContext(AppContext).bookData;
  // object => [[key, values], ...] => sort desc => slice top 8
  const popularData = Object.entries(bookData).sort((a, b) => b[1].popularity - a[1].popularity).slice(0, 8);

  //console.log(data);
  return (
    <Container maxWidth="90vw" sx={{my:20}}>
      <Typography variant="h3" gutterBottom component="div" sx={{m:5, ml:10}}>
        Populor books
      </Typography>
    
      <Grid container justifyContent="center" spacing={10}>
          {popularData.map(data =>
            <Grid item key = {data[0]}>
              <BookCard data = {data[1]} />
            </Grid>
          )}
      </Grid>
    </Container>
  )
}

export default BodyHome
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Box from '@mui/material/Box'

function BookCard(props) {
  const {title, author, language, imgLink} = props.data
  return (
    <Card sx={{ 
        width: '18vw', 
        height: 450, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between'
      }}>
      <Box>
        <CardMedia
          component="img"
          image={imgLink}
          alt="image"
          sx={{height: 280, objectFit: 'fill'}}
        />
        <CardContent sx={{
            py: 0.5, 
            pl: 2, 
            '&:last-child': {
              pb: 0
            }
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {author} &nbsp;&nbsp;•&nbsp;&nbsp; {language}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{pt: 0, pl: 2}}>
        <Button variant="contained" size="medium" sx={{flexGrow: 1, mx: 1}}>Borrow</Button>
        <IconButton size="large" aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default BookCard

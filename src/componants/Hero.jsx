import React, { useState } from 'react'
import heroImg1 from '../img/1.jpg' 
import heroImg2 from '../img/2.jpg' 
import heroImg3 from '../img/3.jpg' 

import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function Hero() {

  const [currentImage, setCurrentImage] = useState(0)
  const images = [heroImg1, heroImg2, heroImg3]

  const forwardBtn = () => {
    console.log(currentImage);
    setCurrentImage((currentImage + 1) % images.length)
  }

  const backworddBtn = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length)
  }

  return (
    <Box > 
      <ArrowBackIosIcon sx={{
          position: 'absolute',
          left: 50,
          top: 300,
        }}
        onClick={backworddBtn}
      />
        {images.map((image, index)=>
            currentImage === index &&
            <img 
                key={image} 
                src={image} 
                alt={image}
                width='100%'
                position='relative'
            />
        )}
      <ArrowForwardIosIcon sx={{
          position: 'absolute',
          right: 50,
          top: 300,
        }}
        onClick={forwardBtn}
      />
    </Box>
  )
}

export default Hero
import React from "react";
import heroBanner1 from "../img/hero1.svg";
import heroBanner2 from "../img/hero2.svg";
import heroBanner3 from "../img/hero3.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton, Box, Container, Typography, Grid } from "@mui/material";
import BookCard from "./BookCard";
import { firebaseDb} from "../Firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";


function HomePage() {
  const [currentBanner, setCurrentBanner] = React.useState(0);
  const heroBanners = [heroBanner1, heroBanner2, heroBanner3];

  const forwardBtn = () => {
    setCurrentBanner((currentBanner + 1) % heroBanners.length);
  };

  const backwarddBtn = () => {
    setCurrentBanner(
      (currentBanner - 1 + heroBanners.length) % heroBanners.length
    );
  };

  return (
    <Box>
      <IconButton
        aria-label="hero-banner-backward"
        onClick={backwarddBtn}
        sx={{
          position: "absolute",
          left: 20,
          top: 220,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <img src={heroBanners[currentBanner]} width="100%" alt="hero-banner" />
      <IconButton
        aria-label="hero-banner-forward"
        onClick={forwardBtn}
        sx={{
          position: "absolute",
          right: 20,
          top: 220,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

export default HomePage;

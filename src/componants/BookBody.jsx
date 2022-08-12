import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  IconButton,
  Container,
  Rating,
  TextField,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function BookPage() {
  const { bookPageData } = useContext(AppContext);
  const [favoriteIcon, setFavoriteIcon] = useState(false);

  // const { title, author, language, year, imgLink, popularity } = {
  //   author: "Geoffrey Chaucer",
  //   fileName: "the-canterbury-tales.jpg",
  //   imgLink:
  //     "https://firebasestorage.googleapis.com/v0/b/library-management-f422d.appspot.com/o/Books%2Fa-Dolls-house.jpg?alt=media&token=af19da47-f031-4e3a-a499-63cd1d8a0144",
  //   language: "English",
  //   pages: 544,
  //   popularity: 22,
  //   title: "The Canterbury Tales",
  //   year: 1450,
  // };

  const {
    title,
    author,
    language,
    publishDate,
    coverImg,
    rating,
    publisher,
    description,
    isbn,
  } = bookPageData[1];

  return (
    <Container sx={{ display: "flex", gap: "15px", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: "50px", marginTop: "50px" }}>
        <Box>
          <img src={coverImg} width="300px" alt="book" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="subtitle1">by {author}</Typography>
          <Rating name="read-only" value={rating} readOnly sx={{ mt: 2 }} />
          <Typography variant="subtitle2">Publisher: {publisher}</Typography>
          <Typography variant="subtitle2">Language: {language}</Typography>
          <Typography variant="subtitle2">
            Publish Data: {publishDate}
          </Typography>
          <Typography variant="subtitle2">ISBN: {isbn}</Typography>
          <Box sx={{ margin: "40px 0px 10px" }}>
            <Button variant="contained" size="large">
              Borrow
            </Button>
            <IconButton color="inherit" onClick={() => setFavoriteIcon(true)}>
              {favoriteIcon ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon color="error" />
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ mt: 5, textDecoration: "underline" }}>
        Description
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <Container
        maxWidth="lg"
        sx={(theme) => ({
          mt: 10,
          p: 5,
          borderRadius: 3,
          backgroundColor: theme.palette.grey[100],
        })}
      >
        <Grid container spacing={8}>
          <Grid item sx={{ flex: 1 }}>
            <TextField
              id="standard-basic"
              label="Write review"
              variant="standard"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" size="medium">
              Post
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={8} sx={{ mt: 0.1, mb: 10 }}>
          <Grid item container spacing={10}>
            <Grid item xs={2}>
              <Typography variant="subtitle1">Name</Typography>
              <Typography variant="caption">Data</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum quam lectus, mattis scelerisque lectus vehicula,
                maximus vulputate lorem. Integer cursus gravida quam, in
                consequat est bibendum at. Phasellus mollis, augue eget
                malesuada molestie, nibh purus laoreet sem, eu tincidunt enim
                lorem sit amet ante. Donec eu mattis eros.
              </Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={10}>
            <Grid item xs={2}>
              <Typography variant="subtitle1">Name</Typography>
              <Typography variant="caption">Data</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum quam lectus, mattis scelerisque lectus vehicula,
                maximus vulputate lorem. Integer cursus gravida quam, in
                consequat est bibendum at. Phasellus mollis, augue eget
                malesuada molestie, nibh purus laoreet sem, eu tincidunt enim
                lorem sit amet ante. Donec eu mattis eros.
              </Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={10}>
            <Grid item xs={2}>
              <Typography variant="subtitle1">Name</Typography>
              <Typography variant="caption">Data</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum quam lectus, mattis scelerisque lectus vehicula,
                maximus vulputate lorem. Integer cursus gravida quam, in
                consequat est bibendum at. Phasellus mollis, augue eget
                malesuada molestie, nibh purus laoreet sem, eu tincidunt enim
                lorem sit amet ante. Donec eu mattis eros.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default BookPage;

import React, { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";
import { AppContext } from "../App";
import { IconButton, Box, Container, Typography, Grid } from "@mui/material";
import { firebaseDb } from "../Firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

async function fetchPopularBooks(setPopularBooks) {
  const booksDataRef = collection(firebaseDb, "booksData");
  const popularQuery = query(
    booksDataRef,
    orderBy("bbeScore", "desc"),
    limit(12)
  );
  const querySnapshot = await getDocs(popularQuery);
  const temp = new Map();
  querySnapshot.forEach((doc) => temp.set(doc.id, doc.data()));
  setPopularBooks(temp);
}

function BodyHome() {
  const [popularBooks, setPopularBooks] = useState(new Map());
  const isFetch = useRef(false);

  useEffect(() => {
    fetchPopularBooks(setPopularBooks);

    // const bookDataLocal = JSON.parse(localStorage.getItem("bookData"));
    // if (bookDataLocal) {
    //   isFetched.current = true;
    //   setBookData(bookDataLocal);
    // }
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Populor books
      </Typography>
      <Grid container spacing={10}>
        {[...popularBooks].map((data) => (
          <Grid item key={data[0]} xs={12} sm={6} md={4} lg={3}>
            <BookCard id={data[0]} data={data[1]} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BodyHome;

import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { AppContext } from "../App";
import BookCard from "./BookCard";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { firebaseDb } from "../Firebase";

function SearchBody() {
  const { searchInputValue, fetchSearch } = useContext(AppContext);
  const [searchData, setSearchData] = useState(new Map());

  const genarateSearchData = (bookData) => {
    const tokens = searchInputValue
      .split(" ")
      .filter((token) => token.trim() !== "");
    const searchTermRegex = new RegExp(tokens.join("|"), "gim");

    const searchDataTitle = [];
    const searchDataAuthor = [];
    const searchDataLanguage = [];

    bookData.forEach((data, key) => {
      const matchCountTitle = [...data.title.matchAll(searchTermRegex)].length;
      if (matchCountTitle) {
        searchDataTitle.push([key, data, matchCountTitle]);
        return;
      }

      const matchCountAuthor = [...data.author.matchAll(searchTermRegex)].length;
      if (matchCountAuthor) {
        searchDataAuthor.push([key, data, matchCountTitle]);
        return;
      }

      const matchCountLanguage = [...data.language.matchAll(searchTermRegex)].length;
      if (matchCountLanguage) {
        searchDataLanguage.push([key, data, matchCountTitle]);
        return;
      }
    });

    searchDataTitle.sort((a, b) => b[3] - a[3]);
    searchDataAuthor.sort((a, b) => b[3] - a[3]);
    searchDataLanguage.sort((a, b) => b[3] - a[3]);

    const searchData = [
      ...searchDataTitle,
      ...searchDataAuthor,
      ...searchDataLanguage,
    ];
    const searchDataMap = new Map();
    searchData.forEach(data => searchDataMap.set(data[0], data[1]))
    setSearchData(searchDataMap);
  };

  useEffect(() => {
    async function fetchBooks() {
      const booksDataRef = collection(firebaseDb, "booksData");
      const booksQuery = query(booksDataRef, limit(100));
      const querySnapshot = await getDocs(booksQuery);
      const bookData = new Map();
      querySnapshot.forEach((doc) => bookData.set(doc.id, doc.data()));
      //localStorage.setItem("bookData", JSON.stringify(bookData));
      genarateSearchData(bookData);
    }

    // const bookDataLocal = JSON.parse(localStorage.getItem("bookData"));
    // if (bookDataLocal) {
    //   isFetched.current = true;
    //   setBookData(bookDataLocal);
    // }

    fetchBooks();
  }, [fetchSearch]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
        Result foound : {searchData.size}
      </Typography>
      <Grid container spacing={10}>
        {[...searchData].map((data) => (
          <Grid item key={data[0]} xs={3}>
            <BookCard id={data[0]} data={data[1]} />
          </Grid>
        ))}
      </Grid>
      {!searchData.length && <Grid sx={{ m: "40vh" }}></Grid>}
    </Container>
  );
}

export default SearchBody;

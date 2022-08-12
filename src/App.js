import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseDb, firebaseStorage, firebaseAuth } from "./Firebase";
import { useState, useEffect, useRef, createContext } from "react";
import Navbar from "./componants/Navbar";
import Hero from "./componants/Hero";
import BodyHome from "./componants/HomeBody";
import SearchBody from "./componants/SearchBody";
import Footer from "./componants/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BookBody from "./componants/BookBody"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export const AppContext = createContext();

function App() {
  const customTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const rawLocalData = localStorage.getItem("authData") || "{}";
  const localData = JSON.parse(rawLocalData);

  const isFetched = useRef(true);
  const [bookData, setBookData] = useState([]);
  const [page, setPage] = useState("home");
  const [logInData, setLogInData] = useState(localData);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [fetchSearch, setFetchSearch] = useState({});
  const [bookPageData, setBookPageData] = useState([]);

  const googleProvider = new GoogleAuthProvider();

  const signInAccount = async () => {
    await signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        const data = result.user.reloadUserInfo;
        localStorage.setItem("authData", JSON.stringify(data));
        setLogInData(data);
      })
      .catch((err) => console.log(err));
  };

  const logoutAccount = async () => {
    await firebaseAuth
      .signOut()
      .then(() => {
        localStorage.removeItem("authData");
        setLogInData({});
      })
      .catch((err) => console.log(err));
  };

  const temp = useRef("");
  const handleSearch = (event) => {
    if (temp.current === searchInputValue) return;
    if (event.key === "Enter" || event.type === "click") {
      temp.current = searchInputValue;
      setPage("search");
      setFetchSearch({});
    }
  };

  const hangleBoookOpen = (id, data) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    setBookPageData([id, data]);
    setPage("book");
  }

  return (
    <AppContext.Provider
      value={{
        bookData,
        setBookData,
        page,
        setPage,
        logInData,
        setLogInData,
        searchInputValue,
        setSearchInputValue,
        fetchSearch,
        bookPageData,
        handleSearch,
        signInAccount,
        logoutAccount,
        hangleBoookOpen
      }}
    >
      {isFetched.current && (
        <ThemeProvider theme={customTheme}>
          <Grid className="App" display="flex" flexDirection="column">
            <Navbar />
            {page === "home" && (
              <Box flexGrow="1" sx={{ mb: 10 }}>
                <Hero />
                <BodyHome />
              </Box>
            )}
            {page === "search" && <SearchBody sx={{ flexGrow: 1 }} />}
            {page === "book" && <BookBody />}
            <Footer />
          </Grid>
        </ThemeProvider>
      )}
    </AppContext.Provider>
  );
}

export default App;

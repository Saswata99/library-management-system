import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getDocs, collection } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { firebaseDb, firebaseStorage, firebaseAuth } from "./Firebase";
import { useState, useEffect, useRef, createContext } from "react";
import Navbar from "./componants/Navbar";
import Hero from "./componants/Hero";
import BodyHome from "./componants/HomeBody";
import SearchBody from './componants/SearchBody'
import Footer from "./componants/Footer";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

export const AppContext = createContext();

function App() {
  const customTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const rawLocalData = localStorage.getItem('authData') || '{}' 
  const localData = JSON.parse(rawLocalData) 

  const isFetched = useRef(false);
  const [ bookData, setBookData ] = useState([]);
  const [ searchData, setSearchData ] = useState([]);
  const [ isHome, setIsHome ] = useState(true);
  const [ logInData, setLogInData ] = useState(localData);

  //auth
  const googleProvider = new GoogleAuthProvider()

  const signInAccount = async () => {
    await signInWithPopup(firebaseAuth, googleProvider)
      .then(result => {
          console.log(result);
          const data = result.user.reloadUserInfo;
          localStorage.setItem('authData', JSON.stringify(data));
          setLogInData(data);
        })
      console.log('render');
  }

  const logoutAccount = async () => {
    await firebaseAuth.signOut()
      .then(() => {
        localStorage.removeItem('authData ');
        setLogInData({});
    })
  }

  //firebase
  const booksRef = collection(firebaseDb, "books");
  const imgFolderRef = ref(firebaseStorage, "Books/");

  const genarateSearchData = (searchValue) => {
    const tokens = searchValue.split(' ').filter(token => token.trim() !== '');
    const searchTermRegex = new RegExp(tokens.join('|'), 'gim');

    const searchDataTitle = [];
    const searchDataAuthor = [];
    const searchDataLanguage = [];

    Object.entries(bookData).forEach(data => {
      const matchCountTitle = [...data[1].title.matchAll(searchTermRegex)].length;
      if (matchCountTitle) {
          searchDataTitle.push([...data, matchCountTitle]);
          return;
      }

      const matchCountAuthor = [...data[1].author.matchAll(searchTermRegex)].length;
      if (matchCountAuthor) {
          searchDataAuthor.push([...data, matchCountAuthor]);
          return;
      }

      const matchCountLanguage = [...data[1].language.matchAll(searchTermRegex)].length;
      if (matchCountLanguage) {
          searchDataLanguage.push([...data, matchCountLanguage]);
          return;
      }

    });

    searchDataTitle.sort((a, b) => b[2] - a[2]);
    searchDataAuthor.sort((a, b) => b[2] - a[2]);
    searchDataLanguage.sort((a, b) => b[2] - a[2]);

    const searchData = [ ...searchDataTitle, ...searchDataAuthor, ...searchDataLanguage ];
    setSearchData(searchData);
  };

  useEffect(() => {
    const getData = async () => {
      let imgLinks = [];
      await listAll(imgFolderRef).then((response) => {
        response.items.forEach((ele) => {
          getDownloadURL(ele).then((url) => {
            imgLinks.push(url);
          });
        });
      });
      let rawBookData = await getDocs(booksRef);

      let bookData = {}; //combine image and book data
      rawBookData.docs.forEach(doc => {
        const data = doc.data();
        const regex = new RegExp(data.fileName);

        bookData[doc.id] = {
          ...data,
          imgLink: imgLinks.find((value) => regex.test(value))
        }
      });

      setBookData(bookData);
      localStorage.setItem('bookData', JSON.stringify(bookData));
      isFetched.current = true;
    };

    const bookDataLocal = JSON.parse(localStorage.getItem('bookData'));
    if (bookDataLocal) {
      isFetched.current = true; 
      setBookData(bookDataLocal);
    }

    isFetched.current || getData();

  }, []);


  return (
    <AppContext.Provider value={{
        bookData: { bookData, setBookData },
        isHome: { isHome, setIsHome },
        searchData: { searchData, setSearchData },
        logInData: { logInData, setLogInData },
        genarateSearchData: genarateSearchData,
        signInAccount: signInAccount,
        logoutAccount: logoutAccount,
      }}>

      {isFetched.current && (
        <ThemeProvider theme={customTheme}>
          <Grid className="App" display='flex' flexDirection='column'>
            <Navbar />
            {isHome? 
              (<Box flexGrow='1'>
                <Hero /> 
                <BodyHome />
              </Box>) : 
              <SearchBody sx={{flexGrow: 1}} />
            }
            <Footer />
          </Grid>
        </ThemeProvider>
      )}
    </AppContext.Provider>
  );
}

export default App;

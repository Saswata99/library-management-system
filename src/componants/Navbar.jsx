import React, { useState, useContext, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { AppContext } from '../App';


const Navbar = () => {
  const { setIsHome } = useContext(AppContext).isHome;
  const { genarateSearchData } = useContext(AppContext);
  const { signInAccount } = useContext(AppContext);
  const { logoutAccount } = useContext(AppContext);
  const { logInData, setLogInData } = useContext(AppContext).logInData;
  const [ menuAnchor, setMenuAnchor ] = useState(null);
  const [ searchInputValue, setSearchInputValue ] = useState("");
  const temp = useRef("");

  const handleSearch = (event) => {
    if ( temp.current === searchInputValue) 
      return;
    if (event.key === 'Enter' || event.type === 'click') {
      window.scrollTo(0, 0);
      temp.current = searchInputValue;
      setIsHome(false);
      genarateSearchData(searchInputValue);
    }
  }

  function GoogleIcon(props) {
    return (
      <SvgIcon {...props}>
        <path fill="#EA4335 " d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
        <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
        <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
        <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
      </SvgIcon>
    );
  }
     
  return (
    <AppBar position='sticky'>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountBalanceIcon sx={{ mr: 1 }} />
            <Button 
              variant="text"
              onClick={() => {setIsHome(true); window.scrollTo(0, 0) }}
              disableRipple={true}
              sx={{
                fontFamily: 'monospace',
                fontSize: 20,
                fontWeight: 700,
                p: 0,
                letterSpacing: '.1rem',
                color: 'inherit',
                textTransform: "none",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "transparent"
                }
              }}
            > 
              Library 
            </Button>
          </Box>
          
          <Box 
            sx={(theme) => ({
              flexGrow: 1,
              maxWidth: 700,
              borderRadius: 1,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
              },
              mx: 10,
              pl: 2,
              display: 'flex',
              alignContent: 'center',
            })}
          >
            <InputBase
              placeholder="Search…"
              onKeyPress={handleSearch}
              onChange={(event) => setSearchInputValue(event.target.value)}
              value={searchInputValue}
              sx={(theme) => ({
                flexGrow: 1,
                pl: 1,
                transition: theme.transitions.create('width'),
              })}
            />
            <IconButton 
              onClick={handleSearch}
              disableRipple={true}
              sx={(theme) =>({
                  borderRadius: 0,
                  color: 'primary.contrastText',
                  backgroundColor: alpha(theme.palette.primary.main, 0.6),
                  '&:hover': {
                    color: 'primary.contrastText',
                    backgroundColor: alpha(theme.palette.primary.main, 0.9)
                  },
                  '&:active': {
                    transform: 'translateY(1px)'
                  }  
              })}
            >
              <SearchIcon sx={{px: 2}} />
            </IconButton>
          </Box>
          
          <Grid container justifyContent="flex-end"sx={{width: '250px'}}>
            { Object.keys(logInData).length ? (
              <>
                <Button 
                  disableRipple={true}
                  sx={{ 
                    mr: 2,
                    color: 'text.primary',  
                    textTransform: "none",
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "transparent"
                    }
                  }}
                >
                  Dashboard
                </Button>
                <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}>
                  <Avatar src={logInData.photoUrl} />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={menuAnchor}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(menuAnchor)}
                  onClose={() => setMenuAnchor(null)}
                >
                  <MenuItem onClick={() => {  }}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {  }}>
                    <Typography textAlign="center">Issued Book</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {  }}>
                    <Typography textAlign="center">Request Book</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { }}>
                    <Typography textAlign="center">Donate Book</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { setMenuAnchor(null); logoutAccount() }}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                  
                </Menu>
                
              </>) :

              (
                <Button 
                  variant="outlined" 
                  startIcon={<GoogleIcon sx={{pr: .5}}/>}
                  onClick={signInAccount}
                  sx={{ 
                    ml: 2,
                    px: 3,
                    color: 'text.primary',  
                    textTransform: "none",
                  }}
                >
                  Sign In
                </Button>
              )
            }
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

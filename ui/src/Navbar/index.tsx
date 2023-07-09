import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './styled';
import { Code } from '@mui/icons-material';
import { useState } from 'react';
import Signup from '../Signup';
import Login from '../Login';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/auth/atom';

interface AuthModal {
  signup: boolean;
  login: boolean;
}

export default function Navbar() {
  const [auth, setAuth] = useRecoilState(authState);

  const [showAuthModal, setShowAuthModal] = useState<AuthModal>({
    signup: false,
    login: false,
  });

  const setAuthModal = (type: 'signup' | 'login', value: boolean) => {
    setShowAuthModal((prev) => {
      if (type === 'signup') {
        return { ...prev, signup: value, login: false };
      } else if (type === 'login') {
        return { ...prev, signup: false, login: value };
      }
      return prev;
    });
  };

  const renderAuthButtons = () => {
    return (
      <div className="gap-2 flex">
        <Button
          variant="contained"
          style={{ textTransform: 'none' }}
          onClick={() => setAuthModal('signup', true)}
        >
          Signup
        </Button>
        <Button
          variant="contained"
          style={{ textTransform: 'none' }}
          onClick={() => setAuthModal('login', true)}
        >
          Login
        </Button>
      </div>
    );
  };

  const renderSearch = () => (
    <div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="!bg-white">
        <Toolbar className="flex justify-between">
          <div>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              color="info"
            >
              <Code />
            </IconButton>
            <span className="font-bold text-black">100xdevs</span>
          </div>

          <div className="gap-2 flex">
            {renderSearch()}
            {!auth.isLoggedin && renderAuthButtons()}
          </div>
          <Signup
            showSignup={showAuthModal.signup}
            onClose={() => setAuthModal('signup', false)}
          />
          <Login
            showLogin={showAuthModal.login}
            onClose={() => setAuthModal('login', false)}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

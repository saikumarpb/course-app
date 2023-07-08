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

export default function Navbar() {
  const [showSignup, setShowSignup] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'white' }}>
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
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button
              variant="contained"
              style={{ textTransform: 'none' }}
              onClick={() => setShowSignup(true)}
            >
              Signup
            </Button>
            <Button variant="contained" style={{ textTransform: 'none' }}>
              Login
            </Button>
          </div>
          <Signup show={showSignup} setShowModal={setShowSignup} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

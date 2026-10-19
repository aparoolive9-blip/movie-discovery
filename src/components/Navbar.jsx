import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar({ onMenuClick }) {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const q = text.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ fontWeight: 700, color: 'primary.main' }}>
          MovieBox
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            ml: 'auto',
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            px: 1.5,
            width: { xs: 140, sm: 280 },
          }}
        >
          <SearchIcon fontSize="small" />
          <InputBase
            placeholder="Search..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 220;

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Movies', path: '/movies', icon: <MovieIcon /> },
  { label: 'TV Shows', path: '/tv', icon: <LiveTvIcon /> },
  { label: 'My Watchlist', path: '/watchlist', icon: <BookmarkIcon /> },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={onClose}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
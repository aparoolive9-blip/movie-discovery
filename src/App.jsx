import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Home from './pages/Home.jsx';
import Movies from './pages/Movies.jsx';
import TvShows from './pages/TvShows.jsx';
import Watchlist from './pages/Watchlist.jsx';
import Search from './pages/Search.jsx';
import Details from './pages/Details.jsx';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: 0 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TvShows />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:type/:id" element={<Details />} />
        </Routes>
      </Box>
    </Box>
  );
}
import { useState, useEffect } from 'react';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';
import useFetch from '../hooks/useFetch.js';
import { getPopularTv, getTvGenres } from '../api/tmdb.js';
import MovieCard from '../components/MovieCard.jsx';
import GenreFilter from '../components/genrefilter.jsx';

export default function TvShows() {
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getTvGenres().then((data) => setGenres(data.genres || []));
  }, []);

  const { data, loading, error } = useFetch(
    () => getPopularTv(genreId),
    [genreId]
  );

  const items = data?.results || [];

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        TV Shows
      </Typography>

      <GenreFilter genres={genres} selected={genreId} onSelect={setGenreId} />

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 2,
          mt: 2,
        }}
      >
        {items.map((item) => (
          <MovieCard key={item.id} item={item} type="tv" />
        ))}
      </Box>
    </div>
  );
}
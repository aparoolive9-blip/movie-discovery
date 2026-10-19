import { useSearchParams } from 'react-router-dom';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';
import useFetch from '../hooks/useFetch.js';
import { searchMulti } from '../api/tmdb.js';
import MovieCard from '../components/MovieCard.jsx';

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';

  const { data, loading, error } = useFetch(
    () => (query ? searchMulti(query) : Promise.resolve({ results: [] })),
    [query]
  );

  const results = (data?.results || []).filter(
    (item) => item.media_type === 'movie' || item.media_type === 'tv'
  );

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {query ? `Results for "${query}"` : 'Search'}
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && query && results.length === 0 && (
        <Typography>No movies or TV shows found.</Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 2,
        }}
      >
        {results.map((item) => (
          <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
        ))}
      </Box>
    </div>
  );
}
import { Box, Typography } from '@mui/material';
import MovieCard from './MovieCard.jsx';
import Loader from './loader.jsx';
import ErrorMessage from './ErrorMessage.jsx';

export default function MovieGrid({ items, type, loading, error }) {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!items || items.length === 0) {
    return <Typography>No results found.</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 2,
      }}
    >
      {items.map((item) => (
        <MovieCard
          key={`${item.media_type || type}-${item.id}`}
          item={item}
          type={type}
        />
      ))}
    </Box>
  );
}
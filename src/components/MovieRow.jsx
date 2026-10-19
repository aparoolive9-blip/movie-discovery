import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useFetch from '../hooks/useFetch.js';
import MovieCard from './MovieCard.jsx';

export default function MovieRow({ title, fetchFn, mediaType }) {
  const { data, loading, error } = useFetch(fetchFn, []);
  const items = data?.results || [];
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;

    setCanScrollLeft(row.scrollLeft > 0);
    setCanScrollRight(row.scrollLeft + row.clientWidth < row.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);

    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [items.length, updateScrollButtons]);

  const scrollRow = (direction) => {
    const row = rowRef.current;
    if (!row) return;

    row.scrollBy({
      left: row.clientWidth * 0.8 * direction,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
      {title}
      </Typography>

      {loading && <CircularProgress size={28} />}
      {error && <Alert severity="error">{error}</Alert>}

      <Box
        sx={{ position: 'relative' }}
      >
        {canScrollLeft && (
          <IconButton
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollRow(-1)}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              zIndex: 1,
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(20, 20, 20, 0.8)',
              '&:hover': { bgcolor: 'rgba(20, 20, 20, 0.95)' },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
        <Box
          ref={rowRef}
          onScroll={updateScrollButtons}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            '& > *': { flex: '0 0 clamp(140px, 16vw, 190px)' },
          }}
        >
          {items.map((item) => (
            <MovieCard
              key={item.id}
              item={{ ...item, media_type: item.media_type || mediaType }}
            />
          ))}
        </Box>
        {canScrollRight && (
          <IconButton
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollRow(1)}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              zIndex: 1,
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(20, 20, 20, 0.8)',
              '&:hover': { bgcolor: 'rgba(20, 20, 20, 0.95)' },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
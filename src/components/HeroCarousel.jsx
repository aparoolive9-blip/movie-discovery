import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { getTrending } from '../api/tmdb.js';
import useFetch from '../hooks/useFetch.js';

const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

export default function HeroCarousel() {
  const { data, loading, error } = useFetch(getTrending, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const slides = (data?.results || []).filter(
    (item) => (item.media_type === 'movie' || item.media_type === 'tv') && item.backdrop_path,
  ).slice(0, 8);
  const activeItem = slides[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion || slides.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, slides.length]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: { xs: 360, md: 500 },
          mb: 5,
          display: 'grid',
          placeItems: 'center',
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>;
  if (!activeItem) return null;

  const title = activeItem.title || activeItem.name || 'Featured title';
  const mediaType = activeItem.media_type;
  const date = activeItem.release_date || activeItem.first_air_date;
  const year = date ? date.slice(0, 4) : null;
  const rating = activeItem.vote_average
    ? activeItem.vote_average.toFixed(1)
    : null;
  const overview = activeItem.overview || 'Discover what everyone is watching right now.';

  const moveTo = (direction) => {
    setActiveIndex((index) => (index + direction + slides.length) % slides.length);
  };

  return (
    <Box
      role="region"
      aria-roledescription="carousel"
      aria-label="Trending titles"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        minHeight: { xs: 440, sm: 500, md: 580 },
        mb: 5,
        borderRadius: { xs: 2, md: 3 },
        bgcolor: 'background.paper',
        '@keyframes heroFadeIn': {
          from: { opacity: 0.6, transform: 'scale(1.025)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      }}
    >
      <Box
        key={activeItem.id}
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -2,
          backgroundImage: `url("${BACKDROP_BASE}${activeItem.backdrop_path}")`,
          backgroundPosition: 'center 35%',
          backgroundSize: 'cover',
          animation: prefersReducedMotion ? 'none' : 'heroFadeIn 900ms ease-out',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: {
            xs: 'linear-gradient(0deg, #141414 0%, rgba(20,20,20,.94) 25%, rgba(20,20,20,.32) 100%)',
            md: 'linear-gradient(90deg, #141414 0%, rgba(20,20,20,.88) 36%, rgba(20,20,20,.22) 78%), linear-gradient(0deg, rgba(20,20,20,.75), transparent 55%)',
          },
        }}
      />

      <Box
        sx={{
          minHeight: 'inherit',
          display: 'flex',
          alignItems: 'flex-end',
          px: { xs: 3, sm: 5, md: 7 },
          pt: { xs: 14, md: 8 },
          pb: { xs: 5, md: 7 },
        }}
      >
        <Box sx={{ maxWidth: 650 }}>
          <Chip
            label="Trending now"
            color="primary"
            size="small"
            sx={{ mb: 2, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}
          />
          <Typography
            key={`title-${activeItem.id}`}
            variant="h2"
            component="h1"
            sx={{
              mb: 1.5,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              lineHeight: 1.05,
              fontWeight: 800,
              textShadow: '0 2px 24px rgba(0,0,0,.55)',
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            {year && <Typography color="rgba(255,255,255,.8)">{year}</Typography>}
            <Chip
              label={mediaType === 'tv' ? 'Series' : 'Movie'}
              size="small"
              variant="outlined"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,.6)' }}
            />
            {rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <StarIcon sx={{ fontSize: 18, color: '#ffc107' }} />
                <Typography>{rating}</Typography>
              </Box>
            )}
          </Box>

          <Typography
            sx={{
              mb: 3,
              maxWidth: 570,
              color: 'rgba(255,255,255,.88)',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: { xs: 3, sm: 4 },
            }}
          >
            {overview}
          </Typography>

          <Button
            component={Link}
            to={`/${mediaType}/${activeItem.id}`}
            variant="contained"
            size="large"
            startIcon={<InfoOutlinedIcon />}
            sx={{ fontWeight: 700, px: 2.5 }}
          >
            More information
          </Button>
        </Box>
      </Box>

      {slides.length > 1 && (
        <>
          <IconButton
            aria-label="Previous featured title"
            onClick={() => moveTo(-1)}
            sx={{
              position: 'absolute',
              top: '50%',
              left: { xs: 1, sm: 2 },
              color: 'white',
              bgcolor: 'rgba(0,0,0,.45)',
              '&:hover': { bgcolor: 'rgba(0,0,0,.75)' },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Next featured title"
            onClick={() => moveTo(1)}
            sx={{
              position: 'absolute',
              top: '50%',
              right: { xs: 1, sm: 2 },
              color: 'white',
              bgcolor: 'rgba(0,0,0,.45)',
              '&:hover': { bgcolor: 'rgba(0,0,0,.75)' },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
          <Box
            sx={{
              position: 'absolute',
              right: { xs: 3, sm: 5 },
              bottom: { xs: 3, sm: 5 },
              display: 'flex',
              gap: 0.75,
            }}
          >
            {slides.map((item, index) => (
              <Box
                key={item.id}
                component="button"
                type="button"
                aria-label={`Show featured title ${index + 1}: ${item.title || item.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => setActiveIndex(index)}
                sx={{
                  width: index === activeIndex ? 24 : 8,
                  height: 8,
                  p: 0,
                  border: 0,
                  borderRadius: 4,
                  cursor: 'pointer',
                  bgcolor: index === activeIndex ? 'primary.main' : 'rgba(255,255,255,.65)',
                  transition: 'width 200ms ease, background-color 200ms ease',
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

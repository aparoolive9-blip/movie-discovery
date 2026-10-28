import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Alert, Box, Chip, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import useFetch from '../hooks/useFetch.js';
import useWatchlist from '../hooks/useWatchlist.js';
import { getDetails } from '../api/tmdb.js';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER = 'https://placehold.co/500x750/1f1f1f/888888?text=No+Poster';

export default function Details() {
  const { type, id } = useParams();
  const { data, loading, error } = useFetch(() => getDetails(type, id), [type, id]);
  const { addItem, removeItem, isInWatchlist } = useWatchlist();

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data) return null;

  const title = data.title || data.name || 'Untitled';
  const date = data.release_date || data.first_air_date;
  const year = date ? date.slice(0, 4) : 'N/A';
  const rating = data.vote_average ? data.vote_average.toFixed(1) : 'N/A';
  const poster = data.poster_path ? IMG_BASE + data.poster_path : PLACEHOLDER;
  const trailer = type === 'movie'
    ? (data.videos?.results || []).find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer',
    ) || (data.videos?.results || []).find(
      (video) => video.site === 'YouTube' && video.type === 'Teaser',
    )
    : null;
  const overview = data.overview || 'No description available.';

  const inWatchlist = isInWatchlist(data.id, type);

  function handleWatchlistClick() {
    if (inWatchlist) {
      removeItem(data.id, type);
    } else {
      addItem({
        id: data.id,
        mediaType: type,
        title,
        year,
        rating,
        poster: data.poster_path || null,
      });
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: trailer ? 5 : 0 }}>
      <Box
        component="img"
        src={poster}
        alt={title}
        sx={{ width: 280, borderRadius: 2, flexShrink: 0 }}
      />

      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography color="text.secondary">{year}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ fontSize: 18, color: 'gold' }} />
            <Typography>{rating}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {(data.genres || []).map((genre) => (
            <Chip key={genre.id} label={genre.name} size="small" />
          ))}
        </Box>

        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Typography paragraph>{overview}</Typography>

        <Button
          variant="contained"
          color={inWatchlist ? 'error' : 'primary'}
          onClick={handleWatchlistClick}
        >
          {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </Button>
      </Box>
      </Box>

      {trailer && (
        <Box sx={{ maxWidth: 960 }}>
          <Typography variant="h5" gutterBottom>
            Trailer
          </Typography>
          <Box
            component="iframe"
            title={`${title} trailer`}
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sx={{
              display: 'block',
              width: '100%',
              aspectRatio: '16 / 9',
              border: 0,
              borderRadius: 2,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
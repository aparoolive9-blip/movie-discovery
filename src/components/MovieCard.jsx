import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER = 'https://placehold.co/500x750/1f1f1f/888888?text=No+Poster';

export default function MovieCard({ item, type }) {
  const mediaType = item.media_type || type || (item.title ? 'movie' : 'tv');
  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date;
  const year = date ? date.slice(0, 4) : 'N/A';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const poster = item.poster_path ? IMG_BASE + item.poster_path : PLACEHOLDER;

  return (
    <Card
      sx={{
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
      }}
    >
      <CardActionArea component={Link} to={`/${mediaType}/${item.id}`}>
        <CardMedia
          component="img"
          image={poster}
          alt={title}
          sx={{ aspectRatio: '2 / 3', objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              {year}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ fontSize: 14, color: 'gold' }} />
              <Typography variant="caption">{rating}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
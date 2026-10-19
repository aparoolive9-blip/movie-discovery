import { Typography, Box, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import useWatchlist from '../hooks/useWatchlist.js';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER = 'https://placehold.co/500x750/1f1f1f/888888?text=No+Poster';

export default function Watchlist() {
  const { watchlist, removeItem } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          My Watchlist
        </Typography>
        <Typography>
          Your watchlist is empty. Add movies or TV shows from their details page.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        My Watchlist
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 2,
        }}
      >
        {watchlist.map((item) => (
          <Card key={`${item.mediaType}-${item.id}`} sx={{ position: 'relative' }}>
            <IconButton
              size="small"
              onClick={() => removeItem(item.id, item.mediaType)}
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                zIndex: 1,
                bgcolor: 'rgba(0,0,0,0.6)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: 'white' }} />
            </IconButton>
            <Box
              component={Link}
              to={`/${item.mediaType}/${item.id}`}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <CardMedia
                component="img"
                image={item.poster ? IMG_BASE + item.poster : PLACEHOLDER}
                alt={item.title}
                sx={{ aspectRatio: '2 / 3', objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="subtitle2" noWrap>
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    {item.year}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StarIcon sx={{ fontSize: 14, color: 'gold' }} />
                    <Typography variant="caption">{item.rating}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
    </div>
  );
}
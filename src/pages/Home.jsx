import Box from '@mui/material/Box';
import HeroCarousel from '../components/HeroCarousel.jsx';
import MovieRow from '../components/MovieRow.jsx';
import {
  getPopularMovies,
  getPopularTv,
  getTopRatedMovies,
  getTopRatedTv,
} from '../api/tmdb.js';

export default function Home() {
  return (
    <Box>
      <HeroCarousel />
      <MovieRow title="Popular Movies" fetchFn={() => getPopularMovies()} mediaType="movie" />
      <MovieRow title="Top Rated Movies" fetchFn={() => getTopRatedMovies()} mediaType="movie" />
      <MovieRow title="Popular TV Shows" fetchFn={() => getPopularTv()} mediaType="tv" />
      <MovieRow title="Top Rated TV Shows" fetchFn={() => getTopRatedTv()} mediaType="tv" />
    </Box>
  );
}
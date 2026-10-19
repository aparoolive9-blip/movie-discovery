const API_KEY = import.meta.env.VITE_TMDB_ACCESS;
const BASE_URL = 'https://api.themoviedb.org/3';

async function request(endpoint, params = {}) {
  const url = new URL(BASE_URL + endpoint);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status}`);
  }
  return res.json();
}

export function getTrending() {
  return request('/trending/all/week');
}

export function getPopularMovies(genreId) {
  return genreId
    ? request('/discover/movie', { with_genres: genreId })
    : request('/movie/popular');
}

export function getPopularTv(genreId) {
  return genreId
    ? request('/discover/tv', { with_genres: genreId })
    : request('/tv/popular');
}

export function getTopRatedMovies() {
  return request('/movie/top_rated');
}

export function getTopRatedTv() {
  return request('/tv/top_rated');
}

export function searchMulti(query) {
  return request(`/search/multi?query=${encodeURIComponent(query)}`);
}

export function getMovieGenres() {
  return request('/genre/movie/list');
}

export function getTvGenres() {
  return request('/genre/tv/list');
}


export function getDetails(type, id) {
  return request(`/${type}/${id}`);
}
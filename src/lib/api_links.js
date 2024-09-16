export const API_KEY = process.env.REACT_APP_API_KEY;

export const discoverEndpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&api_key=${API_KEY}`;
export const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
export const popularEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ja-JP`;
export const movieEndpoint = (movieId) =>
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ja-JP`
export const movieDetailsEndpoint = (movieId, language) =>
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${language}`;
export const movieCreditsEndpoint = (movieId, language) =>
  `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=${language}`;
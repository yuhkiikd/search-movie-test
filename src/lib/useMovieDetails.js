import { movieDetailsEndpoint, movieCreditsEndpoint } from "../lib/api_links";

export function getMovieDetails(movieId, language) {
  const detailsEndpoint = movieDetailsEndpoint(movieId, language);
  const creditsEndpoint = movieCreditsEndpoint(movieId, language);

  return Promise.all([
    fetch(detailsEndpoint).then(response => response.json()),
    fetch(creditsEndpoint).then(response => response.json())
  ]).then(([details, credits]) => ({
    ...details,
    cast: credits.cast,
    crew: credits.crew
  }));
}
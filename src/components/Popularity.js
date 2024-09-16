import "./Popularity.css";
import { useEffect, useState } from "react";
import { popularEndpoint } from '../lib/api_links';
import { Link } from 'react-router-dom';

export function PopularityList() {
  const [ movie, setMovies ] = useState([]);
  useEffect(() => {
    fetch(popularEndpoint)
      .then(response => response.json())
      .then(data => setMovies(data.results));
  }, [])
  return (
    <div>
      <h1>人気の映画</h1>
      <ul className="popularity-list">
        {movie.map(({id, title, poster_path}) => {
          return (
          <li key={id} style={{ listStyle: "none"}}>
            <Link to={`/popularity/${id}`} >
              <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt={title} />
            </Link>
          </li>
          );
        })}
      </ul>
      <div className="footer-nav">
        <div className='goto-top'>
          <Link to="/">TOPへ戻る</Link>
        </div>
      </div>
    </div>
  )
}
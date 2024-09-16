import "./PopularityDetail.css";
import loadingImg from "../img/loading.png"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieEndpoint } from "../lib/api_links";
import { Link } from 'react-router-dom';

export function PopularityDetail() {
  const { id } = useParams();
  const [ popularMovie, setPopularMovie ] = useState({});
  const [ loading, setLoading ] = useState(false);/* 映画詳細の取得が遅いため、ロード画面付与 */

  useEffect(() => {
    fetch(movieEndpoint(id))
      .then(response => response.json())
      .then(data => {
        setPopularMovie(data);
        setLoading(true);
      });
  }, [id]);
  return (
    <div className="popularity-detail">
      <h1>動画詳細</h1>
      {loading ? (
        <div className="popularity-container">
          <div className="popularity-container__img-and-text">
            <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${popularMovie.poster_path}`} alt={popularMovie.title}/>
            <div className="text-container">
              <h2>{popularMovie.title}</h2>
              <p>
                <span>あらすじ</span><br />
                {popularMovie.overview ? popularMovie.overview : "非公開"}
              </p>
              <p><span>リリース日</span><br />
                {popularMovie.release_date ? popularMovie.release_date : "非公開"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p><img src={loadingImg} alt="" /></p>
      )}
      <Link to="/popularity">戻る</Link>
    </div>
  )
}
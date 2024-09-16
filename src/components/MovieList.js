import './MovieList.css'
import { useEffect, useState, useContext, useCallback } from 'react';
import { discoverEndpoint, searchEndpoint } from '../lib/api_links';
import { getMovieDetails } from '../lib/useMovieDetails';
import { LanguageContext } from '../App';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

export function MovieList() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ movies, setMovies ] = useState([]);
  const [ selectedMovie, setSelectedMovie ] = useState(null);
  const [ movieDetails, setMovieDetails ] = useState(null);
  const [ currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;/* 1ページに表示する数 */

  const getMovies = useCallback(() => {
    const endpoint = searchQuery
      ? `${searchEndpoint}&language=${language}&query=${searchQuery}` /* 検索キーワードの入力で検索エンドポイントが変化 */
      : `${discoverEndpoint}&language=${language}`;/* デフォルトの映画一覧 *//* キーワードがあれば検索結果、なければデフォルトのエンドポイントが入る */
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error("error-code 500 : net work error.")
        }
        return response.json()
      })
      .then(json => setMovies(json.results))
      .catch(error => {
        console.error(error);
      })
  }, [language, searchQuery])

  /* 言語、検索クエリ */
  useEffect(() => {
    getMovies();
  }, [language, searchQuery, getMovies]);

  /* モーダルオープン */
  function openModal(movie) {
    setSelectedMovie(movie);
    getMovieDetails(movie.id, language).then(details => setMovieDetails(details));
  }

  /* モーダルクローズ */
  function closeModal() {
    setSelectedMovie(null);
    setMovieDetails(null);
  }

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const nextPage = () => {
    setCurrentPage(prevPage => {
     const newPage = Math.min(prevPage + 1, Math.ceil(movies.length / moviesPerPage));
      window.scrollTo(0, 0);/* ページトップへ移動 */
      return newPage;
    });
  }
  const prevPage = () => {
    setCurrentPage(prevPage => {
      const newPage = Math.max(prevPage -1, 1);
      window.scrollTo(0, 0);/* ページトップへ移動 */
      return newPage;
    });
  }

  return (
      <div className='container'>
        <h1 className='search-header'>
          映画検索アプリ
        </h1>
        <div className='search-bar'>
          <input type="text" value={searchQuery} onChange={(e) => {
            setSearchQuery(e.target.value);
            getMovies();
          }} />
          <select onChange={(e) => setLanguage(e.target.value)} value={language}>
            <option value="en-US" selected={language === "en-US" ? true : false}>Englist</option>
            <option value="ja-JP" selected={language === "ja-JP" ? true : false}>日本語</option>
          </select>
        </div>

        <div className='movie-card'>
          <ul className='movie-lists'>
            {currentMovies ? currentMovies.map((movie) => (
              <li key={movie.id} className='movie-list' onClick={() => openModal(movie)}>
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} alt={movie.title} />
                <strong>{movie.title}</strong>
                <p className='overview text-limit' data-id={movie.id}>{movie.overview}</p>
                <p className='release-date'>{movie.release_date}</p>
              </li>
            )) : <p>データを取得中</p>
            }
          </ul>
        </div>

        <div className='pagination'>
          <button onClick={prevPage} disabled={currentPage === 1}>前へ</button>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(movies.length / moviesPerPage )}>次へ</button>
        </div>

        <div className='goto-top'>
          <Link to="/">TOPへ戻る</Link>
        </div>

        {selectedMovie && movieDetails && (
          /* モーダルはreact-modalを使用 */
          <Modal
            isOpen={!!selectedMovie}
            onRequestClose={closeModal}
            contentLabel="Movie Details"
          >
            <div className='modal-container'>
              <div className="modal-poster">
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${selectedMovie.poster_path}`} alt={selectedMovie.title} />
              </div>
              <div className='modal-detai'>
                <h2>{selectedMovie.title}</h2>
                <p><span>あらすじ</span>{movieDetails.overview ? movieDetails.overview : "非公開"}</p>
                <p><span>上映時間</span>{movieDetails.runtime ? movieDetails.runtime + "分" : "非公開"}</p>
                <p><span>キャスト</span>{movieDetails.cast ? movieDetails.cast.slice(0, 5).map(actor => actor.name).join(', ') : "非公開"}</p>
                <p><span>公式サイトURL</span>{movieDetails.homepage ? <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer">{movieDetails.homepage}</a> : "非公開" }</p>
                <p><span>ジャンル</span>{movieDetails.genres ? movieDetails.genres.map(genre => genre.name).join(', ') : "非公開"}</p>
                <p><span>リリース日</span>{selectedMovie.release_date ? selectedMovie.release_date : "非公開"}</p>
              </div>
              <button onClick={closeModal}>×</button>
            </div>
          </Modal>
        )}
      </div>
  )
}
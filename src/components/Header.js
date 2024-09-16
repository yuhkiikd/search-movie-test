import { Link } from 'react-router-dom';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="menu">
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to="/search">映画検索</Link>
          </li>
          <li>
            <Link to="/popularity">人気の映画</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
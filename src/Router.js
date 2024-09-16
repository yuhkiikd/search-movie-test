import { Routes, Route } from 'react-router-dom';
import { Home, MovieList, PopularityList, PopularityDetail } from './components';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<MovieList />} />
      <Route path="/popularity" element={<PopularityList />} />
      <Route path="/popularity/:id" element={<PopularityDetail />} />
    </Routes>
  )
}
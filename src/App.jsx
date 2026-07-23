import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ContinueWatchingPage from './pages/ContinueWatchingPage';
import TopRatingPage from './pages/TopRatingPage';
import TrendingPage from './pages/TrendingPage';
import NewReleasePage from './pages/NewReleasePage';
import WatchPage from './pages/WatchPage';
import DetailPage from './pages/DetailPage';
import SeriesPage from './pages/SeriesPage';
import FilmPage from './pages/FilmPage';
import MyListPage from './pages/MyListPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/continue-watching" element={<ContinueWatchingPage />} />
        <Route path="/top-rating" element={<TopRatingPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/new-release" element={<NewReleasePage />} />
        <Route path="/watch/:id" element={<WatchPage />} />

        {/* Series */}
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/film" element={<FilmPage />} />
        <Route path="/my-list" element={<MyListPage />} />


        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
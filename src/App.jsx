import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Genres from "./pages/Genres";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="movies" element={<Movies />} />
        <Route path="movies/search" element={<Movies />} />

        <Route path="movies/:category" element={<Movies />} />
        <Route path="movies/genre/:genreId" element={<Movies />} />

        <Route path="movie/:id" element={<MovieDetails />} />

        <Route path="watchlist" element={<Watchlist />} />
        <Route path="genres" element={<Genres />} />
        
      </Route>
      {/* no navbar+footer for 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import TvShows from "../pages/TvShows";
import People from "../pages/People";
import MovieDetails from "../pages/MovieDetails";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminDashboard from "../pages/AdminDashboard";

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TvShows />} />
      <Route path="/people" element={<People />} />

      <Route path="/movie/:id" element={<MovieDetails />} />

      <Route path="/favorites" element={<Favorites />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
  
};


export default MainRoutes;
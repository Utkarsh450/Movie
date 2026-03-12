import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "../pages/Home";
import Search from "../pages/Search";
import History from "../pages/History";
import Loader from "../components/Loader";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
const Movies = lazy(() => import("../pages/Movies"))
const TvShows = lazy(() => import("../pages/TvShows"))
const Favorites = lazy(() => import("../pages/Favorites"))
const MovieDetails = lazy(() => import("../pages/MovieDetails"))
const Login = lazy(() => import("../pages/Login"))
const Signup = lazy(() => import("../pages/Signup"))
const TvDetails = lazy(() => import("../pages/TvDetails"))
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"))

const MainRoutes: React.FC = () => {
  return (
  <Suspense fallback={<Loader/>}>

<Routes>
<Route element={<GuestRoute />}>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</Route>

<Route path="/" element={<Home />} />
<Route path="/movies" element={<Movies />} />
<Route path="/tv" element={<TvShows />} />

<Route path="/movie/:id" element={<MovieDetails />} />
<Route path="/explore" element={<Search />} />
<Route path="/tv/:id" element={<TvDetails />} />

<Route element={<ProtectedRoute />}>
  <Route path="/favorites" element={<Favorites />} />
  <Route path="/history" element={<History />} />
  <Route path="/admin" element={<AdminDashboard />} />
</Route>

<Route path="*" element={<Navigate to="/" replace />} />

</Routes>

</Suspense>
  );
  
};



export default MainRoutes;

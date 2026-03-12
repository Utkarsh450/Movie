import { useEffect, useState } from "react";
import MovieCards from "../components/MovieCards";
import { useSelector } from "react-redux";

import useTrendingMovies from "../hooks/useTrendingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useActionMovies from "../hooks/useActionMovies";
import useComedyMovies from "../hooks/useComedyMovies";

import type { RootState } from "../redux/store";
import Loader from "../components/Loader";

interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

const Home: React.FC = () => {

  // fetch movies
  useTrendingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useActionMovies();
  useComedyMovies();

  // redux state
  const {
    trending,
    popular,
    topRated,
  } = useSelector((state: RootState) => state.movies);

  const [movie, setHeroMovie] = useState<Movie | null>(null);

  // hero banner selection
  useEffect(() => {

    if (trending.length === 0) return;

    const filtered = trending.filter((m: Movie) => m.backdrop_path);

    const random =
      filtered[Math.floor(Math.random() * filtered.length)];

    setHeroMovie(random);

  }, [trending]);

  // global loading check
  const isLoading =
    trending.length === 0 ||
    popular.length === 0 ||
    topRated.length === 0;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">

      {/* HERO */}
      {movie ? (
        <div className="relative w-full h-[85vh]">

          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

          <div className="relative z-10 h-full flex items-center px-36 text-white">

            <div className="max-w-2xl flex flex-col gap-4">

              <h1 className="text-6xl font-semibold">
                {movie.title}
              </h1>

              <p className="text-blue-400">
                ⭐ {movie.vote_average.toFixed(1)} / 10
              </p>

              <p className="text-gray-300">
                {movie.release_date}
              </p>

              <p className="text-gray-300 text-lg">
                {movie.overview.slice(0, 200)}...
              </p>

              <div className="flex gap-4 mt-4">

                <button className="px-10 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 font-semibold hover:scale-105 transition">
                  ▶ Watch Now
                </button>

                <button className="px-5 py-4 rounded-lg bg-zinc-200/20 backdrop-blur hover:bg-zinc-200/30">
                  +
                </button>

              </div>

            </div>

          </div>

        </div>
      ) : <Loader/>}

      {/* MOVIE ROWS */}
      <MovieCards title="Trending Movies" category="trending" type="movie" />
      <MovieCards title="Popular Movies" category="popular" type="movie" />
      <MovieCards title="Top Rated Movies" category="topRated" type="movie" />
      <MovieCards title="Action Movies" category="action" type="movie" />
      <MovieCards title="Comedy Movies" category="comedy" type="movie" />
      <MovieCards title="Upcoming Movies" category="upcoming" type="movie" />

    </div>
  );
};

export default Home;
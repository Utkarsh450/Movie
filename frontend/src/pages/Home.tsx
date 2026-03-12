import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCards from "../components/MovieCards";
import Loader from "../components/Loader";
import useActionMovies from "../hooks/useActionMovies";
import useComedyMovies from "../hooks/useComedyMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import type { RootState } from "../redux/store";
import type { MediaSummary } from "../types/media";

const Home: React.FC = () => {
  useTrendingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useActionMovies();
  useComedyMovies();

  const { trending, popular, topRated } = useSelector(
    (state: RootState) => state.movies
  );
  const [movie, setMovie] = useState<MediaSummary | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (trending.length === 0) {
        setMovie(null);
        return;
      }

      const filtered = trending.filter((item) => item.backdrop_path);

      if (filtered.length === 0) {
        setMovie(null);
        return;
      }

      const randomIndex = Math.floor(Math.random() * filtered.length);
      setMovie(filtered[randomIndex]);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [trending]);

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
    <div className="flex w-full flex-col">
      {movie ? (
        <div className="relative h-[85vh] w-full">
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title ?? movie.name ?? "Featured movie"}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

          <div className="relative z-10 flex h-full items-center px-36 text-white">
            <div className="max-w-2xl flex flex-col gap-4">
              <h1 className="text-6xl font-semibold">
                {movie.title ?? movie.name}
              </h1>

              <p className="text-blue-400">
                Rating {(movie.vote_average ?? 0).toFixed(1)} / 10
              </p>

              <p className="text-gray-300">
                {movie.release_date ?? movie.first_air_date}
              </p>

              <p className="text-lg text-gray-300">
                {(movie.overview ?? "").slice(0, 200)}...
              </p>

              <div className="mt-4 flex gap-4">
                <button className="rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 px-10 py-4 font-semibold transition hover:scale-105">
                  Watch Now
                </button>

                <button className="rounded-lg bg-zinc-200/20 px-5 py-4 backdrop-blur hover:bg-zinc-200/30">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}

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

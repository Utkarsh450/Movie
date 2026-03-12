import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import useInfinite from "../hooks/useInfinite";
import usePopularMovies from "../hooks/usePopularMovies";
import { type RootState } from "../redux/store";
import type { MediaSummary } from "../types/media";

const Movies = () => {
  usePopularMovies();

  const popularMovies = useSelector((state: RootState) => state.movies.popular);
  const { movies, hasMore, fetchMovies } = useInfinite();
  const [heroMovie, setHeroMovie] = useState<MediaSummary | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (popularMovies.length === 0) {
        setHeroMovie(null);
        return;
      }

      const filtered = popularMovies.filter((movie) => movie.backdrop_path);

      if (filtered.length === 0) {
        setHeroMovie(null);
        return;
      }

      const randomIndex = Math.floor(Math.random() * filtered.length);
      setHeroMovie(filtered[randomIndex]);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [popularMovies]);

  if (movies.length === 0 || popularMovies.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full bg-black">
      {heroMovie ? (
        <div className="relative h-[90vh] w-full">
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/original/${heroMovie.backdrop_path}`}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r via-black/60 to-transparent" />

          <div className="relative z-10 flex h-full items-center px-20 text-white">
            <div className="max-w-2xl flex flex-col gap-4">
              <h1 className="text-6xl font-bold">{heroMovie.title ?? heroMovie.name}</h1>

              <p className="text-lg text-blue-400">
                Rating {(heroMovie.vote_average ?? 0).toFixed(1)}
              </p>

              <p className="text-gray-300">
                {heroMovie.release_date ?? heroMovie.first_air_date}
              </p>

              <p className="text-lg text-gray-300">
                {(heroMovie.overview ?? "").slice(0, 200)}...
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col">
        <div className="mt-44 px-10 text-5xl font-semibold text-zinc-100">
          Popular Movies
        </div>

        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMovies}
          hasMore={hasMore}
          loader={<h4 className="text-white">Loading...</h4>}
          scrollThreshold={0.9}
        >
          <div className="grid grid-cols-2 gap-4 p-10 md:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie: MediaSummary) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="cursor-pointer overflow-hidden rounded-xl transition hover:scale-105"
              >
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="h-full w-full object-cover"
                />
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Movies;

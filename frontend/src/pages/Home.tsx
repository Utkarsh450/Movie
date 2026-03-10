import { useEffect, useState } from "react";
import MovieCards from "../components/MovieCards";
import { useSelector } from "react-redux";
import useTrendingMovies from "../hooks/useTrendingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

import useUpcomingMovies from "../hooks/useUpcomingMovies";
import type { RootState } from "../redux/store";
import useActionMovies from "../hooks/useActionMovies";
import useComedyMovies from "../hooks/useComedyMovies";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Home: React.FC = () => {

 // fetch movies
  useTrendingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  
  useActionMovies();
  useComedyMovies();

  const trending = useSelector(
    (state: RootState) => state.movies.trending
  );
  console.log(trending);
  

  const [movie, setHeroMovie] = useState<Movie | null>(null);

  // pick random banner
  useEffect(() => {

  if (trending.length > 0) {

  const filteredMovies = trending.filter(
    (movie: Movie) => movie.backdrop_path
  );

  const randomMovie =
    filteredMovies[Math.floor(Math.random() * filteredMovies.length)];

  setHeroMovie(randomMovie);
}

  }, [trending]);

  return (
    <div className="w-full flex flex-col">

      {/* HERO SECTION */}
     {movie && (
  <div className="relative w-full h-225">

    {/* Background Image */}
   <img
  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
  alt={movie.title}
  className="absolute inset-0 w-full h-full object-cover"
/>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r to-transparent"></div>

    {/* Content */}
    <div className="relative z-10 h-full flex items-center px-36 text-white font-[satoshi]">

      <div className="max-w-2xl flex flex-col gap-4">

        <h1 className="text-7xl font-semibold">
          {movie.title}
        </h1>

        <p className="text-blue-400 text-lg">
          ⭐ {movie.vote_average.toFixed(1)} / 10
        </p>

        <p className="text-gray-300 text-lg">
          {movie.release_date}
        </p>

        <p className="text-gray-300 text-2xl leading-relaxed">
          {movie.overview.slice(0, 200)}...
        </p>

        <div className="flex gap-4 mt-4">

          <button className="px-28 py-8 rounded-lg bg-gradient-to-r from-blue-500 text-2xl to-pink-500 font-semibold hover:scale-105 transition">
            ▶ Watch Now
          </button>

          <button className="px-5 py-3 rounded-lg bg-zinc-200/30 backdrop-blur text-xl hover:bg-zinc-200/40 transition">
            +
          </button>

        </div>

      </div>

    </div>

  </div>
)}

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
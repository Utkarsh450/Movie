import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTrendingTV from "../hooks/useTrendingTV";
import MovieCards from "../components/MovieCards";
import type { RootState } from "../redux/store";

interface TVShow {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
}

const TvShows = () => {

  useTrendingTV();

  const trending = useSelector(
    (state: RootState) => state.tv.trending
  );

  const [show, setShow] = useState<TVShow | null>(null);

  useEffect(() => {

    if (trending.length > 0) {

      const filtered = trending.filter(
        (s: TVShow) => s.backdrop_path
      );

      const random =
        filtered[Math.floor(Math.random() * filtered.length)];

      setShow(random);
    }

  }, [trending]);

  return (
    <div className="w-full flex flex-col bg-black">

      {show && (

        <div className="relative w-full h-[80vh]">

          <img
            src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

          <div className="relative z-10 h-full flex items-center px-20 text-white">

            <div className="max-w-2xl flex flex-col gap-4">

              <h1 className="text-6xl font-bold">
                {show.name}
              </h1>

              <p className="text-blue-400">
                ⭐ {show.vote_average.toFixed(1)}
              </p>

              <p className="text-gray-300">
                {show.first_air_date}
              </p>

              <p className="text-gray-300 text-lg">
                {show.overview.slice(0,200)}...
              </p>

              <button className="px-8 py-3 bg-white text-black rounded-lg w-fit">
                ▶ Watch Now
              </button>

            </div>

          </div>

        </div>
      )}

      {/* TV Rows */}
      <MovieCards title="Trending Shows" category="trending" type="tv" />
      <MovieCards title="Popular Shows" category="popular" type="tv" />

    </div>
  );
};

export default TvShows;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCards from "../components/MovieCards";
import usePopularTV from "../hooks/usePopularTV";
import useTopRatedTV from "../hooks/useTopRatedTV";
import useTrendingTV from "../hooks/useTrendingTV";
import type { RootState } from "../redux/store";
import type { MediaSummary } from "../types/media";

const TvShows = () => {
  useTrendingTV();
  usePopularTV();
  useTopRatedTV();

  const trending = useSelector((state: RootState) => state.tv.trending);
  const [show, setShow] = useState<MediaSummary | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (trending.length === 0) {
        setShow(null);
        return;
      }

      const filtered = trending.filter((item) => item.backdrop_path);

      if (filtered.length === 0) {
        setShow(null);
        return;
      }

      const randomIndex = Math.floor(Math.random() * filtered.length);
      setShow(filtered[randomIndex]);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [trending]);

  return (
    <div className="flex w-full flex-col bg-black font-[satoshi]">
      {show ? (
        <div className="relative h-[80vh] w-full">
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

          <div className="relative z-10 flex h-full items-center px-20 text-white">
            <div className="max-w-2xl flex flex-col gap-4">
              <h1 className="text-6xl font-bold">{show.name ?? show.title}</h1>

              <p className="text-blue-400">
                Rating {(show.vote_average ?? 0).toFixed(1)}
              </p>

              <p className="text-gray-300">
                {show.first_air_date ?? show.release_date}
              </p>

              <p className="text-lg text-gray-300">
                {(show.overview ?? "").slice(0, 200)}...
              </p>

              <button className="w-fit rounded-lg bg-white px-8 py-3 text-black">
                Watch Now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <MovieCards title="Trending Shows" category="trending" type="tv" />
      <MovieCards title="Popular Shows" category="popular" type="tv" />
      <MovieCards title="Top Rated Shows" category="topRated" type="tv" />
    </div>
  );
};

export default TvShows;

import { useCallback, useEffect, useState } from "react";
import api from "../utils/axiosConfig/axiosConf";
import type { MediaSummary } from "../types/media";

type Movie = MediaSummary;

const API_KEY = import.meta.env.VITE_API_KEY;

const useInfiniteMovies = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(async () => {
    if (!hasMore) {
      return;
    }

    try {

      const res = await api.get(
        `/movie/popular?api_key=${API_KEY}&page=${page}`
      );

      const data = res.data;

      setMovies((prev) => [...prev, ...data.results]);

      if (page >= data.total_pages) {
        setHasMore(false);
      }

      setPage((prev) => prev + 1);

    } catch (err) {
      console.error("Fetch movies failed", err);
    }

  }, [hasMore, page]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchMovies();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchMovies]);

  return { movies, fetchMovies, hasMore };
};

export default useInfiniteMovies;

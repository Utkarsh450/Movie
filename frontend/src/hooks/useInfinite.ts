import { useEffect, useState } from "react";
import api from "../utils/axiosConfig/axiosConf";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

const API_KEY = import.meta.env.VITE_API_KEY;

const useInfiniteMovies = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async () => {

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

  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, fetchMovies, hasMore };
};

export default useInfiniteMovies;
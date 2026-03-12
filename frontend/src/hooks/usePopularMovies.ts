import { useEffect, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axiosConfig/axiosConf";
import { setPopular } from "../redux/slices/movieSlice";

const API_KEY = import.meta.env.VITE_API_KEY;

const usePopularMovies = () => {

  const dispatch = useDispatch();

  const getPopularMovies = useEffectEvent(async () => {

    const res = await api.get(
      `/movie/popular?api_key=${API_KEY}`
    );

    dispatch(setPopular(res.data.results));
  });

  useEffect(() => {
    void getPopularMovies();
  }, []);

};

export default usePopularMovies;

import { useEffect, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axiosConfig/axiosConf";
import { setTopRated } from "../redux/slices/movieSlice";

const API_KEY = import.meta.env.VITE_API_KEY;

const useTopRatedMovies = () => {

  const dispatch = useDispatch();

  const getTopRatedMovies = useEffectEvent(async () => {

    const res = await api.get(
      `/movie/top_rated?api_key=${API_KEY}`
    );

    dispatch(setTopRated(res.data.results));
  });

  useEffect(() => {
    void getTopRatedMovies();
  }, []);

};

export default useTopRatedMovies;

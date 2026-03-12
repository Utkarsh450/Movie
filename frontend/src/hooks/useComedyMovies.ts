import { useEffect, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axiosConfig/axiosConf";
import { setComedy } from "../redux/slices/movieSlice";

const API_KEY = import.meta.env.VITE_API_KEY;

const useComedyMovies = () => {

  const dispatch = useDispatch();

  const getComedyMovies = useEffectEvent(async () => {

    const res = await api.get(
      `/discover/movie?with_genres=35&api_key=${API_KEY}`
    );

    dispatch(setComedy(res.data.results));
  });

  useEffect(() => {
    void getComedyMovies();
  }, []);

};

export default useComedyMovies;

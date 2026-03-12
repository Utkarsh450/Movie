import { useEffect, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axiosConfig/axiosConf";
import { setAction } from "../redux/slices/movieSlice";

const API_KEY = import.meta.env.VITE_API_KEY;

const useActionMovies = () => {

  const dispatch = useDispatch();

  const getActionMovies = useEffectEvent(async () => {

    const res = await api.get(
      `/discover/movie?with_genres=28&api_key=${API_KEY}`
    );

    dispatch(setAction(res.data.results));
  });

  useEffect(() => {
    void getActionMovies();
  }, []);

};

export default useActionMovies;

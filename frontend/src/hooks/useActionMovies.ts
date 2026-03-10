import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axiosConfig/axiosConf";
import { setAction } from "../redux/slices/movieSlice";

const API_KEY = import.meta.env.VITE_API_KEY;

const useActionMovies = () => {

  const dispatch = useDispatch();

  const getActionMovies = async () => {

    const res = await api.get(
      `/discover/movie?with_genres=28&api_key=${API_KEY}`
    );

    dispatch(setAction(res.data.results));
  };

  useEffect(() => {
    getActionMovies();
  }, []);

};

export default useActionMovies;
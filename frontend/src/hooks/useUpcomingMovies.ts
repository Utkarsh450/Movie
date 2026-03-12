import { useEffect, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axiosConfig/axiosConf";
import { setUpcoming } from "../redux/slices/movieSlice";

const API_KEY = import.meta.env.VITE_API_KEY;

const useUpcomingMovies = () => {

  const dispatch = useDispatch();

  const getUpcomingMovies = useEffectEvent(async () => {

    const res = await api.get(
      `/movie/upcoming?api_key=${API_KEY}`
    );

    dispatch(setUpcoming(res.data.results));
  });

  useEffect(() => {
    void getUpcomingMovies();
  }, []);

};

export default useUpcomingMovies;

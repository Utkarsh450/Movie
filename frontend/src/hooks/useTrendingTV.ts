import { useEffect, useEffectEvent } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axiosConfig/axiosConf"
import { addTrendingTV } from "../redux/slices/tvSlice";

const API_KEY = import.meta.env.VITE_API_KEY;

const useTrendingTV = () => {
  const dispatch = useDispatch();

  const fetchTV = useEffectEvent(async () => {

    const res = await api.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`
    );
    dispatch(addTrendingTV(res.data.results));
  });

  useEffect(() => {
    void fetchTV();
  }, []);
};

export default useTrendingTV;

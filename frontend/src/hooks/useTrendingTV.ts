import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axiosConfig/axiosConf"
import { addTrendingTV } from "../redux/slices/tvSlice";

const API_KEY = import.meta.env.VITE_API_KEY;

const useTrendingTV = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchTV = async () => {

      const res = await api.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`
      );      
      dispatch(addTrendingTV(res.data.results));
    };

    fetchTV();

  }, []);
};

export default useTrendingTV;
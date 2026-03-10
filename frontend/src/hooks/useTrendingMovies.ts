import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "../utils/axiosConfig/axiosConf";
import { setTrending } from "../redux/slices/movieSlice";
const useTrendingMovies = () => {

  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    try {

      const res = await axios.get(
        `/trending/movie/day?api_key=${import.meta.env.VITE_API_KEY}`
      );

      dispatch(setTrending(res.data.results));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

};

export default useTrendingMovies;
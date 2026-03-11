import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedTV } from "../redux/slices/tvSlice";
import api from "../utils/axiosConfig/axiosConf"

const useTopRatedTV = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchTopRatedTV = async () => {

      try {

        const res = await api.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_API_KEY}`
        );
        dispatch(addTopRatedTV(res.data.results));

      } catch (err) {

        console.error("Top Rated TV fetch failed:", err);

      }

    };

    fetchTopRatedTV();

  }, [dispatch]);

};


export default useTopRatedTV;
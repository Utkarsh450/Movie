import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularTV } from "../redux/slices/tvSlice";

const usePopularTV = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchPopularTV = async () => {

      try {

        const res = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_API_KEY}`
        );

        const data = await res.json();

        dispatch(addPopularTV(data.results));

      } catch (error) {

        console.error("Failed to fetch popular TV:", error);

      }

    };

    fetchPopularTV();

  }, [dispatch]);

};


export default usePopularTV;
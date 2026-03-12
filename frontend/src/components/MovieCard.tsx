import { Link } from "react-router-dom";
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}



interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (

   <Link
  to={`/movie/${movie.id}`}
  className="w-52 h-72 rounded-xl bg-red-500 shrink-0 transition-all duration-300 hover:scale-110 block"
>
  {/* <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
    className="w-full h-full object-cover rounded-xl"
  /> */}
</Link>

  );
};

export default MovieCard;
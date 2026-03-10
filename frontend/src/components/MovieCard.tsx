interface Props {
  movie: any;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (

    <div className="w-52 h-72 rounded-xl shrink-0 transition-all duration-300 hover:scale-110">

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

    </div>

  );
};

export default MovieCard;
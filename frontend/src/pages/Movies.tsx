import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { type RootState } from "../redux/store"
import useInfinite from "../hooks/useInfinite"
import InfiniteScroll from "react-infinite-scroll-component";
import usePopularMovies from "../hooks/usePopularMovies";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

interface Movie {
  id: number
  title: string
  backdrop_path: string
  poster_path: string
  overview: string
  vote_average: number
  release_date: string
}

const Movies = () => {

  usePopularMovies();

  const popularMovies = useSelector(
    (state: RootState) => state.movies.popular
  )

  const [heroMovie, setHeroMovie] = useState<Movie | null>(null)
  const { movies, hasMore, fetchMovies} = useInfinite();
  console.log(movies, hasMore);
  

  useEffect(() => {

    if (popularMovies.length > 0) {

      const filtered = popularMovies.filter(
        (m: Movie) => m.backdrop_path
      )

      const random =
        filtered[Math.floor(Math.random() * filtered.length)]

      setHeroMovie(random)
    }

  }, [popularMovies])
  if (movies.length === 0 || popularMovies.length === 0) {

    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <Loader />
      </div>
    )

  }

  return (

    <div className="w-full bg-black">

      {/* HERO POSTER */}
      {heroMovie && (

        <div className="relative w-full h-[90vh]">

          <img loading="lazy"
            src={`https://image.tmdb.org/t/p/original/${heroMovie.backdrop_path}`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r via-black/60 to-transparent"></div>

          <div className="relative z-10 h-full flex items-center px-20 text-white">

            <div className="max-w-2xl flex flex-col gap-4">

              <h1 className="text-6xl font-bold">
                {heroMovie.title}
              </h1>

              <p className="text-blue-400 text-lg">
                ⭐ {heroMovie.vote_average.toFixed(1)}
              </p>

              <p className="text-gray-300">
                {heroMovie.release_date}
              </p>

              <p className="text-gray-300 text-lg">
                {heroMovie.overview.slice(0, 200)}...
              </p>

            </div>

          </div>

        </div>
      )}

      {/* MOVIE GRID */}
      <div className="flex flex-col">
        <div className="font-semibold text-5xl px-10 mt-44 text-zinc-100">Popular Movies</div>

        <InfiniteScroll
        dataLength={movies.length}
  next={fetchMovies}
  hasMore={hasMore}
  loader={<h4 className="text-white">Loading...</h4>}
    scrollThreshold={0.9}
        
        
        >
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-10">

          {movies.map((movie: Movie) => (

            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer"
            >

              <img loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="w-full h-full object-cover"
              />

            </Link>

          ))}

        </div>


        </InfiniteScroll>
      </div>

    </div>

  )
}

export default Movies
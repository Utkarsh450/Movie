import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../utils/axiosConfig/axiosConf"
import { useDispatch } from "react-redux"
import { addHistory } from "../redux/slices/historySlice"
import Loader from "../components/Loader"

const API_KEY = import.meta.env.VITE_API_KEY

const MovieDetails = () => {

  const { id, type } = useParams()
  const dispatch = useDispatch()

  const mediaType = type === "tv" ? "tv" : "movie"

  const [movie, setMovie] = useState<any>(null)
  const [cast, setCast] = useState<any[]>([])
  const [similar, setSimilar] = useState<any[]>([])

  const fetchMovie = async () => {

    try {

      const [movieRes, castRes, similarRes] = await Promise.all([

        api.get(`/${mediaType}/${id}?api_key=${API_KEY}`),

        api.get(`/${mediaType}/${id}/credits?api_key=${API_KEY}`),

        api.get(`/${mediaType}/${id}/similar?api_key=${API_KEY}`)

      ])

      setMovie(movieRes.data)

      setCast(castRes.data.cast.slice(0, 10))

      setSimilar(similarRes.data.results.slice(0, 12))

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    fetchMovie()
  }, [id])

  useEffect(() => {

    if (movie) {

      dispatch(addHistory({
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title || movie.name,
        media_type: mediaType
      }))

    }

  }, [movie, dispatch, mediaType])


  /* LOADER SCREEN */

  if (!movie) {

    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <Loader />
      </div>
    )

  }

  return (

    <div className="w-full bg-black text-white">

      {/* HERO */}

      <div className="relative h-[85vh] w-full">

        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        <div className="relative z-10 flex items-end h-full px-12 pb-20 gap-10">

          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-64 rounded-xl shadow-xl"
          />

          <div className="max-w-2xl">

            <h1 className="text-5xl font-bold">
              {movie.title || movie.name}
            </h1>

            <p className="text-blue-400 mt-3 text-lg">
              ⭐ {movie.vote_average?.toFixed(1)}
            </p>

            <p className="text-gray-300 mt-2">
              {movie.release_date || movie.first_air_date} • {movie.runtime || movie.number_of_seasons}
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">

              {movie.genres?.map((g:any) => (

                <span
                  key={g.id}
                  className="px-3 py-1 bg-zinc-800 rounded-full text-sm"
                >
                  {g.name}
                </span>

              ))}

            </div>

            <p className="mt-6 text-gray-300 text-lg leading-relaxed">
              {movie.overview}
            </p>

          </div>

        </div>

      </div>

      {/* CAST */}

      <div className="px-12 py-12">

        <h2 className="text-3xl font-semibold mb-6">
          Cast
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

          {cast.map(actor => (

            <div
              key={actor.id}
              className="w-32 shrink-0 hover:scale-105 transition"
            >

              <img
                loading="lazy"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/placeholder.png"
                }
                className="rounded-lg"
              />

              <p className="text-sm mt-2 text-center">
                {actor.name}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* SIMILAR */}

      <div className="px-12 pb-20">

        <h2 className="text-3xl font-semibold mb-8">
          Similar
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

          {similar.map(item => (

            <Link
              key={item.id}
              to={`/${mediaType}/${item.id}`}
              className="hover:scale-105 transition"
            >

              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                className="rounded-lg"
              />

            </Link>

          ))}

        </div>

      </div>

    </div>

  )

}

export default MovieDetails